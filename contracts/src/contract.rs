use cosmwasm_std::{
    coin, to_binary, BankMsg, Binary, Deps, DepsMut, Env, MessageInfo, Order,
    Response, StdResult, Addr, Empty, Uint128
};
use crate::state::{STREAMS, STREAM_SEQ, Stream, Status};
use crate::msg::{StreamsResponse, ExecuteMsg, QueryMsg};
use crate::error::ContractError;
use cw_storage_plus::Bound;

#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;

const DENOMINATOR: u128 = 10000;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> Result<Response, ContractError> {
    STREAM_SEQ.save(deps.storage, &0)?;
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Create { 
            recipient,
            start_time,
            duration,
            vesting_release
        } => {
            let checked: Addr = deps.api.addr_validate(&recipient)?;
            create(deps, env, info, checked, start_time, duration, vesting_release)
        },
        ExecuteMsg::Cancel { cancel_id } => cancel(deps, env, info, cancel_id),
        // ExecuteMsg::Transfer { transfer_id, new_recipient} => transfer(deps, env, info, transfer_id, new_recipient),
        // ExecuteMsg::Topup { topup_id } => topup(deps, env, info, topup_id),
        ExecuteMsg::Withdraw {withdraw_id} => withdraw(deps, env, info, withdraw_id),
    }
}

pub fn create(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    recipient: Addr,
    start_time: u64,
    duration: u64,
    vesting_release: u128,
) -> Result<Response, ContractError> {
    let id = STREAM_SEQ.load(deps.storage)? + 1;
    STREAM_SEQ.save(deps.storage, &id)?;

    if info.funds.len() == 0 {
        return Err(ContractError::NotAttachCoin {});
    }

    if info.funds[0].amount.is_zero() {
        return Err(ContractError::NotAttachCoin {});
    }

    if start_time < env.block.time.seconds() {
        return Err(ContractError::StartTimeNotApproved {});
    }

    if duration == 0 {
        return Err(ContractError::DurationNotApproved {});
    }
    
    let fund = info.funds[0].amount;
    let vesting_amount = fund.multiply_ratio(vesting_release, DENOMINATOR);
    let new_stream = Stream {
        id,
        sender: info.sender,
        recipient,
        release_amount: coin(fund.wrapping_sub(vesting_amount).u128(), info.funds[0].denom.clone()),
        remaining_amount: fund,
        vesting_amount,
        start_time,
        stop_time: start_time + duration,
        status: Status::Initial,
    };

    STREAMS.save(deps.storage, id, &new_stream)?;
    STREAM_SEQ.save(deps.storage, &id)?;

    Ok(Response::new()
        .add_attribute("method", "create")
        .add_attribute("new_stream_id", id.to_string()))
}

pub fn withdraw(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    id: u64
) -> Result<Response, ContractError> {
    let mut stream = STREAMS.load(deps.storage, id).unwrap();    
    if info.sender != stream.recipient {
        return Err(ContractError::NotRecipient {});
    }

    let recipient_balance = internal_balance_of(&stream, env).0;

    stream.remaining_amount = stream.remaining_amount.wrapping_sub(recipient_balance);

    if stream.remaining_amount.is_zero() {
        stream.status = Status::Completed;
    }

    if recipient_balance.is_zero() {
        return Err(ContractError::NoFund {});
    }

    let withdraw_msg = BankMsg::Send {
        to_address: stream.recipient.to_string(),
        amount: vec![coin(recipient_balance.u128(), stream.release_amount.denom.clone())],
    };
    STREAMS.save(deps.storage, id, &stream)?;

    Ok(Response::new()
    .add_message(withdraw_msg)
    .add_attribute("method", "withdraw")
    .add_attribute("id", id.to_string()))
}

pub fn cancel(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    id: u64
) -> Result<Response, ContractError> {
    let mut stream = STREAMS.load(deps.storage, id).unwrap();    
    if info.sender != stream.sender {
        return Err(ContractError::NotSender {});
    }

    let (recipient_balance, sender_balance) = internal_balance_of(&stream, env);

    stream.remaining_amount = stream.remaining_amount.wrapping_sub(recipient_balance);

    let mut msgs = vec![];
    if !recipient_balance.is_zero() {
        msgs.push(BankMsg::Send {
            to_address: stream.recipient.to_string(),
            amount: vec![coin(recipient_balance.u128(), stream.release_amount.denom.clone())],
        })
    }

    if !sender_balance.is_zero() {
        msgs.push(BankMsg::Send {
            to_address: stream.sender.to_string(),
            amount: vec![coin(sender_balance.u128(), stream.release_amount.denom.clone())],
        })
    }

    stream.status = Status::Cancelled;
    STREAMS.save(deps.storage, id, &stream)?;

    Ok(Response::new()
    .add_messages(msgs)
    .add_attribute("method", "candel")
    .add_attribute("id", id.to_string()))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::StreamByID { id } => to_binary(&query_entry(deps, id)?),
        QueryMsg::AllStreams { start_after, limit } => {
            to_binary(&query_list(deps, start_after, limit)?)
        },
        QueryMsg::SenderStreams { sender, start_after, limit } => {
            to_binary(&query_list_by_sender(deps, sender, start_after, limit)?)
        },
        QueryMsg::RecipientStream { recipient, start_after, limit } => {
            to_binary(&query_list_by_recipient(deps, recipient, start_after, limit)?)
        }
    }
}

fn query_entry(deps: Deps, id: u64) -> StdResult<Stream> {
    let entry = STREAMS.load(deps.storage, id)?;
    Ok(entry)
}

// Limits for pagination
const MAX_LIMIT: u32 = 30;
const DEFAULT_LIMIT: u32 = 10;

fn query_list(deps: Deps, start_after: Option<u64>, limit: Option<u32>) -> StdResult<StreamsResponse> {
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = start_after.map(Bound::exclusive);
    let entries: StdResult<Vec<_>> = STREAMS
        .range(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .collect();

    let result = StreamsResponse {
        streams: entries?.into_iter().map(|l| l.1).collect(),
    };
    Ok(result)
}

fn query_list_by_sender(deps: Deps, sender: String, start_after: Option<u64>, limit: Option<u32>) -> StdResult<StreamsResponse> {
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = start_after.map(Bound::exclusive);
    let entries: StdResult<Vec<_>> = STREAMS
        .range(deps.storage, start, None, Order::Ascending)
        .into_iter()
        .collect();

    let result = StreamsResponse {
        streams: entries?.into_iter()
        .filter(|(_, stream)| stream.sender == sender)
        .take(limit)
        .map(|l| l.1).collect(),
    };
    Ok(result)
}

fn query_list_by_recipient(deps: Deps, recipient: String, start_after: Option<u64>, limit: Option<u32>) -> StdResult<StreamsResponse> {
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = start_after.map(Bound::exclusive);
    let entries: StdResult<Vec<_>> = STREAMS
        .range(deps.storage, start, None, Order::Ascending)
                // .filter(|stream| *stream.) //todo
        .collect();

    let result = StreamsResponse {
        streams: entries?.into_iter()
        .filter(|(_, stream)| stream.recipient == recipient)
        .take(limit)
        .map(|l| l.1).collect(),
    };
    Ok(result)
}

fn internal_balance_of(stream: &Stream, env: Env) -> (Uint128, Uint128)  {
    let current_timestamp_sec = env.block.time.seconds();
    let duration = stream.stop_time - stream.start_time;

    let mut delta_time = duration;
    if stream.start_time >= current_timestamp_sec {
        delta_time = 0;
    }
    if stream.stop_time > current_timestamp_sec && current_timestamp_sec > stream.start_time {
        delta_time = current_timestamp_sec - stream.start_time;
    }

    let mut recipient_balance = Uint128::zero();

    if delta_time == duration {
        recipient_balance = stream.release_amount.amount;
    } else if delta_time > 0 {
        recipient_balance =  stream.release_amount.amount.multiply_ratio(delta_time, duration);
    }

    if !stream.vesting_amount.is_zero() && delta_time > 0 {
        recipient_balance.wrapping_add(Uint128::from(stream.vesting_amount));
    }

    let total_release = stream.release_amount.amount.wrapping_add(Uint128::from(stream.vesting_amount));
    let withdraw_amount = total_release - Uint128::from(stream.remaining_amount);
    (recipient_balance - withdraw_amount, total_release.wrapping_sub(recipient_balance))
}

#[cfg(test)]
mod tests {
    use cosmwasm_std::{Addr, coins, BlockInfo, Timestamp};
    use cw_multi_test::{App, ContractWrapper, Executor};
    use cosmwasm_std::testing::mock_env;

    use super::*;

    #[test]
    fn instantiation() {
        let env = mock_env();

        let mut app = App::new(|router, _, storage| {
            router
                .bank
                .init_balance(storage, &Addr::unchecked("sender"), coins(20, "eth"))
                .unwrap()
        });
        let code = ContractWrapper::new(execute, instantiate, query);
        let code_id = app.store_code(Box::new(code));

        let addr = app
            .instantiate_contract(
                code_id,
                Addr::unchecked("owner"),
                &Empty {},
                &[],
                "Contract",
                None,
            )
            .unwrap();
        let current_time = env.block.time.seconds();

        app.execute_contract(
            Addr::unchecked("sender"),
            addr.clone(),
            &ExecuteMsg::Create { recipient: "recipient".to_owned(), start_time: current_time + 10, duration: 10, vesting_release: 0 },
            &coins(10, "eth"),
        )
        .unwrap();

        let block_info: BlockInfo = env.block;
        
        let future_time = current_time + 15;

        // Create a new block info with the modified timestamp
        let new_block_info = BlockInfo {
            height: block_info.height,
            time: Timestamp::from_seconds(future_time),
            chain_id: block_info.chain_id.clone(),
        };

        app.set_block(new_block_info);

        app.execute_contract(
            Addr::unchecked("recipient"),
            addr.clone(),
            &ExecuteMsg::Withdraw { withdraw_id: 1 },
            &[],
        )
        .unwrap();

        println!("Sender balance test");
        assert_eq!(
            app.wrap()
                .query_balance("sender", "eth")
                .unwrap()
                .amount
                .u128(),
            10
        );

        println!("Recipient balance test");
        assert_eq!(
            app.wrap()
                .query_balance("recipient", "eth")
                .unwrap()
                .amount
                .u128(),
            5
        );
        
        let future_time = current_time + 17;

        // Create a new block info with the modified timestamp
        let new_block_info = BlockInfo {
            height: block_info.height,
            time: Timestamp::from_seconds(future_time),
            chain_id: block_info.chain_id,
        };
        app.set_block(new_block_info);

        app.execute_contract(
            Addr::unchecked("sender"),
            addr.clone(),
            &ExecuteMsg::Cancel { cancel_id: 1 },
            &[],
        )
        .unwrap();

        println!("Sender balance test");
        assert_eq!(
            app.wrap()
                .query_balance("sender", "eth")
                .unwrap()
                .amount
                .u128(),
            13
        );

        println!("Recipient balance test");
        assert_eq!(
            app.wrap()
                .query_balance("recipient", "eth")
                .unwrap()
                .amount
                .u128(),
            7
        );
    }
}

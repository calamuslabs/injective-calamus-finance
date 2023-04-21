use crate::state::Stream;
use cosmwasm_schema::{cw_serde, QueryResponses};

#[cw_serde]
pub enum ExecuteMsg {
    Create {
        recipient: String,
        start_time: u64,
        duration: u64,
        vesting_release: u128
    },
    Cancel {
        cancel_id: u64,
    },
    Withdraw {
        withdraw_id: u64,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(Stream)]
    StreamByID { id: u64 },
    #[returns(StreamsResponse)]
    AllStreams{ start_after: Option<u64>, limit: Option<u32> },
    #[returns(StreamsResponse)]
    SenderStreams { sender: String, start_after: Option<u64>, limit: Option<u32> },
    #[returns(StreamsResponse)]
    RecipientStream { recipient: String, start_after: Option<u64>, limit: Option<u32> },
}

#[cw_serde]
pub struct StreamsResponse {
    pub streams: Vec<Stream>,
}
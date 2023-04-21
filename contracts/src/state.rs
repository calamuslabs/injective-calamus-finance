use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin, Timestamp, Uint128};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct Stream {
    pub id: u64,
    pub sender: Addr,
    pub recipient: Addr,
    pub release_amount: Coin,
    pub remaining_amount: Uint128,
    pub vesting_amount: Uint128,
    pub start_time: u64,
    pub stop_time: u64,
    pub status: Status
}

#[cw_serde]
pub enum Status {
    Initial,
    Cancelled,
    Completed
}   

pub const STREAMS: Map<u64, Stream> = Map::new("stream");
pub const STREAM_SEQ: Item<u64> = Item::new("stream_seq");
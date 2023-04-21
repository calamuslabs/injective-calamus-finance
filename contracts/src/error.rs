use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Not attach any coin")]
    NotAttachCoin {},

    #[error("Start time is not approved")]
    StartTimeNotApproved {},

    #[error("Durration is not approved")]
    DurationNotApproved {},

    #[error("Not is recipient")]
    NotRecipient {},

    #[error("Not is sender")]
    NotSender {},

    #[error("Not fund is available")]
    NoFund {},
    
    #[error("Wrong fund coin (expected: {expected}, got: {got})")]
    WrongFundCoin { expected: String, got: String },

    #[error("Address already voted project")]
    AddressAlreadyVotedProject {},

    #[error("CLR algorithm requires a budget constrain")]
    CLRConstrainRequired {},
}
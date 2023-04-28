## Inspiration

Currently, many platforms support payments with fiat money, which could be used for investing, payroll, purchases, etc. Nevertheless, these platforms encounter several shortcomings, including:
- Most platforms do not allow periodic automation of payments. Instead, users must manually transfer the money when the work is done.
- Workers always stand a risk of wage theft.
- Labour hirers might risk low-quality work, for example, if payment is made in advance.
- Workers have to wait for a specific date to receive/use the money, usually every month or after the contract ends.
- Most platforms do not support payment with tokens.

Thus, to solve these issues, we have made use of blockchain and (the application of) tokens to create the very first crypto streaming protocol on Injective.

At Calamus Finance, we aim to facilitate the process of constant payments and token vesting transparently and securely.

## What it does

Calamus Finance is a protocol for streaming cryptocurrency that operates in a decentralized manner, enabling individuals to make payments and receive them at any given time, while also facilitating automatic token vesting.

Main functions:
- **Payroll**: Pay your employees by the second quickly. Company will have complete control over frequency, liquidity amount and duration. Cancellation is possible at any time by the payer and/or payee.
- **Token Vesting**: Reward your team, advisors and investors with tokens automatically without any fear of foul-play
- **Interchain crypto streaming** (coming soon):  enables users to send tokens or receive payroll bidirectionally between Injective and other Cosmos chains.


Users can:
- Connect their Keplr wallet with the app
- Configure a payment frequency: per second, minute, hour, day, week, month or year. Most traditional companies would pay their employees by week or month.
- Set start and end time of payments
- Configure advanced settings like cancellation or stream transferring.
- Set total payment amount
- Cancel stream at any time if mutual consensus is not met.
- Transfer the stream to a new recipient’s address.
- Set an initial release amount at cliff date (for startup vesting).

Data from these features are validated at DApp and Smart Contract, hence minimizing human risk and improving security.

## How we built it
### Technologies
- **CosmWasm**: To develop smart contracts
- InjectiveLabs SDK
- InjectiveLabs Wallet API
- [Injectived](https://docs.injective.network/develop/tools/injectived/install) Dev tool
- NextJS 12
- Charka UI components
- React 17 & React-Redux

### Smart contract

Our main smart contract is [here](https://testnet.explorer.injective.network/contract/inj1tna3283sjqd4vdehglz9r8hgswel3jl6vx8q4a/?tab=transactions)

#### Workflows
#### Create stream process
![](https://github.com/calamuslabs/injective-calamus-finance/blob/c33395360a9577a4e9a66e075b11a552498bf5e5/docs/CreateStream.jpg)

#### Withdraw token process

![](https://github.com/calamuslabs/injective-calamus-finance/blob/c33395360a9577a4e9a66e075b11a552498bf5e5/docs/WithdrawProccess.jpg)

#### Top-up stream process
![](https://github.com/calamuslabs/injective-calamus-finance/blob/c33395360a9577a4e9a66e075b11a552498bf5e5/docs/TopupProcess.jpg)

#### Cancel stream process
![](https://github.com/calamuslabs/injective-calamus-finance/blob/c33395360a9577a4e9a66e075b11a552498bf5e5/docs/CancelProcess.jpg)

#### Transfer stream process
![](https://github.com/calamuslabs/injective-calamus-finance/blob/c33395360a9577a4e9a66e075b11a552498bf5e5/docs/TransferProcess.jpg)



## Challenges we ran into

we encountered multiple technical problems which take quite some time to solve:

- **Issue 1: The absence of documentation** and the lack of source code examples to build a complete dApp on Injective have been challenging. Additionally, the sdk-ts is outdated, resulting in errors when signing transactions, such as the "funds" variable in MsgExecuteContract, which is not necessary but still generates an error. We addressed this issue by adding one Injective wei for each standard transaction.
- **Issue 2: The size of the Injective ecosystem**, developer tools, and JS libraries is quite extensive, making it difficult to learn everything in the duration of a hackathon. Additionally, CosmWasm is more complicated than other smart contract development languages, requiring us to invest both official and spare time on weekends to write code.
- **Issue 3:**
## Accomplishments that we're proud of

- Build a Money Streaming protocol on a new platform.
- Overcome technical challenges to accomplish goals.
- Develop technical functions so that users on Injective Network can pay, receive and vest tokens easily.
- Gain a lot of in-depth knowledge about Injective & CosmWasm.

## What we learned

Throughout the journey, we have learned to
- Build a complete dApp on Injective.
- Understand Injective, CosmWasm, and Cosmos Ecosystems.
- General knowledge of libraries and APIs in various languages.
- Technical knowledge on how to solve existing problems of fiat payment systems.

## What's next for Calamus Finance - Money Streaming on Injective

- Enable Interchain Transfer using IBC message.
- Support batch instance payment
- Support batch stream payment
- Improve unit tests
- Audit smart contract
- Go live on Injective mainnet.



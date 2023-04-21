import {
    MsgSend,
    ChainRestAuthApi,
    ChainRestTendermintApi,
    BaseAccount,
    createTransaction,
} from '@injectivelabs/sdk-ts'
import { DEFAULT_STD_FEE, DEFAULT_BLOCK_TIMEOUT_HEIGHT } from '@injectivelabs/utils'
import { ChainId } from '@injectivelabs/ts-types'
import { Network, getNetworkEndpoints } from '@injectivelabs/networks'

export const getKeplr = async () => {
    let chainId = ChainId.Testnet;
    await window.keplr.enable(chainId);
      
    const offlineSigner = window.keplr.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    console.log(accounts)
    const key = await window.keplr.getKey(chainId);

    return { offlineSigner, accounts, key }
}
  
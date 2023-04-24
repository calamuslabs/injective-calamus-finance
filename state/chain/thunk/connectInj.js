import { InjChainId } from 'state/config';

export const getKeplr = async () => {
    let chainId = InjChainId;
    await window.keplr.enable(chainId);
      
    const offlineSigner = window.keplr.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    const key = await window.keplr.getKey(chainId);

    return { offlineSigner, accounts, key }
}
  
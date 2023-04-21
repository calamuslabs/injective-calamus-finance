export function shortenAddress(address) {

    return address.slice(0, 7) + "..." + address.slice(-3);
  }
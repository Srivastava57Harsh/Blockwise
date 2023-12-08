export function truncateAddress(
    address?: string,
    startLimit = 7,
    endLimit = 7,
    separator = '...'
  ) {
    if (!address) return ''
    if (address.length <= startLimit + endLimit + separator.length) return address
  
    return (
      address.substring(0, startLimit) +
      separator +
      address.substring(address.length - endLimit, address.length)
    )
  }
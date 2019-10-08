export const formatPublicAddress = (address: string): string => {
  const splittedAddress = address.split("_");

  return splittedAddress[splittedAddress.length - 1];
};

export const isValidPublicAddress = (address: string): boolean =>
  /^((nano|xrb)_)?[0-9a-z]{60}$/.test(address);

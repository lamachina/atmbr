// Function to extract delegate ID from "d" field
export const extractDelegateId = (delegateD: string) => {
  const regex = /atom:btc:id:([a-zA-Z0-9]+)\/.*/;
  const match = delegateD.match(regex);
  return match ? match[1] : null;
};

export const extractDelegateIdWithoutEnd = (delegateD: string) => {
  const regex = /atom:btc:id:([a-zA-Z0-9]+)i0$/;
  const match = delegateD.match(regex);
  return match ? match[1]+"i0" : null;
};

export const extractUrnDatWithoutEnd = (delegateD: string) => {
  const regex = /atom:btc:dat:([a-zA-Z0-9]+)(?:\/|$)/;
  const match = delegateD.match(regex);
  return match ? match[1].slice(0,-2) : null;
};

export const extractAtomicalsidFromUrl = (url: string): string | null => {
  const regex = /atom:btc:id:([a-zA-Z0-9]+)\/(image\.webp|logo\.png)$/;

  const match = url.match(regex);
  return match ? match[1] : null;
};

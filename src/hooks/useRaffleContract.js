import { useState, useEffect } from 'react';
import { RAFFLE_ABI, GOERLI_RAFFLE_CA } from '@contracts';

export function useRaffleContract(web3, code) {
  const [inputLength, setInputLength] = useState(0);

  useEffect(() => {
    if (Object.keys(web3).length > 0) {
      const contract = new web3.eth.Contract(RAFFLE_ABI, GOERLI_RAFFLE_CA);
      contract.methods
        .getRaffleInputList(code)
        .call()
        .then((res) => setInputLength(res.length));
    }
  }, [web3, code]);

  return {
    inputLength,
  };
}

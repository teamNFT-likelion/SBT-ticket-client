import { useState, useEffect } from 'react';
import { RAFFLE_ABI, MUMBAI_RAFFLE_ADDR } from '@contracts';

export function useRaffleContract(web3) {
  const [contract, setContract] = useState();

  const join = (code, option, callback) => {
    if (!contract) {
      return;
    }

    contract.methods
      .join(code)
      .send(option)
      .then((res) => {
        alert(`${code}코드 래플에 참여가 완료 되었습니다.`);
      })
      .catch((err) => {
        console.error(err);
        alert('유효하지 않은 코드 입니다.');
      })
      .finally(() => callback());
  };

  const getInputList = (code, callback) => {
    if (!contract) {
      return;
    }

    contract.methods
      .getRaffleInputList(code)
      .call()
      .then((res) => callback(res));
  };

  useEffect(() => {
    if (Object.keys(web3).length > 0) {
      const contract = new web3.eth.Contract(RAFFLE_ABI, MUMBAI_RAFFLE_ADDR);
      setContract(contract);
    }
  }, [web3]);

  return {
    getInputList,
    join,
  };
}

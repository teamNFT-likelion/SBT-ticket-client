// 지갑 주소 단축
export function formatAddress(address) {
  if (address) {
    const add1 = address.substring(0, 4);
    const add2 = address.substring(address.length - 4);
    const finalAddress = `${add1}...${add2}`;
    return finalAddress;
  }
}

export const parseItemType = (_type) => {
  if (_type === 'concert') return '공연';
  if (_type === 'exhibit') return '전시';
  if (_type === 'sports') return '스포츠';
};

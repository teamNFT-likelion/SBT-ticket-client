// 지갑 주소 단축
function formatAddress(address) {
  if (address) {
    const add1 = address.substring(0, 4);
    const add2 = address.substring(address.length - 4);
    const finalAddress = `${add1}...${add2}`;
    return finalAddress;
  }
}

export default formatAddress

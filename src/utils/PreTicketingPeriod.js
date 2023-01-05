// NOTYET(사전예매 시작 전) , ING(사전예매 기간 중), END(사전예매 종료)
export default function PreTicketingPeriod(_time) {
  let PreTPeriodState = '';
  if (_time.length !== 0) {
    if (Date.now() >= _time[0] && Date.now() < _time[1]) {
      PreTPeriodState = '진행중';
    } else if (Date.now() < _time[0]) {
      PreTPeriodState = '전';
    } else {
      PreTPeriodState = '종료';
    }
  } else {
    return false;
  }

  return PreTPeriodState;
}

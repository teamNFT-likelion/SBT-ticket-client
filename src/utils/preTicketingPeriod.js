export const preTicketingPeriod = (_time) => {
  if (Date.now() >= _time[0] && Date.now() < _time[1]) {
    return true;
  } else {
    return false;
  }
};
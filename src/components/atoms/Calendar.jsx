import React,{useState} from 'react'
import Calendar from 'react-calendar';
import { CalendarStyle } from '@styles/ticketDetailStyle';

export default function TDPCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <CalendarStyle>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month"
        calendarType="US"
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
      />
    </CalendarStyle>
  );
}

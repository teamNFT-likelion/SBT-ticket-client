import React from 'react';
import Calendar from 'react-calendar';
import { CalendarStyle } from '@styles/ticketDetailStyle';

export default function TDPCalendar({ dateInfo, onDateChange, value }) {
  const minDate = new Date(dateInfo[0].date) || null;
  const maxDate = new Date(dateInfo[dateInfo.length - 1].date) || null;

  return (
    <CalendarStyle>
      <Calendar
        onChange={onDateChange}
        value={value}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month"
        calendarType="US"
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        minDate={minDate}
        maxDate={maxDate}
      />
    </CalendarStyle>
  );
}

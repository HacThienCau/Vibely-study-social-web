"use client";
import React from 'react';
import './calendar.css';
import { useEffect } from 'react';
import { CalendarDays, Menu, ChevronLeft, ChevronRight, ChevronDown, Calendar1 } from 'lucide-react';
import { initViewSelect } from './scripts/view-select';
import { initCalendar } from './scripts/calendar';
export default function Calendar() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initViewSelect(); 
      initCalendar();
    }
  }, []);
  return (
    <div className="app pt-14">
      <div className="sidebar desktop-only">
        <div className="sidebar__logo">
          <Calendar1 className="sidebar__icon"/> 
          <span className="sidebar__title">Vibely Calendar</span> 
        </div>
        <button className="button button--primary button--lg">Tạo sự kiện</button>
      </div>
      <main className="main">
        <div className="nav">
          <button className="button button--icon button--secondary mobile-only">
            <Menu className='button__icon' />
          </button>
          <div className="nav__date-info">
            <div className="nav__controls">
              <button className="button button--secondary desktop-only">
                Hôm nay
              </button>
              <button className="button button--icon button--secondary mobile-only">
                <CalendarDays className='button__icon'/>
              </button>
              <div className="nav__arrows">
                <button className="button button--icon button--secondary">
                  <ChevronLeft className='button-icon'/>
                </button>
                <button className="button button--icon button--secondary">
                  <ChevronRight className='button-icon'/>
                </button>
              </div>
            </div>
            <time dateTime="" className="nav__date">Tháng 3 năm 2025</time>
          </div>
          <div className="select desktop-only">
            <select name="" id="" className="select__select" data-view-select>
              <option value="day">Ngày</option>
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
            </select>
            <ChevronDown className="select__icon"/>
          </div>
        </div>
        <div className="calendar">
          <div className="month-calendar month-calendar--five-week">
            <ul className="month-calendar__day-of-week-list">
              <li className="month-calendar__day-of-week">Chủ Nhật</li>
              <li className="month-calendar__day-of-week">Thứ 2</li>
              <li className="month-calendar__day-of-week">Thứ 3</li>
              <li className="month-calendar__day-of-week">Thứ 4</li>
              <li className="month-calendar__day-of-week">Thứ 5</li>
              <li className="month-calendar__day-of-week">Thứ 6</li>
              <li className="month-calendar__day-of-week">Thứ 7</li>
            </ul>
            <div className="month-calendar__day-list-wrapper">
              <ul className="month-calendar__day-list">
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                    30
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="event-list">
                      <li className="event-list__item">
                        <button className="event event--filled">
                          <span className="event__color"></span>
                          <span className="event__title">Sự kiện 1</span>
                        </button>
                      </li>
                      <li className="event-list__item">
                        <button className="event">
                          <span className="event__color"></span>
                          <span className="event__title">Sự kiện 2</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                    1
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  2
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                   3
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                    4
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                    5
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                      4
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  5
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  6
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  7
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  8
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  9
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  10
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  11
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  12
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  13
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  14
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  15
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  16
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  17
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  18
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  19
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  20
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  21
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  22
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  23
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  24
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  25
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  26
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  27
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  28
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  29
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  30
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  1
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
                <li className="month-calendar__day">
                  <button className="month-calendar__day-label">
                  2
                  </button>
                  <div className="month-calendar__event-list-wrapper">
                    <ul className="even-list"></ul>
                  </div>
                </li>
              </ul>
            </div>

          </div>
          <div className='week-calendar' data-week-calendar style={{ display: "none" }}>
            Week Calendar
          </div>
        </div>
      </main>
    </div>
  );
}

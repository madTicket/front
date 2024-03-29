import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Year, Month } from "./Year_Month";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import cn from "classnames";
import './Calendar.scss'
import { setWeek, parseISO } from 'date-fns';
import DatePicker from "react-datepicker";
import startOfWeek from 'date-fns/startOfWeek'
import { DateBtn } from '../CommonStyles';

const Calendar = ({ startDate, endDate, pselectedDate, updateSelectedDate }) => {
    const now = new Date();
    const todayweek = now.getDay();
    const today = now.getDate();
    const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const [daylist, setDaylist] = useState([]);
    const weeklist = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [currentDate, setCurrentDate] = useState(now);
    const [selectedDate, setSelectedDate] = useState(pselectedDate || new Date())

    const getAlldate = (today, lastday) => {
        let dates = [];

        let sow = startOfWeek(today, { weekStartsOn: 1 }).getDate();
        dates[0] = sow;
        for (let i = 1; i <= 6; i++) {
            sow++;
            if (sow > lastday) {
                sow = 1;
                dates[i] = sow;
            } else {
                dates[i] = sow;
            }
        }

        return dates;
    };

    useEffect(() => {
        setDaylist(getAlldate(today, lastday));
        console.log(daylist, weeklist)
    }, [today, lastday, todayweek]);

    let CalendarObject = [
        { week: weeklist[0], day: daylist[0] },
        { week: weeklist[1], day: daylist[1] },
        { week: weeklist[2], day: daylist[2] },
        { week: weeklist[3], day: daylist[3] },
        { week: weeklist[4], day: daylist[4] },
        { week: weeklist[5], day: daylist[5] },
        { week: weeklist[6], day: daylist[6] },
    ];

    useEffect(() => {
        return () => console.log("Clean up");
    }, []);

    const week = useRef(null);

    const isCurrentDay = (calendar) => {
        const currentDay = new Date().getDate();
        return calendar.day === currentDay;
    };

    const moveWeek = (direction) => {
        const newDate = new Date(currentDate);
        direction === 'next' ? newDate.setDate(currentDate.getDate() + 7) : newDate.setDate(currentDate.getDate() - 7);
        // setDaylist(getAlldate(newDate.getDate(), new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()));
        setCurrentDate(newDate);
    };

    useEffect(() => {
        setDaylist(getAlldate(currentDate, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()));
    }, [currentDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Update the weekly calendar based on the selected date
        const startofweek = startOfWeek(date, { weekStartsOn: 1 }); // Assuming Sunday is the start of the week
        moveWeekToSpecificDate(startofweek);
        
        // Call the updateSelectedDate function to pass the selectedDate to the parent (PageTop)
        updateSelectedDate(date);
    };

    const handleDayClick = (selectedCalendar) => {
        const newDate = new Date(currentDate);
        newDate.setDate(selectedCalendar.day);
        setSelectedDate(newDate);
    };

    const moveWeekToSpecificDate = (startDate) => {
        setDaylist(getAlldate(startDate.getDate(), new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()));
        setCurrentDate(startDate);
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <DateBtn onClick={onClick} ref={ref}>
            {value}
        </DateBtn>
    ));

    return (
        <div>
            <div className={cn("Calendar")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="Year-MonthList" style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <p style={{ marginTop: '0px', marginBottom: '20px' }}>
                        <span className={cn("Year")}>
                            <Year id="Year" format={"yyyy"} ticking={false} timezone={"KR/Pacific"} currentDate={currentDate} />
                        </span>
                        &nbsp;&nbsp;
                        <span className={cn("Month")}>
                            <Month format={"MMMM"} ticking={false} timezone={"KR/Pacific"} currentDate={currentDate} />
                        </span>
                    </p>

                    <div className="DatePickerContainer">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={startDate > new Date() ? parseISO(startDate) : new Date()}
                            maxDate={new Date(endDate)}
                            customInput={<ExampleCustomInput />}
                            popperModifiers={{ // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                                preventOverflow: {
                                    enabled: true,
                                },
                            }}
                            popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
                        />
                    </div>
                </div>
                <div className={cn("DayList")} ticking={false} style={{ display: 'flex', justifyContent: 'space-between' }} >

                    <BiChevronLeft onClick={() => moveWeek('prev')} className={cn("ArrowButton")} />
                    <div className={cn("daylistContainer")}>
                        {CalendarObject.map((calendar, index) => (
                            <div className={cn("daylistSector", { "current-day": today === calendar.day && currentDate.getMonth() === now.getMonth() && currentDate.getFullYear() === now.getFullYear(), "selected-day": selectedDate && selectedDate.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), calendar.day).toDateString() })} key={index} onClick={() => handleDayClick(calendar)}>
                                <div
                                    className={cn(
                                        "week",
                                        calendar.week === "Sun" ? "Sun" : "week",
                                        calendar.week === "Sat" ? "Sat" : "week"
                                    )}
                                    ref={week}
                                >
                                    {calendar.week}
                                </div>
                                <div className={cn("day")}>{calendar.day}</div>
                            </div>
                        ))}
                    </div>

                    <BiChevronRight onClick={() => moveWeek('next')} className={cn("ArrowButton")} />
                </div>
            </div>
        </div>
    );
};

export default Calendar;
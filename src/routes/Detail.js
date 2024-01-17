import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { WhiteBox, BackgroundImg } from '../components/CommonStyles';
import Dots from '../components/Dots';
import { ReactComponent as Arrow } from "../assets/images/down-arrow.svg"
import Calendar from '../components/Calender/Calendar';
import CardList from '../components/Ticket/CardList';
import axios from 'axios';

const Detail = () => {
    const { category } = useParams();
    const [concertData, setConcertData] = useState({});
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);
    const [ticketList, setTicketList] = useState([])

    const [selectedDate, setSelectedDate] = useState(new Date());

    const updateSelectedDate = (date) => {
        console.log("selectedDate", selectedDate)
        // Update the state or perform any action with the selectedDate in PageTop
        setSelectedDate(date);
    };

    const PageTop = ({ category, concertData, selectedDate }) => (
        <div style={{ position: 'relative', height: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h4 style={{ color: 'white', paddingTop: '30px' }} >  </h4>
            <BackgroundImg src={concertData.image} />
            <WhiteBox width="780px" opacity={0.75}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={concertData.image} alt={category} width={'300px'} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                        <h2>{category}</h2>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <h4> 가격 </h4>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                                <p> VIP석: {formattedPrice(concertData.VIP)} <br /> R석: {formattedPrice(concertData.R)} <br /> S석: {formattedPrice(concertData.S)} <br /> A석: {formattedPrice(concertData.A)} </p>
                            </div>
                        </div>
                        <h4 style={{ marginTop: '0px', marginBottom: '0px' }}> 장소: {concertData.location} </h4>
                        <h4 style={{ marginTop: '10px', marginBottom: '20px' }}> 일시: {formatDate(concertData.dateStart)} - {formatDate(concertData.dateEnd)} </h4>
                        {/* <WhiteBox style={{padding: '0px'}} width='450px' height='180px'> */}

                        <Calendar startDate={concertData.dateStart} endDate={concertData.dateEnd} pselectedDate={selectedDate} updateSelectedDate={updateSelectedDate} />
                        {/* </WhiteBox> */}
                        <br />
                    </div>
                </div>
            </WhiteBox>
            <div style={{ position: 'relative', height: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h4 style={{ color: 'white', paddingTop: '10px', marginBottom: '10px' }} > 거래하기 </h4>
                <Arrow width={20} height={20} fill='white' alt="arrowIcon" style={{ paddingBottom: '10px' }} />
                {/* <h4 style={{ color: 'white', paddingDown: '10px'}} >  </h4> */}
            </div>
        </div>
    );

    const PageBottom = ({ category, concertData, ticketList, selectedDate }) => (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <WhiteBox width='100%' height='80vh' rad='0px' opacity='1' style={{ marginTop: '0vh', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <CardList selectedDate={selectedDate} cardsData={ticketList} category={category} concertData={concertData} style={{ paddingTop: '20px' }} />
            </WhiteBox>
        </div>
    );

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const formattedPrice = (price) => {
        // 가격이 문자열이면 숫자로 변환
        const numericPrice = isNaN(price) ? 0 : Number(price);

        // 숫자를 원화로 포맷
        return numericPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/concert?category=${category}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setConcertData(data);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [category]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("fetching tickets")
                const response = await axios.post(`${API_BASE_URL}/ticketView`, { category }, {
                    withCredentials: true
                });

                const data = response.data
                console.log("data", data)
                const dataArray = Object.values(data.result);
                setTicketList(dataArray);
                console.log("dataArray", dataArray);
            } catch (error) {
                console.error('Error fetching ticket data:', error);
            }
        };

        fetchData();
    }, [category]);

    useEffect(() => {
        const wheelHandler = (e) => {
            e.preventDefault();
            // 스크롤 행동 구현
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight - 50; // 화면 세로길이, 100vh와 같습니다.

            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight - 100) {
                    console.log("1>2");
                    outerDivRef.current.scrollTo({
                        top: pageHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                    setScrollIndex(2);
                } else {
                    console.log("2>2");
                    outerDivRef.current.scrollTo({
                        top: pageHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                    setScrollIndex(2);
                }
            } else {
                // 스크롤 올릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    console.log("1>1");
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                    setScrollIndex(1);
                } else {
                    console.log("2>1");
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                    setScrollIndex(1);
                }
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
    }, []);

    return (
        <div ref={outerDivRef} style={{ height: '100vh', overflowY: 'hidden', overflowX: 'hidden' }}>
            {/* 상단 페이지 */}

            <Dots currentPage={scrollIndex} />
            <PageTop category={category} concertData={concertData} />

            {/* 하단 페이지 */}
            <div style={{ width: '70%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'left' }}>

                <h2 style={{ color: 'white', paddingTop: '20px', paddingBottom: '20px' }}>{category}</h2>
            </div>
            <PageBottom category={category} concertData={concertData} ticketList={ticketList} />
        </div>
    );
};

export default Detail;
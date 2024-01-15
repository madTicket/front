// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { API_BASE_URL } from '../config';
// import { WhiteBox, BackgroundImg } from '../components/CommonStyles';

// const Detail = () => {
//     const { category } = useParams();
//     const [concertData, setConcertData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/concert?category=${category}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // 추가적인 헤더 설정 가능
//                     },
//                 });
//                 const data = await response.json();
//                 setConcertData(data);
//                 console.log("Fetched data:", data);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         fetchData();
//     }, [category]); // category가 변경될 때만 실행

//     function formatDate(dateString) {
//         const date = new Date(dateString);
//         const year = date.getFullYear().toString().slice(2);
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const day = date.getDate().toString().padStart(2, '0');
//         return `${year}/${month}/${day}`;
//     }

//     return (
// <div style={{ position: 'relative' }}>
//     <BackgroundImg src='https://image.toast.com/aaaaab/ticketlink/TKL_1/23-DRC_POSTER_540x780mm-lotte-prv_1012(1).jpg' />
//     <WhiteBox width="700px" opacity={0.75}>
//         <h2>{category}</h2>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <img src={concertData.image} alt={category} width={'250px'} />
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <div>
//                 <h4> 장소: {concertData.location} </h4>
//                 <h4> 일시: {formatDate(concertData.dateStart)} - {formatDate(concertData.dateEnd)} </h4>
//                 <h4> 가격: </h4>
//             </div>
//         </div>
//     </WhiteBox>
// </div>
//     );
// };

// export default Detail;

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { WhiteBox, BackgroundImg } from '../components/CommonStyles';
import Dots from '../components/Dots';
import { AuthContent } from '../components/Auth';
import { ReactComponent as Arrow } from "../assets/images/down-arrow.svg"

const PageTop = ({ category, concertData }) => (
    <div style={{ position: 'relative', height: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h4 style={{ color: 'white', paddingTop: '80px' }} >  </h4>
        <BackgroundImg src={concertData.image} />
        <WhiteBox width="700px" opacity={0.75}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={concertData.image} alt={category} width={'250px'} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div>
                    <h2>{category}</h2>
                    <br />
                    <h4> 장소: {concertData.location} </h4>
                    <h4> 일시: {formatDate(concertData.dateStart)} - {formatDate(concertData.dateEnd)} </h4>
                    <h4> 가격: </h4>
                </div>
            </div>
        </WhiteBox>
        <h4 style={{ color: 'white', paddingTop: '20px' }} > 거래하기 </h4>
        <Arrow width={20} height={20} fill='white' alt="arrowIcon" style={{ paddingBottom: '10px' }} />
        {/* <h4 style={{ color: 'white', paddingDown: '10px'}} >  </h4> */}
    </div>
);

const PageBottom = ({ category, concertData }) => (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <WhiteBox width='100%' height='90vh' rad='0px' opacity='1' style={{ marginTop: '8h' }}>

            <h2 style={{ color: 'white', paddingTop: '80px' }}>{category}</h2>
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

const Detail = () => {
    const { category } = useParams();
    const [concertData, setConcertData] = useState({});
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);

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
        const wheelHandler = (e) => {
            e.preventDefault();
            // 스크롤 행동 구현
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight - 50; // 화면 세로길이, 100vh와 같습니다.

            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
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
            <div style={{ width:'70%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>

                <h2 style={{ color: 'white', paddingTop: '20px', paddingBottom: '20px'}}>{category}</h2>
            </div>
            <PageBottom category={category} concertData={concertData} />
        </div>
    );
};

export default Detail;
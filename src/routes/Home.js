// Home.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Calendar from '../components/Calender/Calendar';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';

const Home = () => {
    const [famousList, setFamousList] = useState([]);

    fetch(`${API_BASE_URL}/famous`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 추가적인 헤더 설정 가능
        },
    })
        .then(response => response.json())
        .then(data => {

            console.log("data", data)
            const dataArray = Object.values(data.result);
            setFamousList(dataArray)
            console.log("dataArray", dataArray);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return (
        <div>
            {/* <img src='/logo192.png' style={{ display: 'flex', alignItems: 'center'}}/> */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <SearchBar />
            </div>
            <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '70px' }}> 인기 뮤지컬 </h2>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '30%', marginRight: '30%', marginBottom: '100px' }}>
                {famousList.slice(0, 3).map((concert, index) => (
                    <Link key={index} to={`/detail/${concert.category}`}>
                        <img
                            src={concert.image}
                            alt={`Concert ${index + 1}`}
                            style={{ marginLeft: '20px', marginRight: '20px', width: '300px', objectFit: 'cover' }}
                        />
                    </Link>
                ))}
            </div>

            {/* <Calendar /> */}
        </div>

    );
};

export default Home;
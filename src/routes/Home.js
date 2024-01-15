// Home.js
import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Calendar from '../components/Calender/Calendar';

const Home = () => {
    return (
        <div>
            {/* <img src='/logo192.png' style={{ display: 'flex', alignItems: 'center'}}/> */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <SearchBar />
            </div>
            <h3 style={{ textAlign: 'center', color: 'white' }}> 인기 콘서트 </h3>
            {/* <Calendar /> */}
        </div>

    );
};

export default Home;
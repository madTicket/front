// Home.js
import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';

const Home = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <SearchBar />
        </div>
    );
};

export default Home;
// Home.js
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Calendar from '../components/Calender/Calendar';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import './Home.scss'

const Home = () => {
    const [famousList, setFamousList] = useState([]);

    useEffect(() => {
        // Fetch famousList when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/famous`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Additional headers can be set here
                    },
                });

                const data = await response.json();
                const dataArray = Object.values(data.result);
                setFamousList(dataArray);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* <img src='/logo192.png' style={{ display: 'flex', alignItems: 'center'}}/> */}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <SearchBar />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        width: "30%",
                        textAlign: "center",
                        borderBottom: "1px solid #fff",
                        lineHeight: "0.1em",
                        margin: "0px 50px 60px 0",
                    }}
                />
                <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '70px' }}> 인기 뮤지컬 </h2>

                <div
                    style={{
                        width: "30%",
                        textAlign: "center",
                        borderBottom: "1px solid #fff",
                        lineHeight: "0.1em",
                        margin: "0px 0 60px 50px",
                    }}
                />
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '30%', marginRight: '30%', marginBottom: '100px' }}>
                {famousList.slice(0, 3).map((concert, index) => (
                    <Link key={index} to={`/detail/${concert.category}`} className="image-container">
                        <img
                            src={concert.image}
                            alt={`Concert ${index + 1}`}
                            className="concert-image"
                        />
                        <div className="overlay">
                            <p className="category-text">{concert.category}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* <Calendar /> */}
        </div>

    );
};

export default Home;
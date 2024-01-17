import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';

const BoardList = () => {

    const [allList, setAllList] = useState([]);

    useEffect(() => {
        // Fetch famousList when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/search`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Additional headers can be set here
                    },
                });

                const data = await response.json();
                const dataArray = Object.values(data.result);
                console.log(dataArray)
                setAllList(dataArray);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "1px solid #fff",
                        lineHeight: "0.1em",
                        margin: "0px 50px 60px 0",
                    }}
                />
                <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '80px' }}> 전체 공연 보기 </h2>

                <div
                    style={{
                        width: "20%",
                        textAlign: "center",
                        borderBottom: "1px solid #fff",
                        lineHeight: "0.1em",
                        margin: "0px 0 60px 50px",
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin: '0 auto', maxWidth: '900px' }}>
                {allList.map((concert, index) => (
                    <Link key={index} to={`/detail/${concert.category}`} className="image-container" style={{ flex: '0 0 30%', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={concert.image}
                            alt={`Concert ${index + 1}`}
                            className="concert-image"
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <div className="overlay">
                            <p className="category-text">{concert.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BoardList;
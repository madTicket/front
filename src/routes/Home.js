/* Home.js */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryList, setCategoryList] = useState([
        { category: 'React', '#': 10 },
        { category: 'JavaScript', '#': 8 },
        { category: 'Python', '#': 5 },
        { category: 'Java', '#': 3 },
        // ..
    ]);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const filtered = categoryList.filter(
            (item) => item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            // 서버로 GET 요청을 보내기
            // fetch(`${API_BASE_URL}/search?category=${encodeURIComponent(searchTerm)}`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // 추가적인 헤더 설정 가능
            //     },
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         // 서버로부터 받은 JSON 데이터 처리
            //         console.log(data);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });


            // try {
            //     const response = await axios.get(
            //         `https://api.yourservice.com/search?query=${searchTerm}`
            //     );
            //     setSearchResults(response.data.results);
            // } catch (error) {
            //     console.error('Error fetching search results:', error);
            // }
            handleSearch()
        };

        if (searchTerm.trim() !== '') {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div>
            홈 화면 입니다.
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result.category}>{result.category}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
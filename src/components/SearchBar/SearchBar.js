/* Home.js */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import './SearchBar.scss';
import _debounce from 'lodash/debounce';
import { ReactComponent as Arrow } from "../../assets/images/north_west.svg";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {

        // 서버로 GET 요청을 보내기
        fetch(`${API_BASE_URL}/search?category=${encodeURIComponent(searchTerm)}`, {
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
                setSearchResults(dataArray);
                console.log("dataArray", dataArray);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const debouncedSearch = _debounce(handleSearch, 300);

    useEffect(() => {
        const fetchSearchResults = async () => {
            debouncedSearch();
        };

        if (searchTerm.trim() !== '') {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div className="search-container">
            <Search width={25} height={25} fill='black' alt="searchIcon" className='search-icon' />
            <input className='search-bar'
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className='auto-search-container'>
                {searchResults.map((result) => (
                    <Link key={result.category} to={`/detail/${result.category}`} className="search-result-link">
                        <li className="search-result">
                            {result.category}
                            <Arrow width={25} height={25} fill='black' alt="arrowIcon" className='arrow-icon' />
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
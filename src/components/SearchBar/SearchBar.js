/* Home.js */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import './SearchBar.scss';
import _debounce from 'lodash/debounce';
import { ReactComponent as Arrow } from "../../assets/images/north_west.svg";
import { ReactComponent as Search } from "../../assets/images/search.svg";

const SearchBar = () => {
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
                    <li key={result.category} className="search-result">{result.category}
                        <Arrow width={25} height={25} fill='black' alt="arrowIcon" className='arrow-icon' />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
// Detail.js

import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    // URL 파라미터(category)를 가져오기 위해 useParams 훅 사용
    const { category } = useParams();

    return (
        <div>
            <h2>Detail Page for {category}</h2>
            {/* 여기에 해당 카테고리에 대한 상세 정보를 표시하는 내용을 추가하세요 */}
        </div>
    );
};

export default Detail;
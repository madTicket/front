import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ticket from '../../assets/images/ticket.svg';
import './TicketCard.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

function TicketCard({ unique, type, price, userId, ticketDate }) {
    const [isLiked, setIsLiked] = useState(false);
    const [inCart, setInCart] = useState(false);

    const cardStyle = {
        backgroundImage: `url(${ticket})`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        // TODO: 좋아요 한거 백엔드 업데이트 
        // TODO: 장바구니 및 구매 어떻게 할 것인지
    };

    const handleCartClick = async () => {
        setInCart(true)
        try {
            const email = localStorage.getItem('email')
            const response = await axios.post(`${API_BASE_URL}/cart`, { unique: unique, email: email }, {
                withCredentials: true
            })
            console.log(" ", response.data)
            // Check the success message in the response
            if (response.data.message === 'success') {
                alert('해당 상품이 장바구니에 담겼습니다.');
            }
            else if (response.data.message === 'already inserted') {
                alert('이미 장바구니에 있는 상품입니다.');
            }
        } catch (e) {
            console.error(e)
        }
    };

    const formattedPrice = (price) => {
        return price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
    };

    return (
        <div className="card" style={cardStyle}>
            <div className="card-content" style={{ marginLeft: '20px' }}>
                <h2 className="card-title">{type}석 &nbsp;&nbsp; {formattedPrice(price)}</h2>
                <p className="card-description">{ticketDate} &nbsp;&nbsp; {userId}</p>
            </div>
            <div className='card-content' style={{ width: '50px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'baseline', justifyContent: 'space-between' }}>
                {isLiked ? (
                    <FaHeart color='red' onClick={handleLikeClick} className='icon' style={{ fontSize: '1.5em' }} />
                ) : (
                    <FaRegHeart onClick={handleLikeClick} className='icon' style={{ fontSize: '1.5em' }} />
                )}
                <FaShoppingCart onClick={handleCartClick} className='icon' style={{ fontSize: '1.5em' }} />
            </div>
        </div>
    );
}

export default TicketCard;
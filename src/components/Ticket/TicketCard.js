import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ticket from '../../assets/images/ticket.svg';
import './TicketCard.scss';

function TicketCard({ type, price, userId, ticketDate }) {
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

    const handleCartClick = () => {
        setInCart(!inCart)
        // TODO: 좋아요 한거 백엔드 업데이트 
        // TODO: 장바구니 및 구매 어떻게 할 것인지
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
                    <FaHeart onClick={handleLikeClick} className='icon' style={{ fontSize: '1.5em' }} />
                ) : (
                    <FaRegHeart onClick={handleLikeClick} className='icon' style={{ fontSize: '1.5em' }} />
                )}
                <FaShoppingCart onClick={handleCartClick} className='icon' style={{ fontSize: '1.5em' }} />
            </div>
        </div>
    );
}

export default TicketCard;
import React, { useState, useRef } from 'react';
import TicketCard from './TicketCard';
import Modal from './Modal';
import { FilledBtn, BackgroundOverlay, ModalContent } from '../CommonStyles';
import { API_BASE_URL } from '../../config';
import { IoAddOutline } from "react-icons/io5";

const CardList = ({ selectedDate, cardsData, category, concertData }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const cardListRef = useRef(null);

    console.log("cardList selectedDate", selectedDate)

    const openModal = () => {
        if(localStorage.getItem('login-token')){
            setModalOpen(true);
        }else{
            alert('로그인을 해야 이용하실 수 있습니다.');
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleScroll = () => {
        // Get the current scroll position
        const scrollTop = cardListRef.current.scrollTop;

        // Adjust margin-top based on the scroll position
        cardListRef.current.style.marginTop = `${scrollTop}px`;
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '850px', width: '60%', margin: '0 auto', marginBottom: '20px' }}>
                <FilledBtn onClick={openModal} style={{ alignSelf: 'flex-end', marginTop: '20px' }} endIcon={<IoAddOutline />}>티켓 올리기</FilledBtn>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '850px', width: '60%', margin: '0 auto', overflowX: 'auto', maxHeight: '60vh' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', margin: '0 auto' }}>
                    {cardsData
                        .filter(result => !selectedDate || result.ticketDate === selectedDate) // Filter based on selectedDate
                        .map((result) => (
                            <TicketCard key={result.unique} unique={result.unique} type={result.type} price={result.price} userId={result.userId} ticketDate={result.ticketDate} />
                        ))}
                </div>
                {isModalOpen && <Modal onClose={closeModal} category={category} concertData={concertData} />}
            </div>
        </>


        // <div
        //     ref={cardListRef}
        //     style={{ display: 'flex', flexDirection: 'row', minWidth: '850px', width: '70%', margin: '0 auto', overflowX: 'auto', maxHeight: '80vh' }}
        // >
        //     <OutlineBtn onClick={openModal}>티켓 올리기</OutlineBtn>
        //     <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', margin: '0 auto' }}>
        //         {cardsData.map((result) => (
        //             <TicketCard key={result.unique} type={result.type} price={result.price} userId={result.userId} ticketDate={result.ticketDate} />
        //         ))}
        //     </div>
        //     {isModalOpen && <Modal onClose={closeModal} category={category} concertData={concertData} />}
        // </div>
    );
};

export default CardList;
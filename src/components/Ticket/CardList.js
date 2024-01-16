import React from 'react';
import TicketCard from './TicketCard'; // 위에서 만든 Card 컴포넌트 import

const CardList = ({cardsData}) => {
    console.log("CardList cardsData:", cardsData)
    // const cardsData = [
    //     {
    //         title: 'Card 1',
    //         description: 'Description for Card 1',
    //     },
    //     {
    //         title: 'Card 2',
    //         description: 'Description for Card 2',
    //     },
    //     {
    //         title: 'Card 1',
    //         description: 'Description for Card 1',
    //     },
    //     {
    //         title: 'Card 2',
    //         description: 'Description for Card 2',
    //     },
    //     {
    //         title: 'Card 1',
    //         description: 'Description for Card 1',
    //     },
    //     {
    //         title: 'Card 2',
    //         description: 'Description for Card 2',
    //     },
    //     // Add more card data as needed
    // ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', minWidth: '850px', width: '70%', margin: '0 auto' }}>
            {cardsData.map((result) => (
                <TicketCard type={result.type} price={result.price} userId={result.userId} ticketDate={result.ticketDate}/>
            ))}
        </div>
    );
};

export default CardList;
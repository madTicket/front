import styled, { keyframes } from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ver_tickeet from '../assets/images/ver_ticket.svg'
import '../components/Ticket/TicketCard.scss'
import HorizonLine from '../components/HorizonLine';
import { TiDelete } from "react-icons/ti";
import { FilledBtn } from '../components/CommonStyles';
import EditModal from '../components/Auth/EditModal';
import Kakaopay from '../assets/images/Kakaopay.png'

const slideUpAnimation = keyframes`
    from {
        margin-top: 270px;
        opacity: 0;
    }

    to {
        margin-top: 70px;
        opacity: 1;
    }
`;

const WhiteBox = styled.div`
    width: 100%;
    height: 1200px;
    border-top-left-radius: 200px;
    border-top-right-radius: 200px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: ${props => props.width || 'white'};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 70px;
    animation: ${slideUpAnimation} 0.5s ease-in-out; /* Apply the animation here */
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    width: 70%;
`;

const PayBtn = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    width: 70px;
    height: 30px;
    border-radius: 100px;
    background-image: url(${Kakaopay});
    background-size: contain;
`;

const MyPage = () => {
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [cartList, setCartList] = useState([]);
    const [sellingList, setSellingList] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const cardStyle = {
        backgroundImage: `url(${ver_tickeet})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '1050px'
    };

    const fetchCartData = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/cartget`,{ email: email}, {
                withCredentials: true
            })
            const data = response.data
            const dataArray = Object.values(data.result);

            setCartList(dataArray);
            console.log(cartList);

        } catch (e) {
            console.error(e)
        }
    };

    const fetchKakao = async (unique,price,category) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/kakaopay`,{ unique: unique, category: category, price: price}, {
                withCredentials: true
            })
            const url = response.data.next_url
            window.open(url, '_blank');

        } catch (e) {
            console.error(e)
        }
    };

    const fetchSellingData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/ticketUser?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Additional headers can be set here
                },
            });

            const data = await response.json();
            const dataArray = Object.values(data.results);
            setSellingList(dataArray);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        fetchSellingData();
    }, []);

    const cartDelete = async (unique) => {
        console.log(email, unique);
        try {
            const response = await axios.delete(`${API_BASE_URL}/cartdelete/${encodeURIComponent(email)}/${encodeURIComponent(unique)}`, {
                withCredentials: true
            })
            const data = response.data

            console.log(response)
            fetchCartData();

        } catch (e) {
            console.error(e)
        }
    };

    const sellingDelete = async (unique) => {
        console.log(email, unique);
        try {
            const response = await axios.delete(`${API_BASE_URL}/ticketdelete/${encodeURIComponent(unique)}`, {
                withCredentials: true
            })
            const data = response.data

            console.log(response)
            fetchSellingData();

        } catch (e) {
            console.error(e)
        }
    };

    const onAnimationEnd = () => {
        // After animation ends, disable further animation and enable overflow
        document.body.style.overflow = 'auto';
    };

    const formattedPrice = (price) => {
        const numericPrice = isNaN(price) ? 0 : Number(price);
        return numericPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
    };

    return (
        <WhiteBox onAnimationStart={onAnimationEnd}>
            <ContentWrapper style={{ display: 'flex', alignItems: 'center', width: '60%', paddingTop: '70px', paddingBottom: '30px' }}>
                <h2 style={{fontSize: '35px', paddingTop: '1px'}}>{userId}({username})님, &nbsp;</h2><h2 style={{paddingTop: '3px'}}> 안녕하세요. &nbsp;&nbsp;</h2>
                <FilledBtn width="150px" onClick={openEditModal}>
                    정보 수정하기 &nbsp;
                    <MdEdit />
                </FilledBtn>
            </ContentWrapper>

            <ContentWrapper>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card" style={cardStyle}>
                        <div className="card-content">
                            <h2 className="card-title" style={{ marginTop: '30px', marginBottom: '40px', textAlign: 'center' }}>장바구니</h2>
                            <HorizonLine />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', margin: '0 auto' }}>
                                {cartList
                                    .map((result) => (
                                        <div key={result.unique}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
                                                <div style={{width: '60%'}}>
                                                    <p className="card-description" style={{ fontSize: '1.2em', marginBottom: '5pt'}}>{result.category}</p>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <p className="card-description">{result.type}석</p>
                                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                        <p className="card-description">{formattedPrice(result.price)}</p>
                                                        {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; */}
                                                    </div>
                                                </div>
                                                <PayBtn onClick={() => fetchKakao(result.unique, result.price, result.category)}/>
                                                <TiDelete className='icon' onClick={() => cartDelete(result.unique)} style={{ fontSize: '1.7em' }} />
                                            </div>
                                            <br />

                                        </div>

                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card" style={cardStyle}>
                        <div className="card-content">
                            <h2 className="card-title" style={{ marginTop: '30px', marginBottom: '40px', textAlign: 'center' }}>판매 중</h2>
                            <HorizonLine />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', margin: '0 auto' }}>
                                {sellingList
                                    .map((result) => (
                                        <div key={result.unique}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
                                                <div>
                                                    <p className="card-description" style={{ fontSize: '1.2em', marginBottom: '5pt' }}>{result.category}</p>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <p className="card-description">{result.type}석</p>
                                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                        <p className="card-description">{formattedPrice(result.price)}</p>
                                                    </div>


                                                </div>
                                                <TiDelete className='icon' onClick={() => sellingDelete(result.unique)} style={{ fontSize: '1.7em' }} />
                                            </div>
                                            <br />

                                        </div>

                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
            {isEditModalOpen && <EditModal isVisible={isEditModalOpen} onClose={closeEditModal} />}
        </WhiteBox>
    );
};

export default MyPage;
import React, { useEffect, forwardRef } from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent, AuthWrapper } from '../Auth';
import { useState } from 'react';
import Select from 'react-select'
import { BackgroundOverlay, ModalContent } from '../CommonStyles';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { FilledBtn } from '../CommonStyles';
import DatePicker from 'react-datepicker';
import { parseISO, differenceInDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";
import { DateBtn } from '../CommonStyles';



const typeOptions = [
    { value: 'VIP', label: 'VIP' },
    { value: 'R', label: 'R' },
    { value: 'S', label: 'S' },
    { value: 'A', label: 'A' },
];

const Modal = ({ onClose, category, concertData }) => {
    const [unique, setUnique] = useState('');
    const [ticketDate, setTicketDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const [max, setMax] = useState(0);
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [predicted, setPredicted] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    console.log("userId", localStorage.getItem('userId'))
    console.log("email", localStorage.getItem('email'))
    console.log("login-token", localStorage.getItem('login-token'))
    console.log("concertDate", concertData.dateStart, concertData.dateEnd)

    const uploadTicket = async () => {
        if (!unique || !ticketDate || !type || !price) {
            alert('모든 입력 필드를 채워주세요.');
            return false;
        }
        try {
            // 티켓 업로드 로직 추가
            const email = localStorage.getItem('email')
            const response = await axios.post(`${API_BASE_URL}/ticket`, { unique: unique, ticketDate: ticketDate, category: category, price: price, userId: email, type: type, use_agent: isCheckboxChecked, image: ' ' }, {
                withCredentials: true
            })
            console.log(" ", response.data)
            // Check the success message in the response
            if (response.data.message === 'ticket upload completed') {
                // Ticket uploaded successfully
                onClose();
                alert('티켓이 성공적으로 등록되었습니다.');
            }
        } catch (e) {
            console.error(e)
        }
    }

    const fetchData = async () => {
        try {
            if (!type || !price) {
                alert('티켓 종류와 판매 가격을 선택해주세요.');
                return false;
            }
            else {
                const response = await axios.post(`${API_BASE_URL}/price`, { category: category, price: price, max: max, type: type }, {
                    withCredentials: true
                })
                console.log(" ", response.data)
                setPredicted(response.data.time)
            }
            // setPredicted(response.data)

        } catch (e) {
            console.error(e)
        }
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <DateBtn onClick={onClick} ref={ref}>
            {value}
        </DateBtn>
    ));

    const handleMaxDateChange = (date) => {
        setMaxDate(date);

        // Calculate the difference in days between today and the selected maxDate
        const today = new Date();
        setMax(differenceInDays(date, today));
        console.log('Days difference:', max);
    };

    function formatHoursToDaysAndHours(hours) {
        const days = Math.floor(hours / 24);
        const remainingHours = Math.floor(hours % 24);

        let result = '';

        if (days > 0) {
            result += `${days} 일`;
        }

        if (remainingHours > 0) {
            result += `${remainingHours} 시간`;
        }

        return result;
    }

    return (
        <BackgroundOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <AuthContent title={'티켓 등록'} width="600px">
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <p style={{ width: '120px' }}>티켓 날짜</p>
                            <DatePicker
                                selected={ticketDate}
                                onChange={(date) => setTicketDate(date)}
                                dateFormat="yyyy-MM-dd"
                                minDate={concertData.dateStart > new Date() ? parseISO(concertData.dateStart) : new Date()}
                                maxDate={new Date(concertData.dateEnd)}
                                customInput={<ExampleCustomInput />}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <p style={{ width: '120px' }}>판매 마감 기한</p>
                            <DatePicker
                                selected={maxDate}
                                onChange={(date) => handleMaxDateChange(date)}
                                dateFormat="yyyy-MM-dd"
                                minDate={concertData.dateStart > new Date() ? parseISO(concertData.dateStart) : new Date()}
                                maxDate={new Date(ticketDate)}
                                customInput={<ExampleCustomInput />}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'left' }}>
                        <div>
                            <p> 좌석 종류 </p>
                            <Select
                                options={typeOptions}
                                value={typeOptions.find(option => option.value === type)}
                                onChange={(selectedOption) => setType(selectedOption.value)}
                                placeholder="Select Type"
                                styles={{
                                    // Set a fixed width (e.g., 200px)
                                    control: (provided) => ({ ...provided, width: 200 }),
                                }}
                            />
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <InputWithLabel
                            width={'140%'}
                            label="일련번호"
                            name="일련번호"
                            placeholder="일련번호"
                            value={unique}
                            onChange={(e) => setUnique(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <InputWithLabel
                            width={'70%'}
                            label="판매희망가격"
                            name="price"
                            placeholder="판매희망가격"
                            type="number"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <p style={{fontSize: '20px', marginLeft: '-50px', marginTop: '50px'}}>₩</p>

                        <FilledBtn onClick={fetchData} style={{ marginLeft: '20px', marginTop: '30px'}}>
                            예상판매시간
                        </FilledBtn>

                        {predicted > 0 && (
                            <p style={{fontSize: '12px', color: 'gray', marginLeft: '10px', marginTop: '50px'}}>약 {formatHoursToDaysAndHours(predicted)} 후에 판매될 것이라 예상됩니다.</p>
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ marginTop: '20px', width: '300px' }}>
                            알뜰이 사용 여부 &nbsp;&nbsp;
                            <input
                                type="checkbox"
                                checked={isCheckboxChecked}
                                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                            />
                        </label>
                    </div>
                    <p style={{ fontSize: '12px', color: 'gray' }}> 알뜰이를 이용할 경우 실시간 티켓 가격을 반영해 더 빠르고 합리적으로 가격을 조정해 티켓을 판매할 수 있도록 도와드립니다!   &nbsp;&nbsp; ※ 가격은 1시간마다 업데이트 되며 알림이 갑니다! ※ </p>

                    <AuthButton onClick={uploadTicket}>티켓 올리기</AuthButton>
                </AuthContent>
            </ModalContent>
        </BackgroundOverlay>
    );
};

export default Modal;
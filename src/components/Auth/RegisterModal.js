import React, { useEffect, forwardRef } from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent, AuthWrapper } from '../Auth';
import { useState } from 'react';
import { BackgroundOverlay, ModalContent } from '../CommonStyles';
import axios from 'axios';
import oc from 'open-color';
import { API_BASE_URL } from '../../config';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const Aligner = styled.div`
    margin-top: 1rem;
    text-align: right;
    color: ${oc.gray[6]};
    &:hover {
        color: ${oc.gray[7]};
    }
`;

const RegisterModal = ({ isVisible, onClose, onLog }) => {
    const [username, setUserName] = useState('');
    const [userid, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordc, setPasswordC] = useState('');

    async function SignUp() {

        if (!username || !userid || !email || !password || !passwordc) {
            alert('모든 입력 필드를 채워주세요.');
            return false;
        } else if (password !== passwordc) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/signUp`, { userName: username, userId: userid, email: email, password: password }, {
                withCredentials: true
            })
            console.log(" ", response.data)

            if (response.data.message === 'user already exists') {
                alert('이미 존재하는 사용자입니다.');
            } else if (response.data.message === 'sign up completed') {
                alert('회원가입이 완료되었습니다. ${userId}님 환영합니다.');

                onClose()
                // Additional logic for successful signup, e.g., redirect or update UI
            }
        } catch (e) {
            console.error(e)
        }
    }

    const toLogin = () => {
        onClose()
        onLog()
    }

    return (
        <BackgroundOverlay isVisible={isVisible}  onClick={onClose}>
            <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
                <AuthContent title="회원가입" width="400px">
                    <InputWithLabel label="이름" name="username" placeholder="이름" value={username} onChange={(e) => setUserName(e.target.value)} />
                    <InputWithLabel label="별명" name="userid" placeholder="별명" value={userid} onChange={(e) => setUserId(e.target.value)} />
                    <InputWithLabel label="이메일" name="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value={passwordc} onChange={(e) => setPasswordC(e.target.value)} />
                    <AuthButton onClick={SignUp}>회원가입</AuthButton>
                    <Aligner onClick={ toLogin }>로그인</Aligner>
                </AuthContent>
            </ModalContent>
        </BackgroundOverlay>
    );
};

export default RegisterModal;
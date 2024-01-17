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

const LoginModal = ({ isVisible, onClose, onReg }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        if (!email) {
            alert('아이디를 입력해주세요.');
            return false;
        } else if (!password) {
            alert('비밀번호를 입력해주세요.');
            return false;
        }
        try {

            console.log('Email:', email);
            console.log('Password:', password);

            const response = await axios.post(`${API_BASE_URL}/login`, { email: email, password: password }, {
                withCredentials: true
            })
            console.log(" ", response.data)
            if (response.data.message === "invalid password") { 
                alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
            }
            if (response.data.message === 'Found user') {
                // Save JWT token to local storage
                localStorage.clear();
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('login-token', response.data.jwt);

                alert('${response.data.username}님 환영합니다.');
                await new Promise((resolve) => setTimeout(resolve, 0));
                // Redirect to the home page
                onClose()
                window.location.reload();
            } else {
                // Handle other cases if needed
                alert('로그인 실패');
            }
        } catch (e) {
            console.error(e)
        }
    }

    const toRegister = () => {
        onClose()
        onReg()
    }

    return (
        <BackgroundOverlay isVisible={isVisible} onClick={onClose}>
            <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
                <AuthContent title={'로그인'} width="400px">
                    <InputWithLabel
                        label="이메일"
                        name="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <InputWithLabel
                        label="비밀번호"
                        name="password"
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <AuthButton onClick={login}>로그인</AuthButton>
                    <Aligner onClick={toRegister}>회원가입</Aligner>
                    {/* <RightAlignedLink to="/register">회원가입</RightAlignedLink> */}
                </AuthContent>
            </ModalContent>
        </BackgroundOverlay>
    );
};

export default LoginModal;
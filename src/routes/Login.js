import React from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent, AuthWrapper } from '../components/Auth';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { BackgroundColor, Box } from '../components/CommonStyles';

const Login = () => {
    const navigate = useNavigate();

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
            
            console.log(response.data, response.data.userName);
            console.log(" ", response.data)
            if (response.data.message === 'Found user') {
                // Save JWT token to local storage
                localStorage.clear();
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('login-token', response.data.jwt);

                await new Promise((resolve) => setTimeout(resolve, 0));
                // Redirect to the home page
                navigate('/');
                window.location.reload();
            } else {
                // Handle other cases if needed
                alert('로그인 실패');
            }
        } catch (e) {
            console.error(e)
        }
    }

    console.log("Login");
    return (
        // <BackgroundColor>
            <AuthWrapper >
                <AuthContent title={'로그인'}>
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
                    <RightAlignedLink to="/register">회원가입</RightAlignedLink>
                </AuthContent>
            </AuthWrapper>
        // </BackgroundColor>
    );
};

export default Login;
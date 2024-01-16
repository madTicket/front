import React from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent, AuthWrapper } from '../components/Auth';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { Box } from '../components/CommonStyles';

function Register() {
    const navigate = useNavigate();

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
                alert('회원가입이 완료되었습니다.');

                navigate('/');
                // Additional logic for successful signup, e.g., redirect or update UI
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <AuthWrapper>
            <AuthContent title="회원가입">
                <InputWithLabel label="이름" name="username" placeholder="이름" value={username} onChange={(e) => setUserName(e.target.value)} />
                <InputWithLabel label="별명" name="userid" placeholder="별명" value={userid} onChange={(e) => setUserId(e.target.value)} />
                <InputWithLabel label="이메일" name="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value={passwordc} onChange={(e) => setPasswordC(e.target.value)} />
                <AuthButton onClick={SignUp}>회원가입</AuthButton>
                <RightAlignedLink to="/login">로그인</RightAlignedLink>
            </AuthContent>
        </AuthWrapper>
    );
}

export default Register;
import React from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent } from '../components/Auth';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUserName] = useState('');
    const [userid, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordc, setPasswordC] = useState('');

    async function signup() {
        if (!username || !userid || !email || !password || !passwordc) {
            alert('모든 입력 필드를 채워주세요.');
            return false;
        } else if (password !== passwordc) {
            alert('비밀번호가 일치하지 않습니다.');
        }
        try {
            const response = await axios.post("http://192.249.31.65:5000/signUp", { userName: username, userId: userid, email: email, password: password}, {
                withCredentials: true
            })
            console.log(" ", response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <AuthContent title="회원가입">
            <InputWithLabel label="이름" name="username" placeholder="이름"  value={username} onChange={(e) => setUserName(e.target.value)}/>
            <InputWithLabel label="별명" name="userid" placeholder="별명"  value={userid} onChange={(e) => setUserId(e.target.value)}/>
            <InputWithLabel label="이메일" name="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password"  value={passwordc} onChange={(e) => setPasswordC(e.target.value)}/>
            <AuthButton onClick={signup}>회원가입</AuthButton>
            <RightAlignedLink to="/login">로그인</RightAlignedLink>
        </AuthContent>
    );
}

export default Register;
// /* Login.js */
// import React from 'react';
// import GoogleLoginButton from '../GoogleLoginButton';
// import NaverLoginButton from '../NaverLoginButton';
// import { useState } from 'react';
// import LoginButton from '../LoginButton';



// const Login = () => {
//     const [id, setId] = useState("")
//     const [pw, setPw] = useState("")
//     function onChangeId (e){
//         setId(e.target.value);
//     }
//     function onChangePw (e){
//         setPw(e.target.value);
//     }

//     // const navigate = useNavigate();

//     // const handleNavigateBack = () => {
//     //     navigate(-1);
//     // };

//     // const handleLogin = () => {
//     //     // 구글 로그인 화면으로 이동시키기
//     //     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
//     //         client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
//     //         &redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}
//     //         &response_type=code
//     //         &scope=email profile`;
//     // };

//     return (
//         // <div>
//         //     <a href='http://192.249.31.112:5000/'>로그인</a>
//         // </div>

//         <div className='GoogleLogin'>
//             {/* <InputWithLabel label="이메일" name="email" placeholder="이메일"/>
//             <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/> */}

//             {/* <input onChange = {onChangeId}/>
//             <input onChange = {onChangePw}/>
//             <h3>{id}</h3>
//             <p>{pw}</p> */}
//             {/* <GoogleLoginButton />
//             <NaverLoginButton /> */}
//             {/* <LoginButton /> */}
//         </div>
//         // <SignUpContainer>
//         //     <ArrowIcon src={Arrow} onClick={handleNavigateBack} />
//         //     <Copy>안녕하세요</Copy>
//         //     <Copy>구글 계정이 있나요?</Copy>
//         //     <GBtn src={GoogleBtn} onClick={handleLogin} />
//         // </SignUpContainer>
//     );
// };

// export default Login;

// import React, { Component } from 'react';
// import { AuthContent } from '../components/Auth/index';
// import InputWithLabel from '../components/Auth/index';
// import AuthButton from '../components/Auth/index';

// class Login extends Component {
//     render() {
//         return (
//             <AuthContent title="로그인">
//                 <InputWithLabel label="이메일" name="email" placeholder="이메일"/>
//                 <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
//                 <AuthButton>로그인</AuthButton>
//             </AuthContent>
//         );
//     }
// }

// export default Login;
import React from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink } from '../components/Auth';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

            const response = await axios.post("http://192.249.31.65:5000/login", { email: email, password: password }, {
                withCredentials: true
            })
            console.log(" ", response.data)
            if (response.data.message === 'Found user') {
                // Save JWT token to local storage
                localStorage.clear()
                localStorage.setItem('email', response.data.email)
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
        <div>
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
        </div>
    );
};

export default Login;
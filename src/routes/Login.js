/* Home.js */
import React from 'react';
import GoogleLoginButton from '../GoogleLoginButton';

const Login = () => {
    // const navigate = useNavigate();

    // const handleNavigateBack = () => {
    //     navigate(-1);
    // };

    // const handleLogin = () => {
    //     // 구글 로그인 화면으로 이동시키기
    //     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
    //         client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
    //         &redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}
    //         &response_type=code
    //         &scope=email profile`;
    // };

    return (
        // <div>
        //     <a href='http://192.249.31.112:5000/'>로그인</a>
        // </div>

        <div className='GoogleLogin'>
            <GoogleLoginButton />
        </div>
        // <SignUpContainer>
        //     <ArrowIcon src={Arrow} onClick={handleNavigateBack} />
        //     <Copy>안녕하세요</Copy>
        //     <Copy>구글 계정이 있나요?</Copy>
        //     <GBtn src={GoogleBtn} onClick={handleLogin} />
        // </SignUpContainer>
    );
};

export default Login;
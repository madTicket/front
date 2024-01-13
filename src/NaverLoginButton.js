import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NaverLoginButton() {
    useEffect(() => {
        initNaverLogin();
        getNaverToken();
    }, []);

    const location = useLocation();

    const getNaverToken = () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        console.log(token);

        sendTokenToBackend(token)
    };
    const navigate = useNavigate();

    const sendTokenToBackend = async (token) => {
        try {
            // Send the access token to the Flask backend
            const response = await axios.post("http://192.168.0.16:5000/verify-naver-token", { token });
            console.log("Backend Response:", response.data);

            if (response.status === 200) {
                console.log("log.data", response.status)
                // If successful, setRedirect to true
                // navigate("/")
            } else {
                // Handle other responses or show an error
            }
        } catch (error) {
            console.error("Error sending Naver access token to the backend:", error);
        }
    };

    const initNaverLogin = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "DHSd4Xh22Nn5wNMF7yEo",
            callbackUrl: `http://localhost:3001/login`,
            isPopup: false,
            loginButton: { color: "green", type: 3, height: 60 },
            callbackHandle: true,
        });
        naverLogin.init();
    };

    // const getData = () => {
    //     if (window.location.href.includes("access_token")) {
    //         console.log("We got AccessToken");
    //     }
    // };

    return (
        <React.Fragment>
            <div id="naverIdLogin" />
        </React.Fragment>
    );
}


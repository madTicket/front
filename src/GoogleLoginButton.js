import React from 'react';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = () => {
    const clientId = '78372213139-32um8dhc4u3f2av15cqtssbgeu91qgvq.apps.googleusercontent.com'; // Replace with your actual Google Client ID

    const onSuccess = async (credentialResponse) => {
        // Handle successful login

        try {
            const response = await axios.post(
                'http://localhost:3001/login',
                { access_token: credentialResponse.credential },
                { withCredentials: true }
            );
            console.log(response.data);
            // Handle the response as needed
        } catch (error) {
            console.error('Login failed:', error);
        }

        // await axios.post('http://your-backend-url/login/google', {
        //     code: credentialResponse.code,
        // });
        // console.log(jwtDecode(credentialResponse.credential));
    };

    const onFailure = (error) => {
        // Handle login failure
        console.error(error);
    };

    return (
        <>
            <GoogleOAuthProvider clientId={clientId} >
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    redirectUri="http://localhost:3001/login"
                />
            </GoogleOAuthProvider>
        </ >
    );
};

export default GoogleLoginButton;
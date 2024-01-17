import React, { useState, useEffect } from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from './Layout.module.scss'
import { useNavigate } from 'react-router';

const Layout = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        // Check the authentication status when the component mounts
        checkAuthenticationStatus();
    }, []);

    const checkAuthenticationStatus = async () => {
        const token = localStorage.getItem('login-token');
        setIsLoggedIn(!!token);
    };

    const logout = () => {
        localStorage.removeItem('login-token');
        localStorage.clear();
        checkAuthenticationStatus();

        navigate('/');
    };

    return (
        <div className={styles.layout}>
            <Header isLoggedIn={isLoggedIn} onLogout={logout}/>

            <main className={styles.main}>
                {props.children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout

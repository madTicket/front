import React, { useState, useEffect } from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from './Layout.module.scss'

const Layout = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        checkAuthenticationStatus();
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

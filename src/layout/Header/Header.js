import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import axios from "axios";
import LoginModal from '../../components/Auth/LoginModal';
import RegisterModal from '../../components/Auth/RegisterModal';
import LogoutModal from '../../components/Auth/LogoutModal'
import { FilledBtn, OutlineBtn } from '../../components/CommonStyles';
import Title from '../../assets/images/title.svg';

axios.defaults.withCredentials = true;

const Header = ({ isLoggedIn, onLogout }) => {


    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const openRegisterModal = () => {
        setRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setRegisterModalOpen(false);
    };

    const openLogoutModal = () => {
        setLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.contents}>
                <div className={styles.logo} style={{ width: '400px' }}>
                    {/* LOGO */}
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>

                        <Link to="/" style={{ width: '110px', marginRight: '20px' }}>
                            <img src={Title} style={{ display: 'block', width: '100%' }} />
                        </Link>

                        <div style={{ marginLeft: '0px' }} className={styles.viewAll}>
                            <Link to="/board">전체 보기</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.btnContainer}>
                    {isLoggedIn ? (
                        <OutlineBtn color='white' outline='1px solid white' onClick={openLogoutModal}> 로그아웃 </OutlineBtn>
                    ) : (
                        <OutlineBtn color='white' outline='1px solid white' onClick={openLoginModal}>로그인</OutlineBtn>
                    )}

                    &nbsp;&nbsp;

                    {isLoggedIn ? (
                        <Link to="/mypage">
                            <FilledBtn fill='#005096' >마이페이지</FilledBtn>
                        </Link>
                    ) : (
                        <FilledBtn fill='#005096' onClick={openRegisterModal}>회원가입</FilledBtn>

                    )}
                </div>
                {isRegisterModalOpen && <RegisterModal isVisible={isRegisterModalOpen} onClose={closeRegisterModal} onLog={openLoginModal} />}
                {isLoginModalOpen && <LoginModal isVisible={isLoginModalOpen} onClose={closeLoginModal} onReg={openRegisterModal} />}
                {isLogoutModalOpen && <LogoutModal isVisible={isLogoutModalOpen} onClose={closeLogoutModal} logout={onLogout} />}
            </div>
        </header>
    );
};

export default Header;
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

// axios.create({
//     baseURL: "http://madticket.pythonanywhere.com",
//     headers: {
//         "post": "true",
//         "Content-Type": "application/json"
//     },
//     withCredentials: true
// });

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

    // async function loginBtn () {
    //     // try{
    //     //     const response = await axios.post("http://192.249.31.65:5000",{id: 12},{
    //     //         withCredentials: true
    //     //     })
    //     //     console.log(" ", response.data)
    //     // }catch  (e){
    //     //     console.error(e)
    //     // }
    //     ////////////////
    //     // try{
    //     //     const response = await axios.get("http://madticket.pythonanywhere.com/login",{
    //     //         withCredentials: true
    //     //     });
    //     //     console.log("Backend Response:", response.data);
    //     // }catch (e){
    //     //     console.error(e)
    //     // }
    // }

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

                {/* <nav className={styles.navigation}>
                    <ul> */}
                {/* <li>
                            <Link to="/">홈</Link>
                            <script>
                                console.log("Home");
                            </script>
                        </li>
                        &nbsp;&nbsp; | &nbsp;&nbsp; */}
                {/* <li>
                            <Link to="/board">전체 보기</Link>
                        </li>
                    </ul>
                </nav> */}

                {/* <nav className={styles.navigation}>
                    <ul>
                        <li>
                            {isLoggedIn ? (
                                <>
                                    <Link to="/" onClick={onLogout}>
                                        로그아웃
                                    </Link>
                                    &nbsp;&nbsp; | &nbsp;&nbsp;
                                    <Link to="/mypage">마이페이지</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">로그인</Link>
                                    &nbsp;&nbsp; | &nbsp;&nbsp;
                                    <Link to="/register">회원가입</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </nav> */}


                {/* <div>
                    {isLoggedIn ? (
                        <>
                            <button onClick={onLogout}>
                                로그아웃
                            </button>
                            &nbsp;&nbsp;
                            <Link to="/mypage">마이페이지</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button>로그인</button>
                            </Link>
                            &nbsp;&nbsp;
                            <Link to="/register">
                                <button>회원가입</button>
                            </Link>
                        </>
                    )}
                </div> */}

                <div className={styles.btnContainer}>
                    {isLoggedIn ? (
                        <OutlineBtn color='white' outline='1px solid white' onClick={openLogoutModal}> 로그아웃 </OutlineBtn>
                    ) : (
                        // <Link to="/login">
                        //     <button className={styles.leftBtn}>로그인</button>
                        // </Link>
                        <OutlineBtn color='white' outline='1px solid white' onClick={openLoginModal}>로그인</OutlineBtn>
                    )}

                    &nbsp;&nbsp;

                    {isLoggedIn ? (
                        <Link to="/mypage">
                            <FilledBtn fill='#005096' >마이페이지</FilledBtn>
                        </Link>
                    ) : (
                        // <Link to="/register">
                        //     <button className={styles.rightBtn}>회원가입</button>
                        // </Link>
                        <FilledBtn fill='#005096' onClick={openRegisterModal}>회원가입</FilledBtn>

                    )}
                </div>
                {isRegisterModalOpen && <RegisterModal isVisible={isRegisterModalOpen} onClose={closeRegisterModal} onLog={openLoginModal} />}
                {isLoginModalOpen && <LoginModal isVisible={isLoginModalOpen} onClose={closeLoginModal} onReg={openRegisterModal} />}
                {isLogoutModalOpen && <LogoutModal isVisible={isLogoutModalOpen} onClose={closeLogoutModal} logout={onLogout} />}
            </div>
            {/* <Link to="/">홈</Link>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <Link to="/board">게시판</Link>
            <hr /> */}
        </header>
    );
};

export default Header;
import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import axios from "axios";

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
                <div className={styles.logo}>
                    {/* LOGO */}
                    <Link to="/">LOGO</Link>
                </div>

                <nav className={styles.navigation}>
                    <ul>
                        {/* <li>
                            <Link to="/">홈</Link>
                            <script>
                                console.log("Home");
                            </script>
                        </li>
                        &nbsp;&nbsp; | &nbsp;&nbsp; */}
                        <li>
                            <Link to="/board">전체보기</Link>
                        </li>
                    </ul>
                </nav>

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
                        <button className={styles.leftBtn} onClick={onLogout}> 로그아웃 </button>
                    ) : (
                        <Link to="/login">
                            <button className={styles.leftBtn}>로그인</button>
                        </Link>
                    )}

                    &nbsp;&nbsp;

                    {isLoggedIn ? (
                        <Link to="/mypage">
                            <button className={styles.rightBtn}>마이페이지</button>
                        </Link>
                    ) : (
                        <Link to="/register">
                            <button className={styles.rightBtn}>회원가입</button>
                        </Link>
                    )}
                </div>

            </div>
            {/* <Link to="/">홈</Link>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <Link to="/board">게시판</Link>
            <hr /> */}
        </header>
    );
};

export default Header;
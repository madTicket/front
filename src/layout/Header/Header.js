import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.contents}>
                <div className={styles.logo}>
                    LOGO
                    {/* <Link to="/">LOGO</Link> */}
                </div>

                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <Link to="/">홈</Link>
                        </li>
                        &nbsp;&nbsp; | &nbsp;&nbsp;
                        <li>
                            <Link to="/board">게시판</Link>
                        </li>
                    </ul>
                </nav>
                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <a href='/login'>로그인</a>
                            {/* <Link to="/login">로그인</Link> */}
                        </li>
                        &nbsp;&nbsp; | &nbsp;&nbsp;
                        <li>
                            <Link to="/board">회원가입</Link>
                        </li>
                    </ul>
                </nav>

            </div>
            {/* <Link to="/">홈</Link>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <Link to="/board">게시판</Link>
            <hr /> */}
        </header>
    );
};

export default Header;
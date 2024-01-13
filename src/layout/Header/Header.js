import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import axios from "axios";

axios.defaults.withCredentials = true;

axios.create({
    baseURL: "http://madticket.pythonanywhere.com",
    headers: {
        "post": "true",
        "Content-Type": "application/json"
    },
    withCredentials: true
});

const Header = () => {

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
                    LOGO
                    {/* <Link to="/">LOGO</Link> */}
                </div>

                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <Link to="/">홈</Link>
                            <script>
                                console.log("Home");
                            </script>
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
                            {/* <a href='http://madticket.pythonanywhere.com/login'>로그인</a>
                            <script>
                                console.log("Hello world");
                                console.log(response.data);
                                const response = await axios.post("http://madticket.pythonanywhere.com/login", { });
                                console.log("Hello world");
                                console.log(response.data);
                            </script> */}
                            {/* <button onClick={loginBtn}>로그인</button> */}
                            <Link to="/login">로그인</Link>
                        </li>
                        &nbsp;&nbsp; | &nbsp;&nbsp;
                        <li>
                            <Link to="/register">회원가입</Link>
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
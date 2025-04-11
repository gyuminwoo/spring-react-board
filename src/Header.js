import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from './store/authStore';
import './css/header.css';

const Header = () => {
    const { isLoggedIn, logout } = useAuthStore();

    return (
        <header className="header-container">
            <nav className="nav">
                {
//                  ログイン状態に応じてユーザーに表示されるボタン
                    isLoggedIn ? (
                        <button onClick={logout} className="nav-btn">로그아웃</button>

                    ) : (
                        <>
                            <Link to="/login" className="nav-btn">로그인</Link>
                            <Link to="/signup" className="nav-btn">회원가입</Link>
                        </>
                    )
                }
            </nav>
        </header>
    );
};

export default Header;
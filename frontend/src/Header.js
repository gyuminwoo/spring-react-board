import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import './css/header.css';

const Header = () => {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const isLoggedIn = !!token;

    return (
        <header className="header-container">
            <nav className="nav">
                {
                    // ログインの場合
                    isLoggedIn ? (
                        <button onClick={logout} className="nav-btn">로그아웃</button>
                    ) : (
                        // 未ログインの場合
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

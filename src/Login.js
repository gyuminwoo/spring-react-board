import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import './css/login.css';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth); // 認証状態を更新する関数を取得

//  入力フォーム変更時の処理
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
            const { token, user } = res.data;

            setAuth({ token, user }); // Zustandでグローバル状態に保存
            navigate('/');
        } catch(err) {
            console.error(err);
            setError(err.response?.data || "로그인 실패");
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="아이디" value={formData.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
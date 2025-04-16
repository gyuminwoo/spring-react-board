import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '', name: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

//  バリデーションエラ表示のため
    const FIELD_ORDER = ['username', 'password', 'name'];

//  入力フォームの変更処理
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

//  フォーム送信処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, formData);
            alert("회원가입 성공!");
            navigate("/");
        } catch (err) {
            console.error(err);
//          バックエンドからのレスポンスを状態に入れる
            setError(err.response?.data || "회원가입 실패");
        }
    };

    return (
        <div className="signup-container">
            <h2>회원가입</h2>

            {error && (
                typeof error === 'string' ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <ul className="error-message">
                        {FIELD_ORDER.map((field) =>
                            error[field] ? <li key={field}>{error[field]}</li> : null
                        )}
                    </ul>
                )
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="아이디"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={formData.name}
                    onChange={handleChange}
                />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;

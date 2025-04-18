import "./css/create.css";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

// 投稿作成ページコンポーネント
let CreatePost = ()=>{

//  タイトルと内容を保持する状態
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);

//  入力欄の変更を検知し、状態を更新する関数
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

//  投稿ボタンを押した時にバックエンドにPOSTリクエストを送信する
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/posts`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('게시글 작성 실패');
        }
    };

    return (
        <div className={"create-post-container"}>
            <h1 className={"create-post-title"}>게시글 작성</h1>
            {error && <p className="error-message">{error}</p>}
            {/* 投稿フォーム */}
            <form className={"create-post-form"} onSubmit={handleSubmit}>
              　{/* タイトル入力欄 */}
                <div className={"form-group"}>
                    <label htmlFor={"title"}>제목</label>
                    <input id={"title"} type={"text"} name={"title"} onChange={handleChange} placeholder={"제목을 입력하세요."}/>
                </div>
                {/* コンテンツ入力欄 */}
                <div className={"form-group"}>
                    <label htmlFor={"content"}>내용</label>
                    <textarea id={"content"} name={"content"} onChange={handleChange} placeholder={"내용을 입력하세요."}/>
                </div>
                {/* 登録ボタン */}
                <button type={"submit"} className={"submit-button"}>등록</button>
            </form>
        </div>
    );
};

export default CreatePost;
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./css/edit.css";
import axios from "axios";
import useAuthStore from "./store/useAuthStore";

//　投稿編集ページコンポーネント
let PostEdit = ()=>{
    const {id} = useParams();　//　URLパラメータ取得
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);

//  入力値の状態管理
    let [post, setPost] = useState({
        title: "",
        content: ""
    })

//　初期データ設定（ダミー）
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                setPost({
                    title: res.data.title,
                    content: res.data.content
                });
            }).catch(err => {
                console.error(err);
                alert("게시글 불러오는데 실패하였습니다.");
            })
    }, [id]);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setPost({
            ...post,
            [name]: value
        })
    }

//  フォーム送信時の処理
    const handleSubmit = (e)=>{
        e.preventDefault(); // ページリロードを防止（SPAのため）

        axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, post, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                alert("게시글이 수정되었습니다.");
                navigate(`/post/${id}`);　//　編集後、詳細ページへ移動
            }).catch(err => {
                console.error(err);
                alert("게시글 수정에 실패하였습니다.");
            });
    }

    return (
        <div className={"post-edit-container"}>
            <h1 className={"post-edit-title"}>게시글 수정</h1>
            {/* 編集フォーム */}
            <form onSubmit={handleSubmit} className={"post-edit-form"}>
                {/* タイトル入力欄 */}
                <div className={"form-group"}>
                    <label htmlFor={"title"}>제목</label>
                    <input id={"title"} type={"text"} value={post.title} name={"title"} onChange={handleOnChange} placeholder={"제목을 입력하세요."}/>
                </div>

                {/* コンテンツ入力欄 */}
                <div className={"form-group"}>
                    <label htmlFor={"content"}>내용</label>
                    <textarea id={"content"} value={post.content} name={"content"} onChange={handleOnChange} placeholder={"내용을 입력하세요."}/>
                </div>

                {/* アクションボタン */}
                <div className={"button-group"}>
                    <button type={"submit"} className={"submit-button"}>수정 완료</button>
                    <Link to={`/post/${id}`} className={"cancel-button"}>취소</Link>
                </div>
            </form>
        </div>
    );
}

export default PostEdit;
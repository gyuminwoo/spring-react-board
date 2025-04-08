import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./css/edit.css";

//　投稿編集ページコンポーネント
let PostEdit = ()=>{
    const {id} = useParams();　//　URLパラメータ取得
    const navigate = useNavigate();

//  入力値の状態管理
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");

//　初期データ設定（ダミー）
    useEffect(()=>{
        setTitle(`${id} 번째 게시글 제목`);
        setContent(`${id} 번째 게시글 상세 내용입니다.`);
    }, [id]);

//  フォーム送信時の処理
    const handleSubmit = (e)=>{
        e.preventDefault(); // ページリロードを防止（SPAのため）
        alert("게시글이 수정되었습니다.");
        navigate(`/post/${id}`);　//　編集後、詳細ページへ移動
    }

    return (
        <div className={"post-edit-container"}>
            <h1 className={"post-edit-title"}>게시글 수정</h1>
            {/* 編集フォーム */}
            <form onSubmit={handleSubmit} className={"post-edit-form"}>
                {/* タイトル入力欄 */}
                <div className={"form-group"}>
                    <label htmlFor={"title"}>제목</label>
                    <input id={"title"} type={"text"} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"제목을 입력하세요."}/>
                </div>

                {/* コンテンツ入力欄 */}
                <div className={"form-group"}>
                    <label htmlFor={"content"}>내용</label>
                    <textarea id={"content"} value={content} onChange={(e) => setContent(e.target.value)} placeholder={"내용을 입력하세요."}/>
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
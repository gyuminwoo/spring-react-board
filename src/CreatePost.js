import "./css/create.css";

// 投稿作成ページコンポーネント
let CreatePost = ()=>{
    return (
        <div className={"create-post-container"}>
            <h1 className={"create-post-title"}>게시글 작성</h1>
//          投稿フォーム
            <form className={"create-post-form"}>
//            　タイトル入力欄
                <div className={"form-group"}>
                    <label htmlFor={"title"}>제목</label>
                    <input id={"title"} type={"text"} placeholder={"제목을 입력하세요."}/>
                </div>
//              コンテンツ入力欄
                <div className={"form-group"}>
                    <label htmlFor={"content"}>내용</label>
                    <textarea id={"content"} placeholder={"내용을 입력하세요."}/>
                </div>
//              登録ボタン
                <button type={"submit"} className={"submit-button"}>등록</button>
            </form>
        </div>
    );
}

export default CreatePost;
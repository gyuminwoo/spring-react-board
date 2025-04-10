import {useState, useEffect, useCallback} from "react";
import {Link, useParams} from "react-router-dom";
import "./css/detail.css";
import axios from "axios";

//　投稿詳細ページコンポーネント
let PostDetail = () => {
    const {id} = useParams();　//　URLパラメータ取得

    let [post, setPost] = useState({
        title: "",
        content: ""
    });

//  投稿詳細データ取得（依存配列にidが含まれているため、id変更時にも再実行される
    const getPost = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                setPost(res.data);
            }).catch(err => {
                console.error(err);
            });
    }, [id]);

//　初回マウント時およびidが変わった時に投稿詳細を取得
    useEffect(() => {
        getPost();
    }, [getPost]);

//  削除ボタンを押下時の処理
    const handleDelete = () => {
        alert("게시글이 삭제되었습니다.");
    }

    return(
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            {/* 編集・削除ボタン */}
            <div className={"button-group"}>
                <Link to={`/post/edit/${id}`} className={"edit-button"}>
                    수정하기
                </Link>
                <button onClick={handleDelete} className={"delete-button"}>
                    삭제하기
                </button>
            </div>

            {/* 一覧ページに戻るリンク */}
            <Link to={"/"} className={"back-link"}>
                목록으로 돌아가기
            </Link>
        </div>
    );
}

export default PostDetail;
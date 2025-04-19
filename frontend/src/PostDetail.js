import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./css/detail.css";
import axios from "axios";
import useAuthStore from "./store/useAuthStore";

//　投稿詳細ページコンポーネント
let PostDetail = () => {
    const { id } = useParams();　//　URLパラメータ取得
    let navigate = useNavigate();

    let [post, setPost] = useState({
        title: "",
        content: "",
        authorName: "",
        userId: null
    });

    const token = useAuthStore((state) => state.token);
    const userId = useAuthStore((state) => state.user?.id);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");

//  投稿詳細データ取得（依存配列にidが含まれているため、id変更時にも再実行される
    const getPost = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                setPost(res.data);
            }).catch(err => {
                console.error(err);
            });
    }, [id]);

    const getComments = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`)
            .then(res => {
                setComments(res.data);
            }).catch(err => {
                console.error(err);
            });
    }, [id]);

//　初回マウント時およびidが変わった時に投稿詳細を取得
    useEffect(() => {
        getPost();
        getComments();
    }, [getPost, getComments]);

//  削除ボタンを押下時の処理
    const handleDelete = () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            alert("삭제가 완료되었습니다.");
            navigate("/");
        }).catch(err => {
            console.error(err);
            alert("삭제 중 오류가 발생했습니다.");
        });
    }

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;

        axios.post(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`,
            { content: newComment },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(() => {
            setNewComment("");
            getComments();
        }).catch(err => {
            console.error(err);
            alert("댓글 등록 중 오류 발생");
        });
    }

    const handleCommentDelete = (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            getComments();
        }).catch(err => {
            console.error(err);
            alert("댓글 삭제 중 오류 발생");
        });
    }

    const handleCommentEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    }

    const handleCommentUpdate = (commentId) => {
        axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}/comments/${commentId}`,
            { content: editingContent },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(() => {
            setEditingCommentId(null);
            setEditingContent("");
            getComments();
        }).catch(err => {
            console.error(err);
            alert("댓글 수정 중 오류 발생");
        });
    }

    return (
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            <p className={"post-detail-meta"}>작성자: {post.authorName}</p>

            {
                token && Number(userId) === Number(post.userId) && (
                    // 編集・削除ボタン
                    <div className={"button-group"}>
                        <Link to={`/post/edit/${id}`} className={"edit-button"}>
                            수정하기
                        </Link>
                        <button onClick={handleDelete} className={"delete-button"}>
                            삭제하기
                        </button>
                    </div>
                )
            }

            <div className={"comment-section"}>
                <h3>댓글</h3>

                <div className={"comment-list"}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={"comment-item"}>
                            {editingCommentId === comment.id ? (
                                <>
                                    <textarea
                                        className="comment-edit-textarea"
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                    />
                                    <button onClick={() => handleCommentUpdate(comment.id)}>저장</button>
                                    <button onClick={() => setEditingCommentId(null)}>취소</button>
                                </>
                            ) : (
                                <>
                                    <p className={"comment-content"}>{comment.content}</p>
                                    <p className={"comment-meta"}>작성자: {comment.authorName} | 작성일: {new Date(comment.createdAt).toLocaleString()}</p>
                                    {
                                        token && Number(userId) === Number(comment.userId) && (
                                            <>
                                                <button className={"comment-edit-button"} onClick={() => handleCommentEdit(comment)}>수정</button>
                                                <button className={"comment-delete-button"} onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                                            </>
                                        )
                                    }
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {
                    token && (
                        <div className={"comment-form"}>
                            <textarea
                                placeholder="댓글을 입력하세요"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={handleCommentSubmit}>댓글 작성</button>
                        </div>
                    )
                }
            </div>

            {/* 一覧ページに戻るリンク */}
            <Link to={"/"} className={"back-link"}>
                목록으로 돌아가기
            </Link>
        </div>
    );
}

export default PostDetail;

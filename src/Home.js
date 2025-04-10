import {useCallback, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./css/list.css";
import axios from "axios";

// 投稿一覧ページコンポーネント
let Home = () => {

    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

//  現在のページに基づいて投稿リストを取得するAPIコール
    const getPostList = useCallback(() =>{
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            params:{
                page: currentPage - 1,
                size: postsPerPage
            }
        }).then(res => {
            console.log(res.data.content);
            setPosts(res.data.content);
            setTotalPages(res.data.totalPages);
        }).catch(err => {
            console.error("게시글 가져오기 실패");
        })
    }, [currentPage, postsPerPage]);

//　currentPageが変更された時、投稿リストを再取得
    useEffect(() => {
        getPostList();
    }, [getPostList]);

    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);

//　ページ変更時の処理
    const handlePageChange = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

//　投稿一覧表示
    return(
        <div className={"home-container"}>
            <h1 className={"home-title"}>게시글 목록</h1>
            <div className={"posts-list"}>
                {
                    posts.map(post =>(
                        <div key={post.id} className={"post-card"}>
                            <h2 className={"post-title"}>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className={"post-content"}>
                                {post.content}
                            </p>
                        </div>
                    ))
                }
            </div>

    　　　　 {/* ページネーション */}
            <div className={"pagination"}>
                {
                    pageNumbers.map(number=>(
                        <button key={number} className={`page-btn ${number === currentPage ? 'active' : ''}`}
                        onClick={() =>{
                            handlePageChange(number);
                        }}>
                            {number}
                        </button>
                    ))
                }
            </div>

            {/* 投稿作成ページへのリンク */}
            <Link to={"/create"} className={"create-link"}>게시글 작성</Link>
        </div>
    );
}

export default Home;
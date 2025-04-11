import './App.css';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetail";
import PostEdit from "./PostEdit";
import Header from "./Header";

// React Routerによるルーティング設定

// / - 投稿リストページ
// /create - 投稿作成ページ
// /post/:id - 投稿詳細ページ
// /post/edit/:id - 投稿修正ページ

function App() {
  return (
    <Router>
        <div className="App">
            <Header />
            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/create"} element={<CreatePost/>} />
                <Route path={"/post/:id"} element={<PostDetail/>} />
                <Route path={"/post/edit/:id"} element={<PostEdit/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
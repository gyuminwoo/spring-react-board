import './App.css';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetail";
import PostEdit from "./PostEdit";

function App() {
  return (
    <Router>
        <div className="App">
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

// / - 投稿リスト
// /create - 投稿作成
// /edit/:id - 投稿修正　(idは投稿の番号）
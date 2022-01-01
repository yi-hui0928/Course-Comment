import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "./pages/Courses";
import Comments from "./pages/Comments";
import CreateComment from "./pages/CreateComment";
import Layout from "./components/Layout";
import CreateMessage from "./pages/CreateMessage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoFoundPage from "./pages/NoFoundPage";
import Member from "./pages/members/Member";
import CourseLike from "./pages/members/CourseLike";
import UserPost from "./pages/members/UserPost";
import Messages from "./pages/Messages";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Courses />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          {/* TODO: 會員要新增一些功能 */}
          <Route exact path="/member">
            <Member />
          </Route>
          <Route exact path="/Comments/:id">
            <Comments />
          </Route>
          <Route exact path="/CreateComment/:id">
            <CreateComment />
          </Route>
          <Route path="/Messages/:id">
            <Messages />
          </Route>
          <Route exact path="/CreateMessage">
            <CreateMessage />
          </Route>
          <Route exact path="/CourseLike">
            <CourseLike />
          </Route>
          <Route exact path="/userpost">
            <UserPost />
          </Route>
          <Route path="/*">
            <NoFoundPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

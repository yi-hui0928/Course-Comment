import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Courses from "./pages/Courses";
import Comments from "./pages/Comments";
import CreateComment from "./pages/CreateComment";
import Layout from "./components/Layout";
import CreateMessage from "./pages/CreateMessage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Member from "./pages/Member";
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
          <Route exact path="/member">
            <Member />
          </Route>
          <Route path="/Comments/:id">
            <Comments />
          </Route>
          <Route path="/CreateComment">
            <CreateComment />
          </Route>
          <Route path="/CreateMessage">
            <CreateMessage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

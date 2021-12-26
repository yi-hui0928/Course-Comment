import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Courses from './pages/Courses'
import Comments from './pages/Comments'
import CreateComment from './pages/CreateComment';
import Layout from './components/Layout';
import CreateMessage from './pages/CreateMessage';


function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Courses />
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

import './App.css';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { history } from './redux/store';

import { ConnectedRouter as Router } from 'connected-react-router';

import routes from './routes';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Router history={history}>
      <Header count="2"/>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch> 
      <Footer />
      </Router>
    </div>
  );
}

export default App;


function RouteWithSubRoutes(route) {
  return (
    <Route
      exact
      path={route.path}
      render={props => (
        <route.component exact {...props} routes={route.routes} />
      )}
    />
  );
}
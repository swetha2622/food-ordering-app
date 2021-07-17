import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import routes from './routes';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Router>
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
  console.log(route);
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
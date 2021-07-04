
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Calendar from './components/Calendar/Calendar';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Orders from './containers/Orders/Orders';
import Profile from './containers/Profile/Profile';
import Register from './containers/Register/Register';


function App() {
  return (
    <div className="App">
    <BrowserRouter>

    <Switch>

      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/orders" exact component={Orders}/>
      <Route path="/calendar" exact component={Calendar}/>

    </Switch>

    </BrowserRouter>

    </div>
  );
}

export default App;

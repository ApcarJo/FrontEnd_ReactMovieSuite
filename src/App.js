
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import Register from './containers/Register/Register';

function App() {
  return (
    <div className="App">
    <BrowserRouter>

    <Switch>

      <Route path="/" exact component={Home}/>
      <Route path="/Login" exact component={Login}/>
      <Route path="/Profile" exact component={Profile}/>
      <Route path="/Register" exact component={Register}/>

    </Switch>

    </BrowserRouter>

    </div>
  );
}

export default App;


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';
import Customers from './containers/Customers/Customers';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Orders from './containers/Orders/Orders';
import Profile from './containers/Profile/Profile';
import Register from './containers/Register/Register';


function App() {
  return (
    <div className="App">
    <BrowserRouter>

    <Header/>
    
    <Switch>

      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/orders" exact component={Orders}/>
      <Route path="/calendar" exact component={Calendar}/>
      <Route path="/header" exact component={Header}/>
      <Route path="/customers" exact component={Customers}/>
    

    </Switch>

    </BrowserRouter>

    </div>
  );
}

export default App;

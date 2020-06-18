import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import BseNse from './components/BseNse/BseNse'
import OrderBook from './components/Orderbook/OrderBook'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {
  return (
    <div>
    <div className="App">
      <Router>
         <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path='/stocks' component={BseNse}/>
        </Switch>
        </Router>
    </div>
     </div>  
  );
}

export default App;

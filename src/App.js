import React, { Component } from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import "./index.css";

import Home from './pages/home';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
  
         <Route exact path ="/" component = {Home} />
              
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

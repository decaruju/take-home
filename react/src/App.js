import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css';
import Navbar from './Navbar.js'
import GridList from './GridList.js'
import Heropage from './Heropage.js'
import Avengers from './Avengers.js'


const Superhero = ({ match }) => (
  <div>
    <Route path={`${match.path}/:heroId`} component={Heropage}/>
    <Route exact path={match.path} render={() => (
      <Redirect to="/"></Redirect>
    )}/>
  </div>
)

const App = () => (
  <Router>
    <div className="App">
      <Navbar> </Navbar>
      <Route exact path="/" component={GridList}/>
      <Route path="/superhero" component={Superhero}/>
      <Route path="/avengers" component={Avengers}/>
      <footer>
        Data provided by Marvel. © 2014 Marvel
      </footer>
    </div>
  </Router>
)

export default App
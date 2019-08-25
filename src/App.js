import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; 
import Home from './components/home';
import About from './components/about';
import BeersList from './components/beersList';
import AppBar from './components/appBar';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        beers: [],
      }
  }

  getBeers(page, size) {
    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${size}`)
    .then(response => response.json())
    .then(data => {
      
      this.setState({
        beers: data,
      })
      console.log(this.state.beers);
    })
  }

  componentDidMount() {
    this.getBeers(1,80 );
  }

  render() {
       
    return(
        <Router>
          <div className="App">
            <AppBar/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/beers' render={(props) => (<BeersList {...props} beers={this.state.beers}/>)}/>
            </Switch>
          </div>
        </Router>
      )
  }
}

export default App;

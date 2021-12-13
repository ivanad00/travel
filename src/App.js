import React, { Component } from 'react';
import SearchForm from './components/SearchForm';

import './styles/style.css'

class App extends Component {

  render() {
    return (
        <div className="container">
            <div className="title">Trips app</div>
            <SearchForm />
        </div>
    );
  }
}

export default App;

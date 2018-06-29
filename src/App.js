import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import dyanc from './dyanc'

const chokidar = window.require('chokidar')
const fs = window.require('fs')

const Md = dyanc(() => import('./Md'))
const Home = dyanc(() => import('./Home'))

class App extends Component {
  constructor(props){
    super(props);
    const content = fs.readFileSync('/Users/xiaohesong/workspace/my-files/xx.md', 'utf-8')
    console.log("content uis", content);
  }

  componentDidMount() {

    const watcher = chokidar.watch('/Users/xiaohesong/workspace/my-files', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('all', (event, path) => {
      console.log(`File ${path}, event is ${event}`);
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Link to='/home'>Home页面</Link>
          <Link to='/md'>Markdown</Link>
          <Route component={Home} path='/home' />
          <Route component={Md} path='/md'/>
        </div>
      </Router>
    );
  }
}

export default App;

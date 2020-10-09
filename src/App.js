import React from 'react';
import logo from './public/images/logo.jpg'
import './App.css';
import Topbar from './component/Topbar';
import Arranger from './component/Arranger';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* TODO replace below w/ our own logo */}
        {/* TODO move all header stuff into own header component */}
        <img src={logo} className="App-logo" alt="logo" />
        <code>your advocacy assistant</code>
      </header>
      <Topbar/>
      <Arranger/>
    </div>
  );
}

// TODO Pull all styles out of each component and into a local style file

export default App;

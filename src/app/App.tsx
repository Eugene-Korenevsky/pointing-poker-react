import React from 'react';
import { HashRouter } from 'react-router-dom';
import './fonts.css';
import './App.css';
import Footer from '../components/footer';
import Header from '../components/header';
import Routing from '../routing/Routing';

function App(): JSX.Element {
  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <main className="app-main">
        <HashRouter>
          <Routing />
        </HashRouter>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

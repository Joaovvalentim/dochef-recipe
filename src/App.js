

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore'; 
import Category from './components/Category';
import Search from './components/Search';
import Pages from './pages/Pages';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Provider store={store}>

        <BrowserRouter>
          <Category />
          <Search />
          <Pages />
          <Footer />
        </BrowserRouter>
      </Provider>
    </div >
  );
}

export default App;

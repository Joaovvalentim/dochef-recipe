import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from 'react-router-dom'
import Search from "./components/Search";
import Footer from "./components/Footer";
import './App.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Category />
        <Search />
        <Pages />
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;

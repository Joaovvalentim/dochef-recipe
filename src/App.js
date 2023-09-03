import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from 'react-router-dom'
import Search from "./components/Search";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="nav">
        <GiKnifeFork/>
        <Link to={'/'} className="logo">Receitas Do Chef</Link>
      </div>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>

    </div>
  );
}

export default App;

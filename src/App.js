import logo from './logo.svg';
import './App.css';
import StocksPage from './components/StocksPage';
import QuotesPage from './components/QuotesPage';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Search from './components/Searchpage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <StocksPage/>
          </Route>

          <Route path="/instrumenment-:sym">
            <QuotesPage/>
          </Route>
          <Route path="/search-:searchVal">
            <Search/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

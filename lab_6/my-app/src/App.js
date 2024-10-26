import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Catalog from './pages/Catalog/Catalog';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}/>
          <Route path='/catalog'exact Component={Catalog}/>
          <Route path='/cart'/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

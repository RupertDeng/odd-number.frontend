import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Terms} from './pages/Terms';
import {Privacy} from './pages/Privacy';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import smoothscroll from 'smoothscroll-polyfill';


function App() {

  smoothscroll.polyfill();
  
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/terms-of-service' component={Terms} />
          <Route path='/privacy-policy' component={Privacy} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;

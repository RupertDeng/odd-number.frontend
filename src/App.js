import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Home} from './pages/Home';
import {Terms} from './pages/Terms';
import {Privacy} from './pages/Privacy';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import smoothscroll from 'smoothscroll-polyfill';
import axios from 'axios';
import {useEffect} from 'react';


function App() {
  // console.log('app rendered');
  
  smoothscroll.polyfill();

  useEffect(()=>{
    const startupCall = async () => {
      try {
        await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}`,
        });
      } catch(err) {
        console.log(err)
      }
    };
    startupCall();
  }, [])

  // function to get browser cookie
  const getCookie = (key) => {
    const cookieKey = key + '=';
    const cookieArray = decodeURIComponent(document.cookie).split('; ');
    let value = '';
    cookieArray.forEach(pair => {
      if (pair.indexOf(cookieKey) === 0) value = pair.substring(cookieKey.length);
    })
    return value;
  };

  // function to set browser cookie
  const setCookie = (key, value) => {
    let date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 3600 * 1000);
    const expiration = 'expires=' + date.toUTCString();
    document.cookie = `${key}=${value};${expiration};path=/`;
  };

  // update visitorId cookie if not exist
  const updateVid = (newVid) => {
    const visitorId = getCookie('visitorId');
    if (!visitorId) {
      setCookie('visitorId', newVid);
      return true;
    } else {
      return false;
    }
  }

  // generate vistorId hash for verifying message owner
  const getVidHash = async () => {
    const visitorId = getCookie('visitorId');
    if (!visitorId) {return 0;}
    const data = new TextEncoder('utf-8').encode(visitorId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  // function to sanitize the input to standard phone number
  const validateNumber = (num) => {
    let filtered = num.replace(/\D/g, '');
    if (filtered.length > 11 || filtered.length < 10 || (filtered.length === 11 && filtered[0] !== '1')) {
      return 'invalid';
    } else {
      if (filtered.length === 11) {
        filtered = filtered.slice(1);
      }
      return `(${filtered.slice(0, 3)})${filtered.slice(3, 6)}-${filtered.slice(6, 10)}`;
    }
  };


  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/terms-of-service'><Terms /></Route>
          <Route path='/privacy-policy'><Privacy /></Route>
          <Route path='/search' render={()=>(
            <Home getCookie={getCookie} setCookie={setCookie} getVidHash={getVidHash} updateVid={updateVid} validateNumber={validateNumber} />
          )} />
          <Route path='/' exact render={()=>(
            <Home getCookie={getCookie} setCookie={setCookie} getVidHash={getVidHash} updateVid={updateVid} validateNumber={validateNumber} />
          )} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;


/*

Component hierarchy:
<App />: 
  <Home />: '/' and '/search/:searchedNum'
    <ResultView /> useEffect to query data based on dependencies of searchedNum and props passed from <Home>

As of react-router-dom 5.3, the two types of Route below have different rendering strategy:

When visiting url: /search/000
1) <Route path='/search' component={Home} /> or <Route path='/search' render={()=>{(<Home />)}}
-- Home is re-rendered, and ResultView is also re-rendered, data is re-fetched by useEffect.

2) <Route> <Home /> </Route>
-- Home is not re-rendered, but ResultView is re-rendered. If searchedNum is not changed, data will not be re-fetched.


*/

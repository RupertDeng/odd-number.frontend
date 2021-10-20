import {useState, useCallback} from 'react';
import axios from 'axios';
import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import {Popup} from '../components/Popup';
import {ResultSummary} from '../components/ResultSummary';
import { MessagePoster} from '../components/MessagePoster';
import './Home.css'

export const Home = () => {

  // critical states: number being searched, and the searchResult returned from backend
  const [searchedNum, setSearchedNum] = useState('');
  const [searchResult, setSearchResult] = useState(undefined);

  // --------------------------------------------------------------------------------------------------------
  // functions to sanitize search input and update state
  const validateNumber = useCallback((num) => {
    let filtered = num.replace(/\D/g, '');
    if (filtered.length > 11 || filtered.length < 10 || (filtered.length === 11 && filtered[0] !== '1')) {
      return '';
    } else {
      if (filtered.length === 11) {
        filtered = filtered.slice(1);
      }
      return `(${filtered.slice(0, 3)})${filtered.slice(3, 6)}-${filtered.slice(6, 10)}`;
    }
  }, []);

  const handleSearchInput = useCallback((e) => {
    setSearchedNum(validateNumber(e.target.value));
  }, []);

  const handlSearchResult = useCallback((result) => {
    setSearchResult(result);
  }, []);
  
  // --------------------------------------------------------------------------------------------------------
  // functions to deal with cookie
  const getCookie = useCallback((key) => {
    const cookieKey = key + '=';
    const cookieArray = decodeURIComponent(document.cookie).split('; ');
    let value = '';
    cookieArray.forEach(pair => {
      if (pair.indexOf(cookieKey) === 0) value = pair.substring(cookieKey.length);
    })
    return value;
  }, []);

  const setCookie = useCallback((key, value) => {
    let date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 3600 * 1000);
    const expiration = 'expires=' + date.toUTCString();
    document.cookie = `${key}=${value};${expiration};path=/`;
  }, []);

  // --------------------------------------------------------------------------------------------------------
  // function to handle various kinds of errors
  const raiseAlertPop = useCallback((err, alertType) => {
    console.log(err);
    const alertPop = document.getElementById(alertType);
    alertPop.classList.add('active');
    setTimeout(()=>alertPop.classList.remove('active'), 3000);
  }, []);

  // --------------------------------------------------------------------------------------------------------
  // function groups for http requests
  const queryNumber = useCallback((num) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}search/${num}`,
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
    });
  }, []);

  const postMessage = useCallback((num, messageTag, messageText) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}add-message/${num}`,
      data: {
        'tag': messageTag,
        'text': messageText
      },
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY, 'X-visitorId': getCookie('visitorId')},
    });
  }, []);
  


  return (
    <>
      <div id='home'>
        <Jumbo />
        <SearchBox searchedNum={searchedNum} handleSearchInput={handleSearchInput} queryNumber={queryNumber} handlSearchResult={handlSearchResult} raiseAlertPop={raiseAlertPop} />
        {searchResult && (<ResultSummary searchResult={searchResult} />)}
        {searchResult && (<MessagePoster searchResult={searchResult} setSearchResult={setSearchResult} getCookie={getCookie} setCookie={setCookie} postMessage={postMessage} raiseAlertPop={raiseAlertPop} />)}
        <Info />
      </div>
      <Popup popupId='serviceError' popupIcon='bi bi-cone-striped' popupTitle='Service Error' popupMessage='Oops, please try again later.' />    
      <Popup popupId='invalidNumber' popupIcon='bi bi-emoji-dizzy' popupTitle='Invalid Number' popupMessage='Please enter valid U.S phone number to search.' />
      <Popup popupId='messageLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only post 5 messages every 24hrs.' />
      <Popup popupId='voteLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only vote 10 times every 24hrs.' />    
      <Popup popupId='cookieDisabled' popupIcon='bi bi-palette' popupTitle='Cookie Disabled' popupMessage='Please enable cookie in order to post message.' />        
    </>
  );
};
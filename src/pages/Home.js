import {useState} from 'react';
import axios from 'axios';
import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import {Popup} from '../components/Popup';
import {ResultSummary} from '../components/ResultSummary';
import { MessagePoster} from '../components/MessagePoster';
import './Home.css'

export const Home = () => {

  const [searchResult, setSearchResult] = useState(undefined);

  // functions to deal with cookie
  const getCookie = (key) => {
    const cookieKey = key + '=';
    const cookieArray = decodeURIComponent(document.cookie).split('; ');
    let value = '';
    cookieArray.forEach(pair => {
      if (pair.indexOf(cookieKey) === 0) value = pair.substring(cookieKey);
    })
    return value;
  };

  const setCookie = (key, value) => {
    let date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 3600 * 1000);
    const expiration = 'expires=' + date.toUTCString();
    document.cookie = `${key}=${value};${expiration};path=/`;
  };

  // function to handle various kinds of error
  const raiseAlertPop = (err, alertType) => {
    console.log(err);
    const alertPop = document.getElementById(alertType);
    alertPop.classList.add('active');
    setTimeout(()=>alertPop.classList.remove('active'), 2000);
  };

  // function groups for http requests
  const queryNumber = (num) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}search/${num}`,
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
    });
  };

  const postMessage = (num, messageTag, messageText) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}add-message/${num}`,
      data: {
        'tag': messageTag,
        'text': messageText
      },
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
    });
  }
  



  return (
    <>
      <div id='home'>
        <Jumbo />
        <SearchBox queryNumber={queryNumber} setSearchResult={setSearchResult} raiseAlertPop={raiseAlertPop}/>
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
}
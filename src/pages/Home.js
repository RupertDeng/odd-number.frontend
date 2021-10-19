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

  
  // function groups for http requests
  const handleServiceError = (err) => {
    console.log(err);
    const alertPop = document.getElementById('serviceError');
    alertPop.classList.add('active');
    setTimeout(()=>alertPop.classList.remove('active'), 2000);
  };

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
        <SearchBox queryNumber={queryNumber} setSearchResult={setSearchResult} handleServiceError={handleServiceError}/>
        {searchResult && (<ResultSummary searchResult={searchResult} />)}
        {searchResult && (<MessagePoster searchResult={searchResult} setSearchResult={setSearchResult} postMessage={postMessage} handleServiceError={handleServiceError} />)}
        <Info />
      </div>
      <Popup popupId='serviceError' popupIcon='bi bi-cone-striped' popupTitle='Service Error' popupMessage='Oops, please try again later.' />    
      <Popup popupId='invalidNumber' popupIcon='bi bi-emoji-dizzy' popupTitle='Invalid Number' popupMessage='Please enter valid U.S phone number to search.' />
      <Popup popupId='messageLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only post 5 messages every 24hrs.' />
      <Popup popupId='voteLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only vote 10 times every 24hrs.' />    
    </>
  );
}
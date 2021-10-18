import {useState} from 'react';
import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import {Popup} from '../components/Popup';
import {ResultSummary} from '../components/ResultSummary';
import { MessagePoster} from '../components/MessagePoster';
import './Home.css'

export const Home = () => {

  const [searchResult, setSearchResult] = useState(undefined);
  const handleServiceError = (err) => {
    console.log(err);
    const errorPop = document.getElementById('serviceError');
    errorPop.classList.add('active');
    setTimeout(()=>errorPop.classList.remove('active'), 2000);
  };
  
  return (
    <>
      <div id='home'>
        <Jumbo />
        <SearchBox updateSearchResult={setSearchResult} handleServiceError={handleServiceError}/>
        {searchResult && (<ResultSummary searchResult={searchResult} />)}
        {searchResult && (<MessagePoster searchNumber={searchResult.number} handleServiceError={handleServiceError} />)}
        <Info />
      </div>
      <Popup popupId='serviceError' popupIcon='bi bi-cone-striped' popupTitle='Service Error' popupMessage='Oops, please try again later.' />    
      <Popup popupId='invalidNumber' popupIcon='bi bi-emoji-dizzy' popupTitle='Invalid Number' popupMessage='Please enter valid U.S phone number to search.' />
      <Popup popupId='messageLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only post 5 messages every 24hrs.' />
      <Popup popupId='voteLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only vote 10 times every 24hrs.' />    
    </>
  );
}
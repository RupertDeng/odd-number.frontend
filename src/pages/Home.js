import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import {Popup} from '../components/Popup';
import {ResultView} from '../components/ResultView';
import {useEffect} from 'react';

export const Home = ({getCookie, setCookie, getVidHash, updateVid, validateNumber}) => {
  // console.log('home rendered');

  useEffect(() => {
    const cookieState = getCookie('cookieAccepted');
    if (!cookieState) {
      document.getElementById('acceptCookie').classList.add('active');
    }
  }, [getCookie])


  // config search visual effect
  const searchVisualEffect = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    document.getElementById('jumbo').classList.add('hide');
    document.getElementById('search-panel').classList.add('narrow-panel');
  };

  // function to handle various kinds of errors
  const raiseAlertPop = (err, alertType) => {
    console.log(err);
    const alertPop = document.getElementById(alertType);
    alertPop.classList.add('active');
    setTimeout(()=>alertPop.classList.remove('active'), 3000);
  };
  
  
  // --------------------------------- http request function groups ---------------------------------------
  // function for Get requests
  const queryNumber = (num) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}search/${num}`,
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
    });
  };

  // function for Post message requests
  const postMessage = (num, messageTag, messageText) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}add-message/${num}`,
      data: {
        'tag': messageTag,
        'text': messageText
      },
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY, 'X-Visitorid': getCookie('visitorId')}
    });
  };

  // function for Delete message requests
  const deleteMessage = (num, msgId) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}delete-message/${num}/${msgId}`,
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY, 'X-Visitorid': getCookie('visitorId')}
    });
  }

  // function for vote on message requests
  const voteOnMessage = (num, msgId, voteType, incre) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}vote-message/${num}/${msgId}/${voteType}/${incre > 0 ? 'vote' : 'unvote'}`,
      headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
    });
  }


  return (
    <>
      <div style={{minHeight: 'calc(100vh - 145px)'}}>
        <Jumbo />
        <SearchBox validateNumber={validateNumber}/>
        <Switch>
          <Route path='/search/:searchedNum' exact>
            <ResultView getVidHash={getVidHash} updateVid={updateVid} validateNumber={validateNumber} searchVisualEffect={searchVisualEffect} 
            queryNumber={queryNumber} postMessage={postMessage} deleteMessage={deleteMessage} voteOnMessage={voteOnMessage} raiseAlertPop={raiseAlertPop}/>
          </Route>
          <Route path='/search/*/*'>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Info />
      </div>
      <Popup popupId='acceptCookie' popupIcon='bi bi-palette-fill' popupTitle='Have a Cookie ~' popupMessage='This website uses cookie to enhance user experience.' setCookie={setCookie} />
      <Popup popupId='serviceError' popupIcon='bi bi-cone-striped' popupTitle='Service Error' popupMessage='Oops, please try again later.' setCookie={setCookie} />    
      <Popup popupId='invalidNumber' popupIcon='bi bi-emoji-dizzy' popupTitle='Invalid Number' popupMessage='Please enter valid U.S phone number to search.' setCookie={setCookie} />
      <Popup popupId='messageLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only post 5 messages every 24hrs.' setCookie={setCookie} />
      <Popup popupId='voteLimit' popupIcon='bi bi-exclamation-triangle' popupTitle='Limit Exceeded' popupMessage='Each IP address can only vote 10 times every 24hrs.' setCookie={setCookie} />    
      <Popup popupId='cookieDisabled' popupIcon='bi bi-palette' popupTitle='Cookie Disabled' popupMessage='Please enable cookie in order to post message.' setCookie={setCookie} />        
    </>
  );
};
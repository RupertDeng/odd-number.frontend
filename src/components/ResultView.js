import {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {ResultSummary} from './ResultSummary';
import {MessagePoster} from './MessagePoster';
import {MessageView} from './MessageView';

export const ResultView = ({validateNumber, queryNumber, searchVisualEffect, generateHash, postMessage, deleteMessage, voteOnMessage, raiseAlertPop, getCookie, setCookie}) => {

  //------------------------------------- useEffect to conduct query based on the url parameter ------------------------------------
  let {searchedNum} = useParams();
  const [searchResult, setSearchResult] = useState(undefined);

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        searchVisualEffect();
        const alertPop = document.getElementById('invalidNumber');
        const validatedNum = validateNumber(searchedNum);
        if (validatedNum === 'invalid') {
          alertPop.classList.add('active');
          setSearchResult(undefined);
        } else {
          alertPop.classList.remove('active');
          const response = await queryNumber(validatedNum);
          setSearchResult(response.data);
        }
      } catch(err) {
        raiseAlertPop(err, 'serviceError');
      }
    };
    fetchSearchResult();
  }, [searchedNum, validateNumber, searchVisualEffect, queryNumber, raiseAlertPop]);

//------------------------------------- utility functions to update searchResult state ------------------------------------
  const updateMessageInState = (msg) => {
    setSearchResult({
      ...searchResult,
      messages: [...searchResult.messages, msg]
    })
  };

  const deleteMessageInState = (msgId) => {
    setSearchResult({
      ...searchResult,
      messages: searchResult.messages.filter(m => m.time_id !== msgId)
    });
  };

  const updateVotesIntoState = (msgId, voteType, incre) => {
    setSearchResult({
      ...searchResult,
      messages: searchResult.messages.map(m => {
        if (m.time_id !== msgId) {
          return m;
        } else {
          let updatedMessage = {...m};
          if (voteType === 'upvote') {updatedMessage.upvote += incre}
          else {updatedMessage.downvote += incre}
          return updatedMessage;
        }})
      });
  };



  //------------------------------------- props for child component ---------------------------------------------
  // function to get visitorId hash from cookie
  const getVidHash = async () => {
    const hash = await generateHash(getCookie('visitorId'));
    return hash;
  };

  // function to handle submitting message
  const handleMessagePost = async (number, msgTag, msgText, afterEffect) => {
    try {
      if (!navigator.cookieEnabled) {
        raiseAlertPop('Cookie is disabled', 'cookieDisabled');
      } else {
        const response = await postMessage(number, msgTag, msgText);
        if (response.status === 200) {
          afterEffect();
          const visitorId = getCookie('visitorId');
          if (!visitorId) setCookie('visitorId', response.headers['x-visitorid']);
          updateMessageInState(response.data);
        } else {
          raiseAlertPop('message limit exceeded', 'messageLimit');
        }
      }
    } catch(err) {
      raiseAlertPop(err, 'serviceError');
    }
  }
 
  // function to handle delete message
  const handleMessageDelete = async (number, messageId) => {
    try {
      const response = await deleteMessage(number, messageId);
      if (response.status === 200) deleteMessageInState(messageId);
    } catch(err) {
      raiseAlertPop(err, 'serviceError');
    }
  };

  // function to handle vote on message
  const handleMessageVote = async (number, messageId, voteType, incre) => {
    try {
      const response = await voteOnMessage(number, messageId, voteType, incre);
      if (response.status === 200) {
        updateVotesIntoState(messageId, voteType, incre);
      } else {
        raiseAlertPop('vote limit exceeded', 'voteLimit');
      }
    } catch(err) {
      raiseAlertPop(err, 'serviceError');
    }
  }
  

  if (searchedNum !== 'invalid' && validateNumber(searchedNum) === 'invalid') {
    return (<Redirect to='/search/invalid' />);
  } else {
    return (
      <>
        {searchResult && (<ResultSummary searchResult={searchResult} />)}
        {searchResult && (<MessagePoster searchedNum={searchResult.number} handleMessagePost={handleMessagePost} />)}
        {searchResult && searchResult.messages.length !== 0 && (<MessageView getVidHash={getVidHash} searchResult={searchResult} handleMessageDelete={handleMessageDelete} handleMessageVote={handleMessageVote} /> )}
      </>
    );
  }

};
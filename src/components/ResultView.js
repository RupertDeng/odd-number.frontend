import {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {ResultSummary} from './ResultSummary';
import {MessagePoster} from './MessagePoster';
import {MessageView} from './MessageView';

export const ResultView = ({getVidHash, updateVid, validateNumber, searchVisualEffect, queryNumber, postMessage, deleteMessage, voteOnMessage, raiseAlertPop}) => {
  // console.log('resultview rendered');

  //------------------------------------- conduct query to backend. set state every time Home component re-rendered ------------------------------------
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


//-------------- visitorId hash state, set state everything App component is re-rendered or new cookie created -------------------
  const [vidHash, setVidHash] = useState(0);

  useEffect(() => {
    getVidHash().then((hash) => setVidHash(hash));
  }, [getVidHash])


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
  // function to handle submitting message
  const handleMessagePost = async (number, msgTag, msgText, afterEffect) => {
    try {
      if (!navigator.cookieEnabled) {
        raiseAlertPop('Cookie is disabled', 'cookieDisabled');
      } else {
        const response = await postMessage(number, msgTag, msgText);
        if (response.status === 200) {
          afterEffect();
          if (updateVid(response.headers['x-visitorid'])) getVidHash().then((hash) => setVidHash(hash));
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
        {searchResult && searchResult.messages.length !== 0 && (<MessageView vidHash={vidHash} searchResult={searchResult} handleMessageDelete={handleMessageDelete} handleMessageVote={handleMessageVote} /> )}
      </>
    );
  }

};
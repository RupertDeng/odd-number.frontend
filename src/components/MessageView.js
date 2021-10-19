import {useState} from 'react';
import { MessageCard } from "./MessageCard";

export const MessageView = ({searchResult, setSearchResult}) => {
  const [currPage, setCurrPage] = useState(1);
  const messageList = searchResult.messages;

  const deleteMessageInState = (msgId) => {
    setSearchResult({
      ...searchResult,
      messages: searchResult.messages.filter(m => m.time_id !== msgId)
    });
  }

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
  }

  const generateMessageCards = () => {

  }



  return (
    <>
    </>
  );
}; 
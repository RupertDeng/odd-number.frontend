import {useState} from 'react';
import { MessageCard } from "./MessageCard";

export const MessageView = ({searchResult, setSearchResult, getCookie}) => {
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
    <div className='container'>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}; 
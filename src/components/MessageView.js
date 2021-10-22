import {useState, useEffect} from 'react';
import {MessageCard} from './MessageCard';

export const MessageView = ({vidHash, searchResult, handleMessageDelete, handleMessageVote}) => {

  // console.log('messageview rendered');
 
  const [currPage, setCurrPage] = useState(1)  // current page state 
  const number = searchResult.number;
  const messages = searchResult.messages;
  const totalMsg = messages.length;
  const msgPerPage = 20;


  // when user conducts a new search, reset current page to 1. CurrPage will not change when post/delete message or vote message.
  useEffect(() => {
    setCurrPage(1);
  }, [searchResult.number, searchResult.searched])

  const generateMessageCards = () => {
    const messageCards = []
    const startMsg = totalMsg - 1 - msgPerPage * (currPage - 1);
    const endMsg = Math.max(startMsg - 19, 0);
    for (let i = startMsg; i >= endMsg; i--) {
      const message = messages[i];
      messageCards.push((
        <MessageCard key={`msg-${i}`} number={number} vidHash={vidHash} message={message} handleMessageDelete={handleMessageDelete} handleMessageVote={handleMessageVote} />
      ))
    }
    return messageCards;
  }

  const generatePagination = () => {
    if (totalMsg <= msgPerPage) {
      return false;
    } else {
      const pages = Math.ceil(totalMsg / msgPerPage);
      const pagination = [];
      for (let i = 1; i <= pages; i++) {
        pagination.push((<li key={`page-${i}`} className='page-item'><span className={i === currPage ? 'page-link bg-info text-white' : 'page-link'} onClick={()=>setCurrPage(i)}>{i}</span></li>));
      }
      return (
        <nav className='container pt-3'>
          <ul className='pagination justify-content-center'>
            <li className='page-item'><span className='page-link' onClick={()=>setCurrPage(Math.max(1, currPage-1))}><i className='bi bi-chevron-left'></i></span></li>
            {pagination}
            <li className='page-item'><span className='page-link' onClick={()=>setCurrPage(Math.min(pages, currPage+1))}><i className='bi bi-chevron-right'></i></span></li>
          </ul>
        </nav>
      );
    }
  }



  return (
    <>
      <div className='container pt-4 pb-2' style={{maxWidth: '900px'}}>
        {generateMessageCards()}
      </div>
      {generatePagination()}
    </>
  );
}; 
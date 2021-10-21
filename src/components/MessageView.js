import {useState, useEffect} from 'react';
import { MessageCard } from './MessageCard';

export const MessageView = ({vidHash, searchResult, handleMessageDelete, handleMessageVote}) => {

  // console.log('messageview rendered');
 
  const [currPage, setCurrPage] = useState(1)  // current page state 
  const msgPerPage = 20;

  console.log(vidHash);

  useEffect(() => {
    setCurrPage(1);
  }, [searchResult.number, searchResult.searched])

  const generateMessageCards = (pageNum) => {

  }

  const generatePagination = () => {
    const total = searchResult.messages.length;
    if (total <= msgPerPage) {
      return false;
    } else {
      const pages = Math.ceil(total / msgPerPage);
      const pagination = [];
      for (let i = 1; i <= pages; i++) {
        pagination.push((<li key={`page-${i}`} className='page-item'><button className='page-link' onClick={()=>setCurrPage(i)}>{i}</button></li>));
      }

      return (
        <nav>
          <ul className='pagination justify-content-center'>
            <li className='page-item'><button className='page-link' onClick={()=>setCurrPage(Math.max(1, currPage-1))}><i className='bi bi-chevron-left'></i></button></li>
            {pagination}
            <li className='page-item'><button className='page-link' onClick={()=>setCurrPage(Math.min(pages, currPage+1))}><i className='bi bi-chevron-right'></i></button></li>
          </ul>
        </nav>
      );
    }
  }



  return (
    <div className='container'>
      {generatePagination()}
    </div>
  );
}; 
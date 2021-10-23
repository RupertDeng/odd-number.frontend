import './MessageCard.css';

export const MessageCard = ({cardId, number, vidHash, message, handleMessageDelete, handleMessageVote}) => {
  const {time_id: msgId, pID: posterId, tag: msgTag, text: msgText, upvote, downvote} = message;

  let [postDate, postTime] = msgId.split('~');
  postDate = postDate.replaceAll('-', '/');
  postTime = postTime.slice(0, 5);

  let tag, color;
  switch (msgTag) {
    case 'scam':
      tag = 'scam or spoofing';
      color = 'rgba(255, 0, 0, 0.55)';
      break;
    case 'suspicious':
      tag = 'suspicious or one-ring';
      color = 'rgba(255, 255, 0, 0.77)';
      break;
    case 'marketing':
      tag = 'marketing call or robo-call';
      color = 'rgba(0, 0, 0, 0.5)';
      break;
    case 'normal':
      tag = 'normal business related';
      color = 'rgba(0, 255, 0, 0.6)';
      break;
    case 'others':
      tag = 'other types';
      color = 'rgba(255, 255, 255, 0.4)';
      break;
    default:
      tag = 'normal business related'
      color = 'rgba(0,0,0,0.4)';
  }

  const handleDeleteBtnClick = () => {
    document.getElementById(cardId).classList.add('deleted');
    setTimeout(()=>handleMessageDelete(number, msgId), 400);
  }

  return (
    <div id={cardId} className='msg-card w-100 mx-auto my-2' style={{maxWidth: '900px', padding: '11px', backgroundColor: color, borderRadius: '10px'}}>
      <div className='row mx-auto bg-light rounded px-3 py-1' >
        <div className='col-12 fst-italic p-1 text-center' style={{fontSize: '0.75rem'}}>
          Posted on {postDate} at Eastern Time {postTime}
        </div>
        <div className='col-12 col-md-5 col-lg-4 border-start my-2'>
          <h6 className='fw-light mb-2'>User tagged this number as</h6>
          <h5>{tag}</h5>
        </div>
        <div className='col-12 col-md-7 col-lg-8 border-start my-2'>
          <h6 className='fw-light mb-2'>User Message:</h6>
          <p style={{minHeight: '40px'}}>{msgText}</p>
        </div>
        <div className='col-10 px-0 pb-1 d-flex align-items-center'>
          <button className='btn-vote btn fs-5' onClick={()=>handleMessageVote(number, msgId, 'up', 1)}>
            <i className='bi bi-hand-thumbs-up'></i>
          </button>
          <span className='fs-6'>
            {upvote}
          </span>
          <button className='btn-vote btn fs-5' onClick={()=>handleMessageVote(number, msgId, 'down', 1)}>
            <i className='bi bi-hand-thumbs-down'></i>
          </button>
          <span className='fs-6'>
            {downvote}
          </span>
        </div>
        {vidHash === posterId && (
        <div className='col-2 px-0 pb-1 text-center'>
          <button className='btn-delete btn fs-4' onClick={handleDeleteBtnClick}>
            <i className='bi bi-box-arrow-right'></i>
          </button>
        </div>
        )}
      </div>
    </div>
  );

};
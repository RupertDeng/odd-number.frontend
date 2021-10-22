
export const MessageCard = ({number, vidHash, message, handleMessageDelete, handleMessageVote}) => {
  const {time_id: msgId, pID: posterId, tag: msgTag, text: msgText, upvote, downvote} = message;

  let [postDate, postTime] = msgId.split('~');
  postDate = postDate.replaceAll('-', '/');
  postTime = postTime.slice(0, 5);

  let tag;
  switch (msgTag) {
    case 'scam':
      tag = 'scam or spoofing';
      break;
    case 'suspicious':
      tag = 'suspicious or one-ring';
      break;
    case 'marketing':
      tag = 'marketing call or robo-call';
      break;
    case 'normal':
      tag = 'normal business related';
      break;
    case 'others':
      tag = 'others';
      break;
    default:
      tag = 'normal business related'
  }

  return (
    <div className='row mx-auto'>
      <div className='col-12 fst-italic'>
        <small> Posted on {postDate} at Eastern Time {postTime} </small>
      </div>
      <div className='col-4'>
        <span>User tagged this number as</span>
        <h4 className='fw-light'>{tag}</h4>
      </div>
      <div className='col-8'>
        <span>Message:</span>
        <p>{msgText}</p>
      </div>
      <div className='col-10'>
        <button onClick={()=>handleMessageVote(number, msgId, 'up', 1)}>
          <i className='bi bi-hand-thumbs-up'></i>
        </button>
        <span>
          {upvote}
        </span>
        <button onClick={()=>handleMessageVote(number, msgId, 'down', 1)}>
          <i className='bi bi-hand-thumbs-down'></i>
        </button>
        <span>
          {downvote}
        </span>
      </div>
      {vidHash === posterId && (
      <div className='col-2'>
        <button onClick={()=>handleMessageDelete(number, msgId)}>
          <i className='bi bi-box-arrow-right'></i>
        </button>
      </div>
      )}
    </div>
  );

};
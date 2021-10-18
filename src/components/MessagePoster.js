import axios from 'axios';

export const MessagePoster = ({searchNumber, handleServiceError}) => {

  const clearPoster = () => {
    document.querySelectorAll('input.form-check-input').forEach(e => e.checked = false);
    document.getElementById('poster-form').value = '';
  }

  const handlePosterButton = () => {
    const posterButton = document.getElementById('poster-button');
    const posterTitle = document.getElementById('poster-title');
    if (posterButton.classList.contains('collapsed')) {
      posterButton.classList.remove('btn-warning');
      posterButton.classList.add('btn-success');
      posterButton.innerText = 'Post';
      posterTitle.innerText = ' your own message';
      clearPoster();
    } else {
      posterButton.classList.remove('btn-success')
      posterButton.classList.add('btn-warning');
      posterButton.innerText = 'Cancel';
      posterTitle.innerText = ' posting message';
    }
  }

  const postMessage = async () => {
    try {
      const messageTag = document.querySelector('input.form-check-input:checked').id.split('-')[1];
      const messageText = document.getElementById('poster-form').value;
      const result = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}add-message/${searchNumber}`,
        data: {
          'tag': messageTag,
          'text': messageText
        },
        headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
      });
      console.log(result);
      document.getElementById('poster-button').click();
    } catch(err) {
      handleServiceError(err);
    }
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    postMessage();
  }

  return (
    <div className='container py-3 border-bottom'>
      <div className='text-center'>
        <button type='button' id='poster-button' className='btn btn-success rounded-pill' data-bs-toggle='collapse' data-bs-target='#poster-panel' style={{border: '2px solid rgba(255, 255, 255, 0.8)'}} onClick={handlePosterButton}>Post</button>
        <span id='poster-title' className='text-light'> your own message</span>
      </div>
      <form className='mx-auto mt-3 px-2' style={{maxWidth: '800px'}} onSubmit={handleMessageSubmit}>
        <div className='row rounded bg-light px-2 px-sm-3 gx-1 align-items-center justify-content-around collapse' id='poster-panel'>
          <div className='col-12 col-md-4 p-2'>
            <label className='py-2 fw-light fs-5'>Select one tag:</label>
            <div className='p-2 border bg-white rounded'>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='radio-tag' id='tag-scam' required></input>
                <label className='form-check-label' htmlFor='tag-scam'>scam/spoofing</label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='radio-tag' id='tag-suspicious'></input>
                <label className='form-check-label' htmlFor='tag-suspicious'>suspicious/one-ring</label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='radio-tag' id='tag-marketing'></input>
                <label className='form-check-label' htmlFor='tag-marketing'>marketing/robo-call</label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='radio-tag' id='tag-normal'></input>
                <label className='form-check-label' htmlFor='tag-normal'>normal business</label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='radio-tag' id='tag-others'></input>
                <label className='form-check-label' htmlFor='tag-others'>others: please specify</label>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-7 p-2'>
            <label className='py-2 fw-light fs-5'>Enter your message:</label>
            <textarea className='form-control' style={{height: '148px'}} id='poster-form' placeholder='Your message will help other people better identify this number.' required></textarea>
          </div>
          <div className='col-12 text-end px-4 pt-1 pb-3'>
            <button type='submit' className='btn btn-dark'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
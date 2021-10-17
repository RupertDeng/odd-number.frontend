
export const MessagePoster = ({searchResult, setSearchResult}) => {

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
      posterTitle.innerText = ' your own message on this number';
      clearPoster();
    } else {
      posterButton.classList.remove('btn-success')
      posterButton.classList.add('btn-warning');
      posterButton.innerText = 'Cancel';
      posterTitle.innerText = ' posting message on this number';
    }
  }

  return (
    <div className='container py-3 border-bottom'>
      <div className='row'>
        <div className='col-12 text-center p-0 m-0'>
          <button type='button' id='poster-button' className='btn btn-success rounded-pill' data-bs-toggle='collapse' data-bs-target='#poster-panel' style={{border: '2px solid rgba(255, 255, 255, 0.8)'}} onClick={handlePosterButton}>Post</button>
          <span id='poster-title' className='text-light'> your own message on this number</span>
        </div>
        <div className='col-12 collapse' id='poster-panel'>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <label>Select one tag:</label>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='radio-tag' id='tag-scam'></input>
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
            </div>
            <div className='col-12 col-md-6'>
              <label>Enter your message:</label>
              <textarea className='form-control h-75' id='poster-form' placeholder='Your message will help other people to better identify unknown phone call.'></textarea>
            </div> 
            <div className='col-12'>
              <span className='fst-italic text-danger'><small>Please select one tag and enter message before submitting. </small></span>
              <button className='btn btn-dark'>Submit</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
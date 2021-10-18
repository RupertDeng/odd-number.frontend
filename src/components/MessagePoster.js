
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
      posterTitle.innerText = ' your own message';
      clearPoster();
    } else {
      posterButton.classList.remove('btn-success')
      posterButton.classList.add('btn-warning');
      posterButton.innerText = 'Cancel';
      posterTitle.innerText = ' posting message';
    }
  }

  return (
    <div className='container py-3 border-bottom'>
      <div className='text-center'>
        <button type='button' id='poster-button' className='btn btn-success rounded-pill' data-bs-toggle='collapse' data-bs-target='#poster-panel' style={{border: '2px solid rgba(255, 255, 255, 0.8)'}} onClick={handlePosterButton}>Post</button>
        <span id='poster-title' className='text-light'> your own message</span>
      </div>
      <div className='mx-auto mt-3 px-2' style={{maxWidth: '800px'}}>
        <div className='row rounded bg-light px-2 px-sm-3 gx-1 align-items-center justify-content-around collapse' id='poster-panel'>
          <div className='col-12 col-md-4 p-2'>
            <label className='py-2 fw-light fs-5'>Select one tag:</label>
            <div className='ps-2 border bg-white rounded'>
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
          </div>
          <div className='col-12 col-md-7 p-2'>
            <label className='py-2 fw-light fs-5'>Enter your message:</label>
            <textarea className='form-control' style={{height: '106px'}} id='poster-form' placeholder='Your message will help other people better identify this number.'></textarea>
          </div>
          <div className='col-12 px-4 pt-2 pb-3'>
            <div className='row align-items-center justify-content-end'>
              <div className='col-12 col-md-9 text-end d-none'>
                <span className='fst-italic text-danger'><small>Please select one tag and enter message before submitting. </small></span>
              </div>
              <div className='col-12 col-md-2 text-end'>
                <button className='btn btn-dark'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
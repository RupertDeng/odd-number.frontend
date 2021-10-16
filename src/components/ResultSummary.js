export const ResultSummary = ({searchResult}) => {
  
  return (
    <div className='container mb-2 border-bottom' id='result-summary' style={{maxWidth: '900px', backgroundColor: '#F8EBFF'}}>
      <div className='row py-2 gy-1 align-items-center justify-content-center fw-light text-center'>
        <p className='fs-2 col-12 mb-1'>Phone Number: <span className='d-inline-block'>{searchResult.number}</span></p>
        <p className='fs-5 col-12 col-md-5 mb-1'>Searched for total {searchResult.searched} times</p>
        <p className='fs-5 col-12 col-md-5 mb-1'>{searchResult.messages.length} messages have been posted</p>
      </div>
    </div>
  );
}
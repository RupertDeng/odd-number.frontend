export const SearchBox = () => {

  return (
    <div className='container-fluid pt-5'>
      <div className='row w-75 bg-light m-auto'>
        <div className='col-auto'>
          <input type='text' className='form-control' placeholder='U.S. phone numbers'></input>
        </div>
        <div className='col-auto'>
          <button type='submit' class='btn btn-primary'>Search</button>
        </div>
      </div>
    </div>
  );

};
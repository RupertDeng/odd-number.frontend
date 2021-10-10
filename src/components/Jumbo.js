import './Jumbo.css';

export const Jumbo = () => {
  return (
    <div className='container py-sm-5 py-4' id='jumbo' style={{backgroundImage: 'url(/images/jumbo-background.png'}}>
      <div className='w-75 m-auto'>
        <p className='display-6' id='jumbo-headline'>Called by un-familiar phone numbers? Or your own number is being exploited in spoofing?</p>
        <br></br>
        <p className='h3 text-white'>You can try search here or share info to help others alike ..</p>
      </div>
    </div>
  );
}
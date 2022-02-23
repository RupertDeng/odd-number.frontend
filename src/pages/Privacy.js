export const Privacy = () => {
  return (
    <div className='container-lg mt-5' style={{minHeight: 'calc(100vh - 170px)'}}>
      <div className='w-75 mx-auto text-white'>
        <h2 className='text-center'>Your privacy is valued here!</h2>
        <br></br>
        <br></br>
        <p><i className='bi bi-layers-fill'></i> &nbsp; This is an anonymous website. Anyone can search phone numbers, post messages, and vote on other's messages without registration or sign-in.</p>
        <p><i className='bi bi-layers-fill'></i> &nbsp; When leaving messages, please do not disclose any personal information, either yours or others.</p>
        <p><i className='bi bi-layers-fill'></i> &nbsp; User who posted the message is able to delete it from the website, on the same devive used during posting.</p>
        <p><i className='bi bi-layers-fill'></i> &nbsp; User will not be able to delete other user's posted message. This is backed by encrypted cookie authentication.</p>
        <p><i className='bi bi-layers-fill'></i> &nbsp; Brower cookie is used for the sole purpose mentioned above. It will not be used to collect other user information.</p>
        <p><i className='bi bi-layers-fill'></i> &nbsp; In order to restrict abuse of the message and voting system, visitor's IP is being monitored on the website server during searching/posting/voting actions.</p>
        <p><i className='bi bi-layers-fill'></i> &nbsp; Beside browser cookie and ip-monitoring, no other data collection is undergoing in any circumstances.</p>
        <p><i className='bi bi-info-circle-fill'></i> &nbsp; If you feel anything that violates your privacy, please leave detailed message under number (000)000-0000, for administrator to address.</p>
      </div>
    </div>
  );
};
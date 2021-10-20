import React from 'react';
import './Info.css';

export const Info = React.memo(() => {
  return (
    <div className='container p-5 text-white-50 fs-6'>
      <div className='info-group mx-auto'>
        <p><i className='bi bi-people-fill'></i> - This platform is meant for anonymous crowdsourcing for the community's benefit.</p>
        <p><i className='bi bi-pencil-square'></i> - There is option to leave messages after searching a phone number.</p>
        <p><i className='bi bi-emoji-sunglasses'></i> - Visitors with good intentions are the presumption. Spamming or abusing is not welcome.</p>
        <p><i className='bi bi-signpost-split'></i> - Please use your own judgement on the shared information. </p>
        <p><i className='bi bi-server'></i> - Data stored here can't be used for any purpose covered by Fair Credit Reporting Act (FCRA).</p>
        <p><i className='bi bi-journal-check'></i> - Please read the terms and policy for more details.</p>
      </div>
    </div>
  );

});
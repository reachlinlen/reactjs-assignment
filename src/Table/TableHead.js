import React from 'react';

export default function TableHead() {
  return (
    <React.Fragment>
      <tr>
        <th style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '20vw'}}>Transaction ID</th>
        <th style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '10vw'}}>User Name</th>
        <th style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '12vw'}}>Payment Mode</th>
        <th style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '13vw'}}>Amount</th>
      </tr>
    </React.Fragment>
  );
}
import React from 'react';

export default function Row(props) {
  return (
    <React.Fragment>
      <tr>
        <td style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '15vw'}}>{props.tranID}</td>
        <td style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '10vw'}}>{props.userName}</td>
        <td style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '12vw'}}>{props.payMode}</td>
        <td style={{textAlign: 'center', border: '1px solid #dddddd', padding: '8px', width: '13vw'}}>{props.amt}</td>
      </tr>
    </React.Fragment>
  );
}
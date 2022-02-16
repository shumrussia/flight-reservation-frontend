import React from 'react';
import { useParams } from 'react-router-dom';

const ConfirmReservation = () => {

  var params = useParams();
  return (
    <div>
      <b>Flight reservation is complete. The confirmation code is {params.reservationId}</b>
    </div>
  );
};

export default ConfirmReservation;

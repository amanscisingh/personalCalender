import React from 'react';
import { Context } from '../contexts/Context';
import waitSpinner from '../images/wait-spinner-white.svg';

const Wait = () => {
    let { loader } = React.useContext(Context);
    const visibility = `fullScreen ${loader}`;
    console.log(visibility);

  return <div className={visibility}>
      <img src={waitSpinner} alt="" srcset="" />
  </div>;
};

export default Wait;

import React from 'react';

import './Background.scss';

function Background() {
  return (
    <div className="bg__wrapper" aria-hidden="true">
      <div className="bg__wrapper-blob bg__wrapper-s1"></div>
      <div className="bg__wrapper-blob bg__wrapper-s2"></div>
      <div className="bg__wrapper-blob bg__wrapper-s3"></div>
      <div className="bg__wrapper-blob bg__wrapper-s4"></div>
    </div>
  );
}

export default Background;

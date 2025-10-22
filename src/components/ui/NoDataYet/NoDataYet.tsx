import React from 'react';

import Corners from '@components/ui/Corners/Corners';

import './NoDataYet.scss';

import Error from '@/../public/icons/error.svg';

export function NoDataYet() {
  return (
    <div className="no-data-yet">
      <Corners />
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p className="no-data-yet__title">// NO DATA TO SEE YET</p>
      <hr />
      <div className="no-data-yet__content">
        <p className="no-data-yet__description">
          We couldn’t find any records matching your integrations or time range. Once your setup starts generating
          activity, it’ll show up here automatically.
        </p>
        <Error />
      </div>
    </div>
  );
}

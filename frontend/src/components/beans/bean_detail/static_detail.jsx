import React from 'react';

export const StaticDetail = ({bean}) => (
  <div>
    <h2>{bean.name}</h2>
    <h4>{bean.roaster}</h4>
    <h4>{bean.roast}</h4>
    <div>{bean.origin}</div>
    <div>{bean.rating}</div>
  </div>
);
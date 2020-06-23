import React from 'react';

export const star = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
  >
    <path
      d='M21.4 10.8c-.3-1.1-.3-1.1-.7-2.1l-6-.1L12.8 3h-2.2l-2 5.6-5.9.1c-.3 1.1-.3 1.1-.7 2.1l4.8 3.6L5 20.1l1.8 1.3 4.9-3.4 4.9 3.4c.9-.7.9-.6 1.8-1.3l-1.8-5.7 4.8-3.6z'
      fill='currentColor'
    />
  </svg>
);

export const arrowsDefault = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
  >
    <path
      d='M9 10.368v-1.4L11.968 6l2.968 2.968v1.4H9zM14.936 13v1.4l-2.968 2.968L9 14.4V13h5.936z'
      fill='#C1C6CD'
    ></path>
  </svg>
);

export const arrowsAsc = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      opacity='0.5'
      d='M16 12.85v1.65L12.75 18 9.5 14.5v-1.65H16z'
      fill='#848E9C'
    ></path>
    <path
      d='M9.5 9.745v-1.65l3.25-3.5 3.25 3.5v1.65H9.5z'
      fill='url(#sorting-up-color-s24_svg__paint0_linear)'
    ></path>
    <defs>
      <linearGradient
        id='sorting-up-color-s24_svg__paint0_linear'
        x1='16'
        y1='4.594'
        x2='9.5'
        y2='4.594'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#EFB80B'></stop>
        <stop offset='1' stopColor='#FBDA3C'></stop>
      </linearGradient>
    </defs>
  </svg>
);

export const arrowsDsc = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      opacity='0.5'
      d='M9 10.153V8.5L12.25 5l3.25 3.501v1.652H9z'
      fill='#848E9C'
    ></path>
    <path
      d='M15.5 13.257v1.652l-3.25 3.5L9 14.91v-1.652h6.5z'
      fill='url(#sorting-down-color-s24_svg__paint0_linear)'
    ></path>
    <defs>
      <linearGradient
        id='sorting-down-color-s24_svg__paint0_linear'
        x1='9'
        y1='18.41'
        x2='15.5'
        y2='18.41'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#EFB80B'></stop>
        <stop offset='1' stopColor='#FBDA3C'></stop>
      </linearGradient>
    </defs>
  </svg>
);

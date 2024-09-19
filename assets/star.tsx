import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Star = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 6.827 6.827"
  >
    <Path
      d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923-1.343.923-.239.164.082-.278.462-1.564-1.292-.992-.23-.176.29-.008 1.63-.044.544-1.535.097-.274z" 
      fill="white"
      fillRule="nonzero"
    />
    <Path
      d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923V.98z"
      fill="white"
      fillRule="nonzero"
    />
    <Path d="M0 0h6.827v6.827H0z" fill="none" />
  </Svg>
);

export default Star;

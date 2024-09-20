import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

const BackArrow = () => {
  return (
    <Svg 
      fill="#000000" 
      viewBox="0 0 24 24" 
      width="24" 
      height="24" 
    >
      <Circle cx="12" cy="12" r="10" fill="#FF6347" />
      <Path 
        d="M17,11H11V9.86a1,1,0,0,0-1.5-.69L6.38,11.31a.82.82,0,0,0,0,1.38L9.5,14.83a1,1,0,0,0,1.5-.69V13h6a1,1,0,0,0,0-2Z" 
        fill="#ffffff" 
      />
    </Svg>
  );
};

export default BackArrow;

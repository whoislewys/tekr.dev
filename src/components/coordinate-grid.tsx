import React from 'react';

interface CoordinateGridProps {
  dotPosition: number;
}

export const CoordinateGrid: React.FC<CoordinateGridProps> = (props) =>  {
  return (
    <div className='coordinate-grid'>
      {/* <div className='x-axis'/> */}
      <div className='y-axis'/>
      <div className='dot' style={{ transform: `translateX(${props.dotPosition* 10 + 1}%)` }}/>
    </div>
  )
}

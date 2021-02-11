import React from 'react';

interface FinalScoreProps {
  score: number;
}

export const TekFinalScore: React.FC<FinalScoreProps> = (props) => {
  return (
    <div className='final-score-container'>
      <p className='final-score-axis-label'>
        RISK AVERSITY
      </p>
      <p className='final-score-text'>
        { `${props.score}` }
      </p>
    </div>
  );
};

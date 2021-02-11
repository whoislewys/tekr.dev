import React from 'react';

interface DescriptionProps {
    score: number;
}

export const TekDescription: React.FC<DescriptionProps> = (props) => {
    return (
      <div>
        <p className='tek-description-title'>
          { `You were tekd as ${_getTitleForScore(props.score)}` }
        </p>
        <p className='tek-description-body'>
          {  _getFlavorTextForScore(props.score) }
        </p>
      </div>
    );
};

const _getFlavorTextForScore = (score: number) => {
  const liberalFlavorText: string = 'You tend to optimize for development speed, code simplicity, and flexibility. You emphasize getting a good product into customers\' hands over a perfect product. You are still concerned with performance and safety, but you are much more concerned with getting that new feature out, and making it easy to modify or build new features after that.';

  const liberalExtremistFlavorText: string = 'You optimize for development speed over everything else. You believe iterating quickly is the most important thing, and will steer you in the right direction more than any amount of planning ahead. You are a fan of convention over configuration, syntactic sugar, and anything that lets you ship faster.';

  const centristFlavorText: string = 'You support a balance of moving fast and staying safe. Rather than optimizing for certain software characteristics at the expense of others, you place an emphasis on optionality, usability, and choosing the right tools and techniques for the job.';

  const conservativeFlavorText: string = 'You tend to optimize for software robustness, performance, and safety. You believe that putting in more work up front to release a robust and well-architected solution will provide more value in the long run than releasing a working solution as quickly as possible.';

  const conservativeExtremistFlavorText: string = 'You optimize for software robustness, performance, and safety over everything else. The value gained from iterating quickly does not outweigh the cost of something breaking in production, or creating tech debt. You probably architect thoroughly before building and releasing to minimize the chances of programmers creating bugs in the first place.';

  if (score < -60) {
    return liberalExtremistFlavorText;
  } else if (-60 <= score && score < -20) {
    return liberalFlavorText;
  } else if (-20 <= score && score < 20) {
    return centristFlavorText;
  } else if (20 <= score && score < 60) {
    return conservativeFlavorText;
  } else if (60 <= score) {
    return conservativeExtremistFlavorText;
  }
};

const _getTitleForScore = (score: number) => {
  const centristTitle: string = 'centrist';
  const liberalTitle: string = 'liberal';
  const liberalExtremistTitle: string = 'liberal extremist';
  const conservativeTitle: string = 'conservative';
  const conservativeExtremistTitle: string = 'conservative extremist';

  if (score < -60) {
    return liberalExtremistTitle;
  } else if (-60 <= score && score < -20) {
    return liberalTitle;
  } else if (-20 <= score && score < 20) {
    return centristTitle;
  } else if (20 <= score && score < 60) {
    return conservativeTitle;
  } else if (60 <= score) {
    return conservativeExtremistTitle;
  }
};

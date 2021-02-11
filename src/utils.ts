import { Statement } from './models/statement';
import { AgreementLevel, Lean } from './models/enums';

/*********************************************/
// Score
/*********************************************/

export function recalculateScore(statements: Array<Statement>): number {
  // todo: when skip is added, do a filter
  let n: number = statements.length;
  let maxStatementWeight: number = calculateMaxStatementWeight(n);

  let score: number = 0;
  for (let i = 0; i < statements.length; i++) {
    //console.log(`QUESTION ${i}`);
    // todo: fix the score being calculated incorrectly for right leaning questions (has to do with the leanmultiplier)

    // const leanMultiplier: number = statements[i].lean === Lean.liberal ? -1 : 1;
    
    //console.log('b4 score', score);

    if (statements[i].lean === Lean.liberal) {
      //console.log('q tests for left lean, subtracting')
      score -= calculateWeight(statements[i].agreementLevel, maxStatementWeight);
    } else {
      //console.log('q tests for right lean, adding')
      score += calculateWeight(statements[i].agreementLevel, maxStatementWeight);
    }
    //console.log('after score', score);
  }

  //console.log('final score: ',score);
  return Math.round(score);
} 

function calculateMaxStatementWeight(n: number): number {
  return 100/n;
}

function calculateWeight(agreementLevel: number, maxStatementWeight: number): number {
  // for each question, calculate it's weight 
  //console.log('agreement level: ', agreementLevel);
  if (agreementLevel === AgreementLevel.none) {
    //console.log('weight: 0');
    return 0;
  }
  //console.log('weight:', agreementLevel / 2 * maxStatementWeight);
  return agreementLevel / 2 * maxStatementWeight;
}

/*********************************************/
// Questionnaire
/*********************************************/
export function shuffle(arr: Array<Statement>): Array<Statement> {
  // careful, this `arrCopy` holds the same references to the underlying objects in the original `arr`
  const arrCopy: Array<Statement> = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

import React, { Component } from 'react';
import { ReactComponent as ThumbUp } from '../assets/thumb-up.svg'; // Tell Webpack this JS file uses this image
import { Statement } from '../models/statement';

interface ChooserProps {
  statement: Statement;
  selectedButtonId: string;
  setAgreementLevel: (arg1: number, arg2: string) => void;
}

export class TekChooser extends Component<ChooserProps, {}> {
  render() {
    return (
    <div className='tek-radios-group'>
      <ThumbUp
        className='thumb-down-icon'
      />
      { this._getInputs() }
      <ThumbUp
        className='thumb-up-icon'
      />
    </div>
    );
  }  

  _getInputs(): Array<JSX.Element>{
    const radioButtons:Array<JSX.Element> = new Array<JSX.Element>();
    for (let i = -2; i <= 2; i++) {
      const curButtonId: string = `tek-chooser-${i}`;
      radioButtons.push(
      <input
        id={curButtonId}
        key={curButtonId}
        type='radio'
        className='tek-radio-button'
        name='tekr-radio'
        onMouseDown={(e) => e.preventDefault()}
        checked={this.props.selectedButtonId === curButtonId}
        onChange={() => this._handleRadioButtonClick(i, curButtonId)}
      />
      );
    }
    return radioButtons;
  }

  _handleRadioButtonClick(chosenAgreementLevel: number, selectedButtonId: string): void {
    this.props.setAgreementLevel(chosenAgreementLevel, selectedButtonId);
  }

  // todo: implement a clear selected button id func that changes selectedButtonId state to ''
  // and is called from progress bar 
}

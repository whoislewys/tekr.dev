import React, { Component } from 'react';
import { ReactComponent as Chevron } from '../assets/chevron.svg';

interface TekProgressProps {
  decrementProgress: () => void;
  disableForwardChevron: boolean;
  disableBackwardChevron: boolean;
  incrementProgress: () => void;
  percentProgress: number;
  outOfStatements: boolean;
  completeProgress: () => void;
}

interface TekProgressState {
  progress: number;
}

export class TekProgress extends Component<TekProgressProps, TekProgressState> {
  render() {
    return (
      <div className='tek-progress-bar-container'>
        { this._getChevron('left') }
        <div className='tek-progress-bar-background'>
          <div className='tek-progress-bar' style={{width: `${this.props.percentProgress.toString()}%`}}/>
        </div>
        { this._getChevron('right') }
      </div>
    );
  }

  _getChevron(chevronDirection:string): JSX.Element {
    return (
      chevronDirection === 'right'
      ?
        !this.props.outOfStatements
        ?
        (
          <button
            className='chevron-button'
            onMouseDown={(e) => e.preventDefault()}
            onClick={this.props.incrementProgress}
          >
            <Chevron className={`chevron-${chevronDirection}`} />
          </button>
        )
        :
        (
          <button
            className='chevron-button'
            onMouseDown={(e) => e.preventDefault()}
            onClick={this.props.completeProgress}
          >
            <Chevron className={`chevron-${chevronDirection} check-mark`} viewBox={'0 10 30 30'}/>
          </button>
        )

      : (
        <button
          className='chevron-button'
          onMouseDown={(e) => e.preventDefault()}
          onClick={this.props.decrementProgress}
          disabled={this.props.disableBackwardChevron}
        >
          <Chevron className={`chevron-${chevronDirection}`}/>
        </button>
      )
    ); 
  }
}

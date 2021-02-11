import React, {Component} from 'react';
import './App.css';
import {CoordinateGrid} from './components/coordinate-grid';
import {TekProgress} from './components/progress-bar';
// todo: use an index.ts file to group all these component imports together
import {TekChooser} from './components/tek-chooser';
import {TekDescription} from './components/tek-description';
import {TekFinalScore} from './components/tek-final-score';
import {Axis, Lean} from './models/enums';
import {Statement} from './models/statement';
import jsonStatements from './tek-statements.json';
// import jsonStatements from './test-statements.json';
import {recalculateScore, shuffle} from './utils';
import ReactGA from 'react-ga';

interface TekrState {
  statements: Array<Statement>;
  curQuestionIndex: number;
  selectedButtonId: string;
  curScore: number;
  quizComplete: boolean;
  outOfStatements: boolean;
}

class App extends Component<{}, TekrState> {
  state: Readonly<TekrState> = {
    statements: new Array<Statement>(),
    curQuestionIndex: 0,
    selectedButtonId: '',
    curScore: 0,
    quizComplete: false,
    outOfStatements: false,
  };

  componentDidMount() {
    // init google analytics
    const trackingId: string = 'UA-147083278-1';
    ReactGA.initialize(trackingId);
    ReactGA.event({
      category: "App Open",
      action: "User visited tekr.dev",
    });
    // load statements from JSON
    const statements:Array<Statement> = shuffle(this._deserializeStatements(jsonStatements));
    this.setState({
      statements: statements,
      curQuestionIndex: 0,
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='header'>
          <h1>
            tekr
          </h1>
        </div>

        <div className='block'>
          <div>
            <h2>What is tekr?</h2>
          </div>
          <p className='basic-text'>
          Tekr is a quiz designed to help you discover if you are a conservative or liberal programmer. This has NOTHING to do with politics whatsoever.<br/><br/>It is based on a post by the prolific Steve Yegge, mirrored <a href="https://whoislewys.com/2019/09/06/Notes-From-The-Mystery-Machine_Bus">here.</a>
          </p>
        </div>

        <div className='quiz-block'>
          <div className='grid-container'>
            <CoordinateGrid dotPosition={ this.state.curScore } />
          </div>
          {
            !this.state.quizComplete
            ? this._renderStatementChooser()
            : this._renderFinalScore()
          }
        </div>
        {
          !this.state.quizComplete
          ? this._renderProgressBar()
          : this._renderFinalDescription()
        }
      </div>
    );
  }

  _renderStatementChooser(): JSX.Element {
    const { statements, curQuestionIndex } = this.state;
    return (
      <div className='statements-choosing-container'>
        {this._getStatements()}
        <TekChooser
          statement={ statements[curQuestionIndex] }
          selectedButtonId={ this.state.selectedButtonId }
          setAgreementLevel={ this.setAgreementLevel }
        />
      </div> 
    );
  }

  _renderProgressBar(): JSX.Element {
    return (
      <div>
        <TekProgress
            decrementProgress={ () => this.decrementProgress() }
            disableForwardChevron={ this.state.curQuestionIndex === this.state.statements.length-1 }
            disableBackwardChevron={ this.state.curQuestionIndex === 0 }
            incrementProgress={ () => this.incrementProgress() }
            percentProgress={ this.getPercentProgress() }
            outOfStatements={ this.state.curQuestionIndex === this.state.statements.length-1 }
            completeProgress={ () => this.setQuizComplete() }
        />
      </div>
    );
  }

  _renderFinalDescription(): JSX.Element {
    return (
      <div className='tek-description-container'>
        <TekDescription score={ this.state.curScore } />
      </div>
    );
  }
  _renderFinalScore(): JSX.Element {
    return (
      <div className='final-score-container'>
        <TekFinalScore score={ this.state.curScore }/>
      </div>
    );
  }

  _getStatements(): JSX.Element {
    const { statements, curQuestionIndex } = this.state;
    if (!statements.length) return <React.Fragment />;

    return(
      <p className='statement-text'>
        {statements[curQuestionIndex].text}
      </p>
    );
  }

  _deserializeStatements(jsonStatements: any): Array<Statement> {
    const statements:Statement[] = new Array<Statement>();

    jsonStatements.statements.forEach((jsonStatement:any) => {
      let axis:Axis = Axis.none;
      if (jsonStatement.axis === 'x') {
        axis = Axis.x;
      } else if (jsonStatement.axis === 'y') {
        axis = Axis.y;
      }

      let lean:Lean = Lean.none;
      if (jsonStatement.lean === 'conservative') {
        lean = Lean.conservative;
      } else if (jsonStatement.lean === 'liberal') {
        lean = Lean.liberal;
      }

      const statement:Statement = new Statement(jsonStatement.text, axis , lean);

      statements.push(statement);
    });

    return statements;
  }

  setAgreementLevel = (chosenAgreementLevel: number, selectedButtonId: string): void =>  {
    const curStatement:Statement  = this.state.statements[this.state.curQuestionIndex]
    console.log('chosenAgreementLevel', chosenAgreementLevel);
    console.log('setting it on statement model', curStatement.text);
    curStatement.setAgreementLevel(chosenAgreementLevel);

    this.setState({ selectedButtonId });
    // todo: when implementing skip functionality, filter statements here
    // so that only ones which are not skipped get factored into the score

    const curScore: number = recalculateScore(this.state.statements);
    this.setState({ curScore: curScore });
  }

  incrementProgress(): void {
    if (this.state.curQuestionIndex < this.state.statements.length - 1) {
      this.setState({
        curQuestionIndex: this.state.curQuestionIndex + 1,
      });
    }
    this.setState({ selectedButtonId: '' });
  }

  decrementProgress(): void {
    if (this.state.curQuestionIndex > 0) {
      this.setState({
        curQuestionIndex: this.state.curQuestionIndex - 1,
      });
    }
    this.setState({ selectedButtonId: '' });
  }

  getPercentProgress(): number {
    return ((this.state.curQuestionIndex + 1)/this.state.statements.length) * 100;
  }

  setQuizComplete(): void {
    this.setState({ quizComplete: true });
  }
}

export default App;

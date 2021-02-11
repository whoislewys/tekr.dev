import { Axis, AgreementLevel, Lean } from './enums';

export class Statement {
  text: string;
  axis: Axis;
  hasBeenSkipped: boolean;
  lean: Lean;
  agreementLevel: AgreementLevel;
  
  constructor(text: string, axis: Axis, lean: Lean) {
    this.text = text;
    this.axis = axis;
    this.hasBeenSkipped = false;
    this.lean = lean;
    this.agreementLevel = AgreementLevel.none;
  }  

  setAgreementLevel(agreementLevel: AgreementLevel) {
    console.warn(`setting agreement level on statement model ${this.text} to agreementLevel ${agreementLevel}`);
    this.agreementLevel = agreementLevel;
    console.warn('new agreementLevel', this.agreementLevel);
  }

  skip() {
    this.hasBeenSkipped = true;
  }

  unskip() {
    this.hasBeenSkipped = false;
  }
}

/* eslint-disable */

export interface WizardState {
    currentIndex: number,
    textBack: string,
    textNext: string,
    steps: Array<any>,
    complete: boolean,
  }

export interface WizardCallbackArgs {
  validate: Function,
  asyncCallback: Function,
}

export interface WizardOptionsArgs {
  backText: string,
  nextText: string
}

export enum StepStatus {
  pending = 0,
  saved = 1,
}

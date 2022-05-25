/* eslint-disable */

import {
  WizardState,
  WizardCallbackArgs,
  WizardOptionsArgs,
  StepStatus,
} from "./types";
import useVuelidate from "@vuelidate/core";

export function useWizard(
  initialModel: any,
  rules: any,
  callbacks: WizardCallbackArgs,
  options: WizardOptionsArgs
) {
  const instance = getCurrentInstance();
  if (!instance) throw "useWizard cannot be called outside setup()";
  const wizardState: WizardState = inject("wizardState");
  if (!wizardState) throw "useWizard cannot be called outside Wizard component";

  const $v = useVuelidate(rules, initialModel);
  const currentStep = wizardState.steps[wizardState.currentIndex];
  if (callbacks.asyncCallback)
    currentStep.asyncCallback = callbacks.asyncCallback;
  currentStep.$v = $v;

  currentStep.options = options;

  return {
    $v,
    initialModel,
  };
}

export function useWizardNavigation() {
  const wizardState: WizardState = inject("wizardState");
  if (!wizardState)
    throw "useWizardNavigation cannot be called outside Wizard component";
  const instance = getCurrentInstance();
  if (!instance) throw "useWizardNavigation cannot be called outside setup()";
  const { emit } = instance;

  const next = async () => {
    const currentStep = wizardState.steps[wizardState.currentIndex];
    const { asyncCallback } = currentStep;
    if (currentStep.$v.$validate) {
      await currentStep.$v.$validate();
      if (currentStep.$v.$invalid) {
        return;
      }
    }
    if (asyncCallback) {
      currentStep.loading = true;
      if (!(await asyncCallback(currentStep.state))) {
        currentStep.loading = false;
        currentStep.asyncCallbackError = true;
        return;
      }
      currentStep.loading = false;
    }
    if (wizardState.currentIndex == wizardState.steps.length - 1) {
      wizardState.complete = true;
      emit("on-complete");
    } else {
      currentStep.status = StepStatus.saved;
      wizardState.currentIndex++;
    }
  };

  const back = () => {
    if (wizardState.currentIndex > 0) wizardState.currentIndex--;
  };

  const hasError = computed(() => {
    const currentStep = wizardState.steps[wizardState.currentIndex];
    const { $v } = currentStep;
    return ($v.$dirty && $v.$invalid) || currentStep.asyncCallbackError;
  });

  const loading = computed(() => {
    const step = wizardState.steps[wizardState.currentIndex];
    return step.loading;
  });

  const backDisabled = computed(() => {
    return wizardState.currentIndex == 0 || wizardState.complete;
  });

  const nextDisabled = computed(() => {
    return wizardState.complete;
  });

  const backText = computed(() => {
    const currentStep = wizardState.steps[wizardState.currentIndex];
    return currentStep.options?.backText || "Atrás";
  });

  const nextText = computed(() => {
    const currentStep = wizardState.steps[wizardState.currentIndex];
    if (currentStep.status == StepStatus.saved) {
      return currentStep.options?.nextText || "Update";
    } else {
      return currentStep.options?.nextText || "Save";
    }
  });

  return {
    next,
    back,
    hasError,
    loading,
    backDisabled,
    nextDisabled,
    backText,
    nextText,
  };
}

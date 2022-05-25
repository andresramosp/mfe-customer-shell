<template>
  <div class="wizard" :class="orientation">
    <div class="wizard__header">
      <div class="wizard__title">
        {{ title }}
      </div>
      <div class="wizard__tabs" v-if="!wizardState.complete">
        <ul>
          <li
            v-for="(step, index) in wizardState.steps"
            :key="index"
            :class="statusStep(index)"
          >
            <div class="wizard__dot">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="wizard__tabs_label">
              {{ step.label }}
            </div>
          </li>
        </ul>
      </div>
      <h3 v-else>Completed!</h3>
    </div>

    <BaseStep @on-complete="onComplete" :navigation="navigation">
      <template #content>
        <keep-alive>
          <component
            :is="currentView"
            :key="wizardState.steps[wizardState.currentIndex].id"
            v-model="wizardState.steps[wizardState.currentIndex].state"
          />
        </keep-alive>
      </template>
    </BaseStep>
  </div>
</template>
<script setup lang="ts">
/**
 * @name Wizard
 * Definir altura y anchura en un contenedor: <div class="width, height"><Wizard/></div>
 */
import { WizardState } from "./types";
import BaseStep from "./BaseStep.vue";

interface Props {
  orientation: string;
  title: string;
  navigation: boolean;
  steps: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
  title: "hello",
  navigation: true,
  steps: () => [],
});

const emit = defineEmits(["on-complete"]);

const wizardState: WizardState = inject("wizardState");

const currentView = computed(() => {
  const { component } = props.steps[wizardState.currentIndex];
  return component;
});

const statusStep = (index) => {
  return wizardState.currentIndex === index
    ? "active"
    : wizardState.currentIndex > index
    ? "complete"
    : "incomplete";
};

const onComplete = () => {
  const form = {};
  for (let step of wizardState.steps) {
    form[step.id] = step.state;
  }
  emit("on-complete", form);
};
</script>

<style lang="scss">
.wizard {
  display: flex;
  .wizard__header {
    .wizard__title {
      display: flex;
      justify-content: center;
      padding: 48px 32px 16px 29px;
      font-size: 24px; //Headline 5
    }
    ul {
      list-style: none;
      padding: none;
      margin: 0px;
      li {
        display: flex;
        position: relative;
        &::after {
          content: "";
          width: 100%;
          height: 1px;
          background: var(--color-grey-transparent);
          position: absolute;
          z-index: 0;
          top: 50%;
          margin-top: -1px;
        }
        .wizard__dot {
          height: 32px;
          width: 32px;
          min-height: 32px;
          min-width: 32px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid var(--color-grey-transparent);
          background: var(--surface-ground);
          color: var(--color-grey-transparent);
          position: relative;
          z-index: 1;
        }
        .wizard__tabs_label {
          color: var(--on-surface-enphasis);
        }
        &.active {
          &::after {
            background: var(--primary-color);
          }
          .wizard__dot {
            background: var(--primary-color);
            color: var(--primary-color-text);
            border: 1px solid var(--primary-color);
          }
          .wizard__tabs_label {
            color: var(--primary-color);
            font-size: 20px;
          }
        }
        &.complete {
          .wizard__dot {
            background: var(--color-grey-transparent);
            background: #a0a1a7;
            border: 1px solid #a0a1a7;
            span {
              display: none;
            }
            &::after {
              font-family: "Material Icons Outlined";
              font-size: 24px;
              line-height: 1;
              content: "done";
              color: var(--primary-color-text);
            }
          }
          .wizard__tabs_label {
            color: var(--on-surface-enphasis);
            font-size: 16px; //Subtitle 1
          }
        }
      }
    }
  }
  .wizard__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--surface-section);
    .wizard__view_title {
      color: var(--primary-color);
      font-size: 16px;
      font-weight: 500;
      padding: 32px;
    }
    .wizard__view {
      height: 100%;
      overflow: auto;
    }
    .divider {
      width: 100%;
      height: 1px;
      border-top: 1px solid #cecece;
      padding-top: 32px;
    }
  }
  .wizard__footer {
    padding: 0 32px 32px 32px;
    .wizard__nav {
      display: flex;
      gap: 67px;
      justify-content: flex-end;
    }
  }
  &.horizontal {
    flex-direction: column;
    height: 100%;
    width: 100%;
    ul {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      padding: 0px;
      li {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &::after {
          width: 80%;
          top: 16px;
        }
        .wizard__tabs_label {
          margin-top: 15px;
          margin-bottom: 20px;
        }
      }
    }
  }
  &.vertical {
    height: 100%;
    flex-direction: row;
    .wizard__header {
      flex-direction: column;
      min-width: 228px;
      background: var(--surface-ground);
      min-height: 100%;
      .wizard__tabs {
        height: calc(100% - 125px);
        padding-top: 10px;
        ul {
          height: 100%;
          padding-top: 15px;
          display: flex;
          flex-direction: column;
          li {
            height: 100%;
            .wizard__tabs_label {
              margin-top: 7px;
              margin-left: 15px;
            }
            &::after {
              width: 1px;
              height: 80%;
              top: 5px;
              left: 16px;
            }
          }
        }
      }
    }
    .wizard__container {
      width: 100%;
    }
  }
}
</style>

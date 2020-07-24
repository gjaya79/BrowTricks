<template>
  <div class="relative">
    <!-- TODO: add v-on="inputListeners" like Volkswagen BaseInputText.vue to handle all events -->
    <input
      class="input text-on-background text-opacity-high appearance-none outline-none relative bg-transparent rounded w-full px-4 py-3 border focus:border-2 active:border-2 focus:border-opacity-medium active:border-opacity-medium"
      :class="[
        margin,
        { filled: value && value.length > 0 },
        error
          ? 'border-red-600 placeholder-red-600'
          : 'border-on-background border-opacity-disabled'
      ]"
      :id="idName"
      :type="type"
      min="0"
      :step="step"
      :value="value"
      @blur="$emit('input', $event.target.value)"
      :placeholder="placeholder || label"
    />
    <label
      :for="idName"
      class="label absolute mb-0 top-0 left-0 mt-3 ml-3 cursor-text"
      :class="[
        error ? 'text-red-600' : 'text-on-background text-opacity-medium',
        labelBg
      ]"
    >
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

export default {
  name: 'TextInput',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    step: {
      type: String,
      default: '1'
    },
    error: {
      default: Boolean
    },
    idName: {
      type: String,
      default: randomId
    },
    labelBg: {
      type: String,
      default: 'bg-background'
    },
    margin: {
      type: String,
      default: 'mb-4'
    }
  }
};
</script>

<style scoped>
.input {
  transition: border 0.2s ease-in-out;
  z-index: 2;
}

.label {
  transition: all 0.2s ease-out;
  transition: all 200ms;
  opacity: 0;
  padding: 0 5px;
  z-index: 1;
}

.input:focus + .label,
.input:active + .label,
.input.filled + .label {
  font-size: 0.75rem;
  transition: all 0.2s ease-out;
  top: 0;
  opacity: 1;
  display: block;
  z-index: 3;
}

.input:focus::placeholder {
  color: transparent;
}
</style>
<template>
  <div class="slider">
    <input
        type="range"
        class="slider-input"
        :min="min"
        :max="max"
        :step="step"
        @input="updateValue"
    />
    <span class="slider-value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    updateValue(event) {
      const newValue = Math.round(event.target.value / this.step) * this.step;
      this.$emit('input', newValue);
    }
  }
};
</script>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  width: 300px;
}

.slider-input {
  width: calc(100% - 50px);
  margin-right: 10px;
  -webkit-appearance: none;
  background: none;
  height: 5px;
  outline: none;
  border-radius: 5px;
  transition: background 0.2s;
}

.slider-input::-webkit-slider-runnable-track {
  background: #d3d3d3;
  border-radius: 5px;
}

.slider-input::-moz-range-track {
  background: #d3d3d3;
  border-radius: 5px;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #4caf50;
  cursor: pointer;
  border-radius: 50%;
}

.slider-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #4caf50;
  cursor: pointer;
  border-radius: 50%;
}

.slider-value {
  font-size: 18px;
  color: #4caf50;
}
</style>

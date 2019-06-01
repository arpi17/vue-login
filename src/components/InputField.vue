<template>
  <div class="form-group">
    <label :for="label">{{ label }}</label>
    <input
      :id="label"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    >
    <small
      :class="{ 'invalid-feedback': error }"
      :style="{ visibility: error ? 'visible' : 'hidden' }"
    >{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: String,
    type: String,
    label: String,
    error: String,
    placeholder: String
  }
};
</script>

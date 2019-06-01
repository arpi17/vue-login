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
    />
    <small v-show="error" :class="{ 'invalid-feedback': error }">{{
      error
    }}</small>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: {
      type: String,
      required: true
    },
    type: String,
    label: {
      type: String,
      required: true
    },
    error: String,
    placeholder: String
  }
};
</script>

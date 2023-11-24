<template>
  <div class="relative">
    <input
      :value="props.modelValue"
      @input="(event) => emits('update:modelValue', event.target.value)"
      class="block rounded-md px-6 pt-6 pb-1 w-full text-md text-slate-900 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1 border border-solid border-sky-600"
      :type="props.type"
      :placeholder="props.placeholder"
    />
    <label
      for=""
      v-if="props.label"
      class="absolute text-md text-gray-800 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >{{ props.label }}</label
    >
  </div>
</template>
<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: null,
  },
});
</script>

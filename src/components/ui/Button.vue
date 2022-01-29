<template>
  <button
    :class="{
      'bg-black border-none text-white ': primary,
      'border border-gray-350 text-black': outlined,
    }"
    class="btn"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ChannelButton',
  props: {
    primary: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.btn {
  @apply mr-2 rounded-3xl border-solid px-6 h-8 text-center font-inter font-semibold
}
</style>

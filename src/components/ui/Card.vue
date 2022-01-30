<template>
    <div class="card">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-xl border w-full px-4 py-4 overflow-auto max-h-80;
}
</style>
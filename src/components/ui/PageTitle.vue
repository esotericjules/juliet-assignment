<template>
    <p class="title">{{text}}</p>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {
        text: {
            type: String,
            default: "",
            required: true,
        }
    }
}
</script>

<style scoped>
.title {
 @apply text-2xl font-bold mb-6    
}

</style>
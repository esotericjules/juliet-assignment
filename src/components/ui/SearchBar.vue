<template>
 <form data-cy="search-form">
   <div class="relative text-gray-600 focus-within:text-gray-400">
     <span class="absolute inset-y-0 flex items-center pl-4 text-gray-300">
       <font-awesome-icon icon="search" />
     </span>
     <input
       type="search"
       name="searchInput"
       class="input-field"
       placeholder="Add Channel"
       v-model="inputValue"
       data-cy="search-input"
       @input="$emit('handle-search', inputValue)"
       @keydown.enter.prevent="$emit('add-new-item', inputValue)"
     />
   </div>
 </form>
</template>
 
<script>
 
export default {
 name: "SearchBar",
 props: {
     searchValue: {
    type: String,
    default: ""
     }
 },
 computed: {
   inputValue: {
     get() {
       return this.searchValue;
     },
     set(val) {
     console.log("val", val);
       this.$emit('set-search-value', val);
     },
   },
 },
};
</script>
 
<style scoped>
.input-field {
   @apply w-full py-2 text-sm rounded-3xl border-2 border-trengoGray350 h-10 pl-10 focus:outline-none focus:bg-white focus:text-gray-900 placeholder-trengoGray500 font-inter font-medium
}
</style>
 


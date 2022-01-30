<template>
  <div class="bg-white w-full h-screen flex justify-center items-center">
    <div>
      <channel-manager/>
    </div>
    
  </div>
</template>



<script>
import ChannelManager from './components/view/ChannelManager.vue'
export default {
  name: 'App',
  components: {
    ChannelManager
  }
}
</script>

<style>

</style>

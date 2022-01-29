<template>
  <div class="card">
    <channel-item :channels="channels" @update-channels="updateChannels" @remove-channel="removeChannel" />
    <div class="flex justify-end mt-4">
        <channel-button outlined @click="cancelChanges">Cancel</channel-button>
        <channel-button primary @click="saveChanges">Apply</channel-button>
    </div>
  </div>
</template>

<script>
import ChannelItem from "./ChannelItem.vue";
import ChannelButton from "../ui/Button.vue"
export default {
  components: { ChannelItem, ChannelButton },
  name: "ChannelManager",
  data() {
    return {
      channels: [],
      actionPerformed: "",
      oldIndex: "",
      newIndex: "",
      indexTrack: [],
      removedItems: [],
      dragging: -1,
    };
  },
  mounted() {
    this.channels = this.$store.getters.fetchChannels;
    console.log(
      " this.store.getters.fetchTodos",
      this.$store.getters.fetchChannels
    );
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return;
      }
      this.channels.push({
        title: this.newItem,
        done: false,
      });
      this.newItem = "";
    },
    removeChannel(id) {
      console.log("id", id);
      this.actionPerformed = "remove";
      this.channels = this.channels.filter(item => item.id !== id)

    },
    updateChannels(updatedChannels) {
       console.log('val', updatedChannels)
       this.channels = updatedChannels
    },
    saveChanges() {
        console.log('this.channels', this.channels)
      this.$store.commit("updateChannels", this.channels);
    },
    cancelChanges() {
         this.channels = this.channelsData
      }
  },
  computed: {
    channelsData() {
      return this.$store.getters.fetchChannels;
    },
  },
  watch: {
    channels: {
      handler: function (channels) {
        console.log("channels", channels);
        // channelstorage.save(channels);
      },
      deep: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white rounded-xl shadow-xl border w-full px-4 py-4 overflow-auto;
}
</style>

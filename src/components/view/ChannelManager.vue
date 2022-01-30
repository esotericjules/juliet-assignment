<template>
  <div class="card">
    <div class="mb-4">
      <search-bar
        :searchValue="searchValue"
        @handle-search="handleSearch"
        @add-new-item="addNewItem"
        @set-search-value="setSearchValue"
      />
    </div>
    <div>
      <channel-item
        :channels="clonedChannels"
        @update-channels="updateChannels"
        @remove-channel="removeChannel"
      />
    </div>
    <div v-if="!clonedChannels.length" class="empty-state">
      <p class="text-2xl">This channel does not exist!</p>
      <p class="pt-1">Hit enter to create a new channel</p>
    </div>
    <div v-if="detectedChanges" class="flex justify-end mt-4">
      <channel-button outlined @click="cancelChanges">Cancel</channel-button>
      <channel-button primary @click="apply">Apply</channel-button>
    </div>
  </div>
</template>

<script>
import ChannelItem from "./ChannelItem.vue";
import ChannelButton from "../ui/Button.vue";
import SearchBar from "../ui/SearchBar.vue";
import { isEqual, exists } from "../../_helpers.js/index.js";

export default {
  components: { ChannelItem, ChannelButton, SearchBar },
  name: "ChannelManager",
  data() {
    return {
      channels: [],
      clonedChannels: [],
      searchValue: "",
      icons: ["facebook-messenger", "instagram", "telegram", "snapchat"],
      detectedChanges: false,
    };
  },
  mounted() {
    this.channels = [...this.channelsData];
    this.clonedChannels = [...this.channelsData];
  },
  methods: {
    removeChannel(id, idx) {
      this.actionPerformed = "remove";
      this.channels.splice(idx, 1);
      this.clonedChannels = this.channels;
    },
    updateChannels(updatedChannels) {
      this.clonedChannels = updatedChannels;
    },
    handleSearch(value) {
      if (value) {
        setTimeout(() => this.filterChannels(this.searchValue), 500);
      } else if (!this.searchValue) {
        this.channels = this.channelsData;
      }
    },
    filterChannels(value) {
      this.clonedChannels = this.channels.filter((channel) =>
        channel.name.toLowerCase().includes(value.toLowerCase())
      );
    },
    addNewItem(newItem) {
      if (!exists(this.channels, newItem, "name")) {
        if (newItem) {
          const item = {
            id: this.channels.length + 1,
            name: newItem,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)],
            type: "brand",
          };
          this.channels.push(item);
          this.clonedChannels = this.channels;
        }
      } else {
        this.$toasted.error("This channel already exists");
        this.clonedChannels = this.channels;
      }
      this.searchValue = "";
    },
    apply() {
      this.$store.commit("updateChannels", this.clonedChannels);
      this.channels = this.channelsData;
      this.$toasted.success("Your changes have been saved");
      this.detectedChanges = false;
    },
    cancelChanges() {
      this.clonedChannels = [...this.channelsData];
      this.channels = [...this.channelsData];
      this.detectedChanges = false;
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
  },
  computed: {
    channelsData() {
      return this.$store.getters.fetchChannels;
    },
  },
  watch: {
    clonedChannels() {
      if (!isEqual(this.clonedChannels, this.channelsData, "name")) {
        this.detectedChanges = true;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white rounded-xl shadow-xl border w-full px-4 py-4 overflow-auto;
}
.empty-state {
  @apply px-8 py-6 flex flex-col justify-center items-center;
}
</style>

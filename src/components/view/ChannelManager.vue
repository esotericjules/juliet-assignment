<template>
  <div>
    <page-title text="Channels" />
    <card>
      <div class="mb-4">
        <search-bar
          :searchValue="searchValue"
          @handle-search="handleSearch"
          @add-new-item="addNewItem"
          @set-search-value="setSearchValue"
        />
      </div>
      <channel-item
        :channels="clonedChannels"
        @update-channels="updateChannels"
        @remove-channel="removeChannel"
      />
      <div v-if="!clonedChannels.length" class="empty-state">
        <p class="text-2xl">This channel does not exist!</p>
        <p class="pt-1">Hit enter to create a new channel</p>
      </div>
      <div
        v-if="detectedChanges"
        data-cy="button-container"
        class="flex justify-end mt-4"
      >
        <channel-button outlined @click="cancelChanges">Cancel</channel-button>
        <channel-button primary @click="apply">Apply</channel-button>
      </div>
    </card>
  </div>
</template>

<script>
import ChannelItem from "./ChannelItem.vue";
import ChannelButton from "../ui/Button.vue";
import SearchBar from "../ui/SearchBar.vue";
import { isEqual, exists } from "../../_helpers.js/index.js";
import Card from "../ui/Card.vue";
import PageTitle from "../ui/PageTitle.vue";

export default {
  components: { ChannelItem, ChannelButton, SearchBar, Card, PageTitle },
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
    this.setRecords();
  },
  methods: {
    removeChannel(idx) {
      this.clonedChannels.splice(idx, 1);
      this.channels = [...this.clonedChannels];
    },
    updateChannels(updatedChannels) {
      this.clonedChannels = [...updatedChannels];
    },
    handleSearch(value) {
      if (value) {
        setTimeout(() => this.filterChannels(this.searchValue), 500);
      } else if (!this.searchValue) {
        this.channels = [...this.channelsData];
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
            id: this.channels[this.channels.length - 1]?.id + 1,
            name: newItem,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)],
            type: "brand",
          };
          this.$toasted.success("New channel has been added");
          this.channels.push(item);
          this.clonedChannels = [...this.channels];
        }
      } else {
        this.$toasted.error("This channel already exists");
        this.clonedChannels = [...this.channels];
      }
      this.searchValue = "";
    },
    apply() {
      this.$toasted.success("Your changes have been saved");
      this.$store.commit("updateChannels", this.clonedChannels);
      this.channels = [...this.channelsData];
      this.detectedChanges = false;
      this.searchValue = "";
    },
    cancelChanges() {
      this.$toasted.info('All changes have been reverted')
      this.setRecords();
      this.detectedChanges = false;
      this.searchValue = "";
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
    setRecords() {
      this.clonedChannels = [...this.channelsData];
      this.channels = [...this.channelsData];
    },
  },
  computed: {
    channelsData() {
      return this.$store.getters.fetchChannels;
    },
  },
  watch: {
    clonedChannels() {
      if (
        !this.searchValue &&
        !isEqual(this.clonedChannels, this.channelsData, "name")
      ) {
        this.detectedChanges = true;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.empty-state {
  @apply px-8 py-6 flex flex-col justify-center items-center;
}
</style>

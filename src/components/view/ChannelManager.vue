<template>
  <div class="card">
    <channel-item :channels="channels" @update-channels="updateChannels" />
  </div>
</template>

<script>
import ChannelItem from "./ChannelItem.vue";
export default {
  components: { ChannelItem },
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
    onEnd: function (evt) {
      console.log("evt", evt);
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
    },
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
    removeChannel(channel, idx) {
      console.log("channel", channel);
      this.actionPerformed = "remove";
      this.channelsData.splice(this.channelsData.indexOf(channel), 1);
      this.removedItems.unshift({ ...channel, index: idx });
    },
    removeChannelAt(index) {
      this.channels.splice(index, 1);
    },
    dragStart(which, ev) {
      console.log("which", which, "ev", ev);
      console.log("event.target.parentNode", ev.target.parentNode);
      ev.dataTransfer.setData("Text", this.id);
      ev.dataTransfer.dropEffect = "move";
      this.dragging = which;

      const parentNode = ev.target.parentNode;
      // parentNode.classList.add(".ghostElement");
      if (this.dragging > -1) {
        // let ghostElement = document.querySelector(".ghostElement");
        ev.dataTransfer.setDragImage(parentNode, 0, 0);
      }
    },
    dragEnter(ev) {
      console.log("ev", ev);

      /*
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = '10px'
      } else {
        ev.target.style.marginTop = '10px'
      }
      */
    },
    dragLeave(ev) {
      console.log("ev", ev);
      /*
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
      */
    },
    dragEnd() {
      this.dragging = -1;
    },
    dragFinish(to, ev) {
      console.log("to", to, "ev", ev);
      this.moveItem(this.dragging, to);
      ev.target.style.marginTop = "2px";
      ev.target.style.marginBottom = "2px";
      this.actionPerformed = "drop";
      this.oldIndex = this.dragging;
      this.newIndex = to;
      this.indexTrack.unshift({
        oldIndex: this.dragging,
        newIndex: to,
      });
    },
    moveItem(from, to) {
      console.log("from", from, "to", to);
      if (to === -1) {
        this.removeChannelAt(from);
      } else {
        this.channelsData.splice(to, 0, this.channelsData.splice(from, 1)[0]);
      }
    },
    updateChannels(updatedChannels) {
       console.log('val', updatedChannels)
       this.channels = updatedChannels
    },
    saveChanges() {
      this.$store.commit("updateChannels", this.channelsData);
      //depending on Lennart's question comment or leave this
      this.indexTrack = [];
      this.removedItems = [];
    },
    cancelChanges() {
      let currentRecord = [...this.channelsData];
      // if (this.actionPerformed === "drop") {
      if (this.removedItems.length) {
        this.removedItems.map((item) => {
          currentRecord.splice(item.index, 0, item);
        });
        this.removedItems = [];
      }

      console.log("here");
      if (this.indexTrack.length) {
        this.indexTrack.map((item) => {
          console.log("item", item);
          currentRecord.splice(
            item.oldIndex,
            0,
            currentRecord.splice(item.newIndex, 1)[0]
          );
        });
        this.indexTrack = [];
      }
      // }

      // this.channels = currentRecord
      console.log("currentRecord", currentRecord);
      this.$store.commit("updateChannels", currentRecord);
    },
  },
  computed: {
    isDragging() {
      return this.dragging > -1;
    },
    channelsData() {
      return this.$store.getters.fetchChannels;
    },
  },
  // watch channels change for localStorage persistence
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

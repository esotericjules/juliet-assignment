<template>
  <div>
    <draggable
      v-model="channelsData"
      handle=".dragHandle"
      ghost-class="ghost"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" name="slide">
        <div
          v-for="(channel, idx) in channelsData"
          :key="channel.id"
          :class="`flex items-center w-full pb-3 last:border-pb-0`"
        >
          <span draggable="true" class="px-3 text-gray-300 cursor-move dragHandle">
            <font-awesome-icon icon="grip-vertical" />
          </span>
          <span class="px-3 py-2 flex-wrap bg-gray-50 rounded-md text-xl">
            <font-awesome-icon
              v-if="channel.type === 'brand'"
              :icon="['fab', channel.icon]"
              class="icon alt"
            />
            <font-awesome-icon
              v-if="channel.type === 'phone'"
              :icon="`${channel.icon}`"
              rotation="90"
            />
            <font-awesome-icon
              v-if="channel.type !== 'phone'"
              :icon="`${channel.icon}`"
            />
          </span>
          <span class="pl-3 pr-24 font-inter font-medium">{{
            channel.name
          }}</span>
          <span class="ml-auto text-gray-400 font-inter font-semibold">
            <button
              class="font-semibold"
              @click="$emit('remove-channel', channel.id, idx)"
            >
              Remove
            </button>
          </span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ChannelItem",
  components: {
    draggable,
  },
  props: {
    channels: {
      type: Array,
      default: () => [],
    }
  },
    computed: {
      channelsData: {
        get() {
          return this.channels;
        },
        set(updatedChannels) {
          this.$emit("update-channels", updatedChannels);
        },
      },
    },
};
</script>

<style scoped>
.slide-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: transparent;
  box-shadow: 10px 10px 5px -1px rgb(0, 0, 0, 0.14);
}
</style>

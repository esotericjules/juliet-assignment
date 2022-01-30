<template>
  <div class="overflow-auto max-h-80 pr-6">
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
          :class="`channel-item`"
        >
          <span draggable="true" class="dragHandle">
            <font-awesome-icon icon="grip-vertical" />
          </span>
          <span class="icon-wrapper">
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
          <span class="remove-wrapper">
            <button
              class="font-semibold outline-none border-none"
              data-cy="remove-btn"
              @click="$emit('remove-channel', idx)"
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
      required: true
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
.channel-item {
  @apply flex items-center w-full pb-3
}
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
.remove-wrapper {
  @apply ml-auto text-trengoGray300 font-inter font-semibold
}
.icon-wrapper {
  @apply px-3 py-2 flex-wrap bg-gray-50 text-galaxy800 rounded-md text-xl
}
.dragHandle {
  @apply px-3 text-trengoGray400 cursor-move
}
</style>

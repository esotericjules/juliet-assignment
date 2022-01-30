import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    channels: [
      {
        id: 1,
        name: "Team@trengo.com",
        type: "phone",
        icon: "phone",
      },
      {
        id: 2,
        name: "Call center",
        type: "phone",
        icon: "phone",
      },
      {
        id: 3,
        name: "Whatsapp business",
        type: "brand",
        icon: "whatsapp",
      },
      {
        id: 4,
        name: "(test) development California",
        type: "envelope",
        icon: "envelope",
      },
      {
        id: 5,
        name: "Whatsapp Business Iceland.com",
        type: "brand",
        icon: "whatsapp",
      },
    ],
  },
  mutations: {
    updateChannels(state, newChannel) {
      state.channels = [...newChannel];
    },
  },
  getters: {
    fetchChannels: (state) => {
      return state.channels;
    },
  },
});

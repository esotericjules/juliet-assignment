import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faWhatsapp,
  faFacebookMessenger,
  faInstagram,
  faTelegram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faGripVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faWhatsapp,
  faFacebookMessenger,
  faInstagram,
  faTelegram,
  faSnapchat,
  faPhone,
  faEnvelope,
  faGripVertical,
  faSearch
);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);

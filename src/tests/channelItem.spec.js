import { mount } from "@cypress/vue";
import ChannelItem from "../components/view/ChannelItem";

const createCmp = (propsData) => mount(ChannelItem, { propsData });

describe("Props", () => {
  context("Prop Validations", () => {
    let channels;
    let channelArr = [];

    beforeEach(() => {
      createCmp().then(() => {
        channels = Cypress.vue.$options.props.channels;
      });
    });

    it("channels is of type array", () => {
      expect(channels.type).to.equal(Array);
    });

    it("channels is required", () => {
      expect(channels.required).to.be.true;
    });

    it("the default channels value is an empty array", () => {
      createCmp({ channels: channelArr });
      cy.wrap(Cypress).its("vue.channels").should("equal", channelArr);
    });
  });

  context("Remove Button", () => {
      it('will emit a click event', () => {
        createCmp({ channels: [{
            id: 1,
            name: "Team@trengo.com",
            type: "phone",
            icon: "phone",
          },] });
        cy.get("[data-cy=remove-btn]").trigger("click");
      })
  })
});

import { mount } from "@cypress/vue";
import PageTitle from "../components/ui/PageTitle";

const createCmp = (propsData) => mount(PageTitle, { propsData });

describe("PageTitle", () => {
  context("Props", () => {
    it("Has a title props", () => {
      createCmp({ text: "Channels" });
      cy.wrap(Cypress).its("vue.text").should("equal", "Channels");
    });

    it("the default text value is an empty string", () => {
      createCmp({ text: "" });
      cy.wrap(Cypress).its("vue.text").should("equal", "");
    });
  });

  context("Validation", () => {
    let text;

    beforeEach(() => {
      createCmp().then(() => {
        text = Cypress.vue.$options.props.text;
      });
    });

    it("text is of type string", () => {
      expect(text.type).to.equal(String);
    });

    it("text is required", () => {
      expect(text.required).to.be.true;
    });
  });
});

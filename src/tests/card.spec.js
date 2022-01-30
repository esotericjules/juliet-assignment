import { mount } from "@cypress/vue";
import Card from "../components/ui/Card";

describe("Slot Rendering", () => {
  it("renders slots", () => {
    mount(Card, {
      slots: {
        default: "<div>Some elements</div>",
      },
    });
    cy.contains("div", "Some elements");
  });
});

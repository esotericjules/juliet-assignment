import { mount } from "@cypress/vue";
import ChannelButton from "../components/ui/Button";

describe("Button", () => {
  context("Rendering", () => {
    it("renders slots", () => {
      mount(ChannelButton, {
        slots: {
          default: "Cancel",
        },
      });
      cy.contains("Cancel");
    });

    it("renders nothing", () => {
      mount(ChannelButton);
      cy.get("button").should("have.text", "");
    });
  });

  context("Events", () => {
    it("will emit a click event", () => {
      mount(ChannelButton);
      cy.get("button").trigger("click");
    });
  });
});

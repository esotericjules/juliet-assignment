import { mount } from "@cypress/vue";
import SearchBar from "../components/ui/SearchBar";

describe("SearchBar", () => {
  context("Rendering", () => {
    it("renders the search form", () => {
      mount(SearchBar);
      cy.get("[data-cy=search-form]").should("exist");
    });

    it("User can see search input", () => {
      mount(SearchBar);
      cy.get("[data-cy=search-input]").should("be.visible");
    });

    it("Initial value of input field is an empty string", () => {
      mount(SearchBar);
      cy.get("[data-cy=search-input]").should("contain.value", "");
    });
  });

  context("Events", () => {
    it("will emit an input event", () => {
      mount(SearchBar);
      cy.get("[data-cy=search-input]").trigger("input");
    });

    it("will emit a keydown event", () => {
      mount(SearchBar);
      cy.get("[data-cy=search-input]").trigger("keydown");
    });

    it("user can enter an input value", () => {
      mount(SearchBar);
      cy.get("[data-cy=search-input]").type("new channel");
    });
  });
});

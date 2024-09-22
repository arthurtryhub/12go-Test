/// <reference types="cypress" />

const LandingPage = require("../../page-objects/landingPage");
const SearchPanel = require("../../page-objects/searchPanel");

describe("12go Asia, search Panhel spec", () => {
  beforeEach("Open landing page", () => {
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Validate Seach exist", () => {
    SearchPanel.checkSearchPanelExist();
  });

  it("Select Directions Check swap Button", () => {
    const from = "Bangkok";
    const to = "Phuket";
    SearchPanel.selectDirection(from, to);
    SearchPanel.validateAndSwapDirections(from, to);
  });

  it("Check hints & search by typing", () => {
    const from = "Bangkok";
    const to = "Phuket";
    const typeFrom = "Singapore";
    const typeTo = "Bangkok";

    SearchPanel.selectDirection(from, to);
    SearchPanel.openDepartureRecord();
    SearchPanel.validateHintAndTypeSearch(from, typeFrom);
    SearchPanel.validateSearchByName(typeFrom);
    SearchPanel.selectAndValidateFirstValueFromTheList(typeFrom);
    SearchPanel.validateHintAndTypeSearch(to, typeTo);
    SearchPanel.selectAndValidateFirstValueFromTheList(typeTo);
    SearchPanel.validateDirection(typeFrom, typeTo);
  });
});

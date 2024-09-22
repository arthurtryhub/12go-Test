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
    const departure = "Bangkok";
    const destination = "Phuket";
    SearchPanel.selectDirection(departure, destination);
    SearchPanel.validateAndSwapDirections(departure, destination);
  });

  it("Check hints & search by typing", () => {
    const departure = "Bangkok";
    const destination = "Phuket";
    const typeFrom = "Singapore";
    const typeTo = "Bangkok";

    SearchPanel.selectDirection(departure, destination);
    SearchPanel.openDepartureRecord();
    SearchPanel.validateHintAndTypeSearch(departure, typeFrom);
    SearchPanel.validateSearchByName(typeFrom);
    SearchPanel.selectAndValidateFirstValueFromTheList(typeFrom);
    SearchPanel.validateHintAndTypeSearch(destination, typeTo);
    SearchPanel.selectAndValidateFirstValueFromTheList(typeTo);
    SearchPanel.validateDirection(typeFrom, typeTo);
  });
});

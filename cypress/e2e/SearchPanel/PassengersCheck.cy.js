/// <reference types="cypress" />

const LandingPage = require("../../page-objects/landingPage");
const SearchPanel = require("../../page-objects/searchPanel");

describe("Check Passengers form", () => {
  beforeEach("Open landing page", () => {
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Validate Default Passengers Form", () => {
    SearchPanel.validatePassengerQuantity(2);
    SearchPanel.openPassengerForm();
    SearchPanel.validateAdultRecord(2, false, false);
    SearchPanel.validateChildrenRecord(0, true, false);
    SearchPanel.validateInfantsRecord(0, true, false);
    SearchPanel.submitPassangersForm();
    SearchPanel.validatePassengerQuantity(2);
  });

  it("Change Passengers quantity increase & decrease ", () => {
    SearchPanel.openPassengerForm();
    SearchPanel.increaseAdultNumber(3);
    SearchPanel.increaseChildrenNumber(5);
    SearchPanel.increaseInfantsNumber(3);

    SearchPanel.validateAdultRecord(5, false, false);
    SearchPanel.validateChildrenRecord(5, false, false);
    SearchPanel.validateInfantsRecord(3, false, false);
    SearchPanel.validatePassengerQuantity(13);
    SearchPanel.submitPassangersForm();

    SearchPanel.openPassengerForm();
    SearchPanel.decreaseAdultNumber(1);
    SearchPanel.decreaseChildrenNumber(2);
    SearchPanel.decreaseInfantsNumber(2);

    SearchPanel.validateAdultRecord(4, false, false);
    SearchPanel.validateChildrenRecord(3, false, false);
    SearchPanel.validateInfantsRecord(1, false, false);
    SearchPanel.validatePassengerQuantity(8);
    SearchPanel.submitPassangersForm();
  });

  it("Change Passengers quantity Min Max values ", () => {
    SearchPanel.openPassengerForm();
    SearchPanel.decreaseAdultNumber(1);
    SearchPanel.validateAdultRecord(1, true, false);
    SearchPanel.validateChildrenRecord(0, true, false);
    SearchPanel.validateInfantsRecord(0, true, false);
    SearchPanel.validatePassengerQuantity(1);
    SearchPanel.submitPassangersForm();
    SearchPanel.validatePassengerQuantity(1);
  });

  it("Check max values Adilt", () => {
    SearchPanel.openPassengerForm();
    SearchPanel.increaseAdultNumber(18);
    SearchPanel.validateAdultRecord(20, false, true);
    SearchPanel.validateChildrenRecord(0, true, true);
    SearchPanel.validateInfantsRecord(0, true, true);
    SearchPanel.submitPassangersForm();
    SearchPanel.validatePassengerQuantity(20);
  });

  it("Check max values child", () => {
    SearchPanel.openPassengerForm();
    SearchPanel.decreaseAdultNumber(1);
    SearchPanel.increaseChildrenNumber(19);
    SearchPanel.validateAdultRecord(1, true, true);
    SearchPanel.validateChildrenRecord(19, false, true);
    SearchPanel.validateInfantsRecord(0, true, true);
    SearchPanel.submitPassangersForm();
    SearchPanel.validatePassengerQuantity(20);
  });

  it("Check max values Infants", () => {
    SearchPanel.openPassengerForm();
    SearchPanel.decreaseAdultNumber(1);
    SearchPanel.increaseInfantsNumber(19);
    SearchPanel.validateAdultRecord(1, true, true);
    SearchPanel.validateChildrenRecord(0, true, true);
    SearchPanel.validateInfantsRecord(19, false, true);
    SearchPanel.submitPassangersForm();
    SearchPanel.validatePassengerQuantity(20);
  });
});

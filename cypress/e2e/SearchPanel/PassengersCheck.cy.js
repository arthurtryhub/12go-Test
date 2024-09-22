/// <reference types="cypress" />

const LandingPage = require("../../page-objects/landingPage");
const PassengersPage = require("../../page-objects/passengersPage");

const adult = 3;
const children = 5;
const Infants = 4;

describe("Check Passengers form", () => {
  beforeEach("Open landing page", () => {
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Validate Default Passengers Form", () => {
    PassengersPage;
    PassengersPage.validatePassengerQuantity(2);
    PassengersPage.openPassengerForm();
    PassengersPage.validateAdultRecord(2, false, false);
    PassengersPage.validateChildrenRecord(0, true, false);
    PassengersPage.validateInfantsRecord(0, true, false);
    PassengersPage.submitPassangersForm();
    PassengersPage.validatePassengerQuantity(2);
  });

  it("Change Passengers quantity increase & decrease ", () => {
    PassengersPage.openPassengerForm();
    PassengersPage.increaseAdultNumber(adult);
    PassengersPage.increaseChildrenNumber(children);
    PassengersPage.increaseInfantsNumber(Infants);

    PassengersPage.validateAdultRecord(adult + 2, false, false);
    PassengersPage.validateChildrenRecord(children, false, false);
    PassengersPage.validateInfantsRecord(Infants, false, false);
    PassengersPage.validatePassengerQuantity(adult + children + Infants + 2);
    PassengersPage.submitPassangersForm();

    PassengersPage.openPassengerForm();
    PassengersPage.decreaseAdultNumber(1);
    PassengersPage.decreaseChildrenNumber(1);
    PassengersPage.decreaseInfantsNumber(1);

    PassengersPage.validateAdultRecord(adult + 1, false, false);
    PassengersPage.validateChildrenRecord(children - 1, false, false);
    PassengersPage.validateInfantsRecord(Infants - 1, false, false);
    PassengersPage.submitPassangersForm();
    PassengersPage.validatePassengerQuantity(adult + children + Infants - 1);
  });

  it("Change Passengers quantity Min Max values ", () => {
    PassengersPage.openPassengerForm();
    PassengersPage.decreaseAdultNumber(1);
    PassengersPage.validateAdultRecord(1, true, false);
    PassengersPage.validateChildrenRecord(0, true, false);
    PassengersPage.validateInfantsRecord(0, true, false);
    PassengersPage.validatePassengerQuantity(1);
    PassengersPage.submitPassangersForm();
    PassengersPage.validatePassengerQuantity(1);
  });

  it("Check max values Adilts", () => {
    PassengersPage.openPassengerForm();
    PassengersPage.increaseAdultNumber(18);
    PassengersPage.validateAdultRecord(20, false, true);
    PassengersPage.validateChildrenRecord(0, true, true);
    PassengersPage.validateInfantsRecord(0, true, true);
    PassengersPage.submitPassangersForm();
    PassengersPage.validatePassengerQuantity(20);
  });

  it("Check max values Childrens", () => {
    PassengersPage.openPassengerForm();
    PassengersPage.decreaseAdultNumber(1);
    PassengersPage.increaseChildrenNumber(19);
    PassengersPage.validateAdultRecord(1, true, true);
    PassengersPage.validateChildrenRecord(19, false, true);
    PassengersPage.validateInfantsRecord(0, true, true);
    PassengersPage.submitPassangersForm();
    PassengersPage.validatePassengerQuantity(20);
  });

  it("Check max values Infants", () => {
    PassengersPage.openPassengerForm();
    PassengersPage.decreaseAdultNumber(1);
    PassengersPage.increaseInfantsNumber(19);
    PassengersPage.validateAdultRecord(1, true, true);
    PassengersPage.validateChildrenRecord(0, true, true);
    PassengersPage.validateInfantsRecord(19, false, true);
    PassengersPage.submitPassangersForm();
    PassengersPage.validatePassengerQuantity(20);
  });
});

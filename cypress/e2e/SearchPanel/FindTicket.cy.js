/// <reference types="cypress" />

const DatePicker = require("../../page-objects/datePicker");
const LandingPage = require("../../page-objects/landingPage");
const PassengersPage = require("../../page-objects/passengersPage");
const SearchPanel = require("../../page-objects/searchPanel");

describe("12go Asia, search Panhel spec", () => {
  beforeEach("Open landing page", () => {
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Select 1 ticket", () => {
    var sec = new Date();
    sec.setDate(sec.getDate() + 10);
    const first = sec.toISOString().slice(0, 10);
    const wday1 = new Date(first).getDay();
    const month1 = new Date(first).getMonth();
    const day1 = new Date(first).getDate();
    const from = "Bangkok";
    const to = "Phuket";

    SearchPanel.selectDirection(from, to);
    DatePicker.openDatePicker();
    DatePicker.selectFirstDate(first);
    DatePicker.selectOneWayBtn();
    DatePicker.validateFirstDate(wday1, month1, day1);
    PassengersPage.validatePassengerQuantity(2);
    PassengersPage.openPassengerForm();
    PassengersPage.validateAdultRecord(2, false, false);
    PassengersPage.validateChildrenRecord(0, true, false);
    PassengersPage.validateInfantsRecord(0, true, false);
    PassengersPage.submitPassangersForm();
    SearchPanel.pressFindTicketsBtn();
  });
});

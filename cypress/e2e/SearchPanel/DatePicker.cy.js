/// <reference types="cypress" />

const DatePicker = require("../../page-objects/datePicker");
const LandingPage = require("../../page-objects/landingPage");
const SearchPanel = require("../../page-objects/searchPanel");

describe("12go Asia, search Panhel spec", () => {
  beforeEach("Open landing page", () => {
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Open Date Picker", () => {
    DatePicker.openDatePicker();
    DatePicker.validateAvailableDays();
  });

  it.only("Select 1 date", () => {
    var first = new Date().toISOString().slice(0, 10);
    var Second = new Date();
    Second.setDate(Second.getDate() + 4);
    Second = Second.toISOString().slice(0, 10);

    const wday1 = first.getDay();
    const month1 = first.getMonth();
    const day1 = first.getDate();

    const wday2 = Second.getDay();
    const month2 = Second.getMonth();
    const day2 = Second.getDate();

    DatePicker.openDatePicker();
    DatePicker.selectFirstDate(first);
    DatePicker.selectOneWayBtn();
    cy.log(first);
    DatePicker.validateFirstDate(wday1, month1, day1);
  });

  it("Select 2 dates", () => {
    DatePicker.openDatePicker();
    DatePicker.selectFirstDate(First);
    DatePicker.selectSeconddate(Second);
    DatePicker.pressDoneBtn();
    DatePicker.validateFirstDate(wday1, month1, day1);
    DatePicker.validateSecondDate(wday2, month2, day2);
  });
});

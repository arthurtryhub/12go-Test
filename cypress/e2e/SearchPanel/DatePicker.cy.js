/// <reference types="cypress" />

const datePicker = require("../../page-objects/datePicker");
const DatePicker = require("../../page-objects/datePicker");
const LandingPage = require("../../page-objects/landingPage");

describe("12go Asia, search Panhel spec", () => {
  beforeEach("Open landing page", () => {
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Open Date Picker & Validate available dates", () => {
    DatePicker.openDatePicker();
    DatePicker.validateAvailableDays();
    datePicker.validateLeftScrollDisabled();
  });

  it("Scroll left Right", () => {
    var sec = new Date();
    sec.setDate(sec.getDate() + 30);
    const first = sec.toISOString().slice(0, 10);
    const wday1 = new Date(first).getDay();
    const month1 = new Date(first).getMonth();
    const day1 = new Date(first).getDate();

    DatePicker.openDatePicker();
    datePicker.scrollRight();
    DatePicker.selectFirstDate(first);
    DatePicker.selectOneWayBtn();
    cy.log(first);
    DatePicker.validateFirstDate(wday1, month1, day1);
  });

  it("Select 1 date", () => {
    var first = new Date().toISOString().slice(0, 10);
    var wday1 = new Date(first).getDay();
    var month1 = new Date(first).getMonth();
    var day1 = new Date(first).getDate();

    DatePicker.openDatePicker();
    DatePicker.selectFirstDate(first);
    DatePicker.selectOneWayBtn();
    DatePicker.validateFirstDate(wday1, month1, day1);
  });

  it("Select 2 dates", () => {
    var first = new Date().toISOString().slice(0, 10);

    var wday1 = new Date(first).getDay();
    var month1 = new Date(first).getMonth();
    var day1 = new Date(first).getDate();

    var sec = new Date();
    sec.setDate(sec.getDate() + 4);
    const second = sec.toISOString().slice(0, 10);

    const wday2 = new Date(second).getDay();
    const month2 = new Date(second).getMonth();
    const day2 = new Date(second).getDate();

    DatePicker.openDatePicker();
    DatePicker.selectFirstDate(first);
    DatePicker.selectSecondDate(second);
    DatePicker.pressDoneBtn();
    DatePicker.validateFirstDate(wday1, month1, day1);
    DatePicker.validateSecondDate(wday2, month2, day2);
  });
});

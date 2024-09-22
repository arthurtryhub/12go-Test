const e = {
  searchForm: '[data-qa="search-form"]',

  pickDataStart: '[data-qa="datepicker-button"]',
  pickDateRange: '[data-qa="datepicker-button-range"]',

  date1Input: '[data-qa="datepicker-input"]',
  date2Input: '[data-qa="datepicker-input-range"]',

  calendar: '[data-qa="datepicker-calendar"]',
  oneWayBtn: '[data-qa="datepicker-clear-button"]',
  doneBtn: '[data-qa="datepicker-done-button"]',
};

var today = new Date().toISOString().slice(0, 10);
var t = new Date();
var y = new Date();

t.setDate(t.getDate() + 1);
const tomorrow = t.toISOString().slice(0, 10);

y.setDate(y.getDate() - 1);
const yesterday = y.toISOString().slice(0, 10);

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class datePicker {
  //check search panel exist
  openDatePicker() {
    cy.get(e.pickDataStart).click();
  }

  validateAvailableDays() {
    cy.get(e.calendar)
      .find(`[data-qa="day(${yesterday})"]`)
      .should("have.class", "btn calendar-day disabled");
    cy.get(e.calendar).find(`[data-qa="day(${today})"]`).should("have.class", "btn calendar-day");
    cy.get(e.calendar)
      .find(`[data-qa="day(${tomorrow})"]`)
      .should("have.class", "btn calendar-day");
  }

  selectFirstDate(firstDate) {
    cy.get(e.date1Input).click();
    cy.get(e.calendar).find(`[data-qa="day(${firstDate})"]`).click();
  }

  selectSeconddate(secondDate) {
    cy.get(e.date2Input).click();
    cy.get(e.calendar).find(`[data-qa="day(${secondDate})"]`).click();
  }

  selectOneWayBtn() {
    cy.get(e.oneWayBtn).click();
  }

  pressDoneBtn() {
    cy.get(e.doneBtn).click();
  }

  validateFirstDate(weakDay, mth, day) {
    cy.get(e.date1Input)
      .should("contain.text", wdays[weakDay])
      .and("contain.text", months[mth])
      .and("contain.text", day);
  }

  validateSecondDate(weakDay, mth, day) {
    cy.get(e.date1Input)
      .should("contain.text", wdays[weakDay])
      .and("contain.text", months[mth])
      .and("contain.text", day);
  }
}

module.exports = new datePicker();

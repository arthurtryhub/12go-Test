/// <reference types="cypress" />

const CheckoutPage = require("../../page-objects/checkoutPage");
const ConfirmationPage = require("../../page-objects/confirmationPage");
const DatePicker = require("../../page-objects/datePicker");
const LandingPage = require("../../page-objects/landingPage");
const PassengersInfoPage = require("../../page-objects/passengersInfoPage");
const PassengersSearchPanel = require("../../page-objects/passengersSearchPanel");
const PaymentPage = require("../../page-objects/paymentPage");
const SearchPanel = require("../../page-objects/searchPanel");
const TicketsPage = require("../../page-objects/ticketsPage");

describe("12go Asia, search Panhel spec", () => {
  beforeEach("Open landing page", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.clearAllCookies();
    LandingPage.open();
  });

  it("Select 1 ticket", () => {
    var sec = new Date();
    sec.setDate(sec.getDate() + 17);
    const first = sec.toISOString().slice(0, 10);
    const wday1 = new Date(first).getDay();
    const month1 = new Date(first).getMonth();
    const day1 = new Date(first).getDate();
    const departure = "Kanchanaburi";
    const destination = "Bangkok";

    let pas1 = {
      index: 0,
      firstName: "somenameasdasd",
      lastName: "lastnamesadad",
    };
    let cotactDetails = {
      phoneCode: "AL",
      phone: 123235,
      email: "asdfasdfasdf@gmail.com",
    };
    const card = {
      cardNumber: 4242424242424242,
      cardName: "StripeTest",
      expDate: 2525,
      cvv: 123,
    };

    SearchPanel.selectDirection(departure, destination);
    DatePicker.openDatePicker();
    DatePicker.selectFirstDate(first);
    DatePicker.selectOneWayBtn();
    DatePicker.validateFirstDate(wday1, month1, day1);

    PassengersSearchPanel.openPassengerForm();
    PassengersSearchPanel.decreaseAdultNumber(1);
    PassengersSearchPanel.validateAdultRecord(1, true, false);
    PassengersSearchPanel.submitPassangersForm();
    PassengersSearchPanel.validatePassengerQuantity(1);

    SearchPanel.pressFindTicketsBtn();

    //Check tickets
    TicketsPage.validateSelectedDate(wday1, month1, day1);
    TicketsPage.validateFirstTicket(departure, destination);
    TicketsPage.buyFirstTicke();

    //Check checkout page info
    CheckoutPage.validateFirstTicket(departure, destination, wday1, month1, day1);
    CheckoutPage.pressNextBtn();

    PassengersInfoPage.setPhone(cotactDetails.phoneCode, cotactDetails.phone);
    PassengersInfoPage.setEmail(cotactDetails.email);
    PassengersInfoPage.fillPassengerCard(pas1.index, pas1.firstName, pas1.lastName, pas1.pasport);
    PassengersInfoPage.pressNextStepBtn();

    // Need some information when this page appear
    // ConfirmationPage.validatePersonalInfo(pas1.firstName, pas1.lastName);
    // ConfirmationPage.validateTripInfo(wday1, month1, day1, departure, destination);
    // ConfirmationPage.pressNextStepBtn();

    PaymentPage.setCVV(card.cvv);
    PaymentPage.setNameOnCard(pas1.firstName);
    PaymentPage.setExpireDate(card.expDate);
    PaymentPage.setCardNumber(card.cardNumber);
  });
});

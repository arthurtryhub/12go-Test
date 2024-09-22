const e = {
  passengersInfo: '[data-qa="passengers"]',
  tripInfo: '[data-qa="trips"]',
  nextStepBtn: '[data-qa="checkout-next-step-button"]',
};

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class confirmationPage {
  validatePersonalInfo(firstName, lastName) {
    cy.get(e.passengersInfo).should("contain.text", firstName).and("contain.text", lastName);
  }

  validateTripInfo(weakDay, mth, day, departure, destination) {
    cy.get(e.tripInfo)
      .should("contain.text", wdays[weakDay])
      .and("contain.text", months[mth])
      .and("contain.text", day)
      .and("contain.text", departure)
      .and("contain.text", destination);
    cy.get('[class="loader-content"]').should("not.exist", { wait: 2000 });
  }

  validateTripInfo(weakDay, mth, day, departure, destination) {
    cy.get(e.tripInfo)
      .should("contain.text", wdays[weakDay])
      .and("contain.text", months[mth])
      .and("contain.text", day)
      .and("contain.text", departure)
      .and("contain.text", destination);
    cy.get('[class="loader-content"]').should("not.exist", { wait: 2000 });
  }

  pressNextStepBtn() {
    cy.get(e.nextStepBtn).click();
    cy.get('[class="loader-content"]').should("not.exist", { wait: 2000 });
  }
}

module.exports = new confirmationPage();

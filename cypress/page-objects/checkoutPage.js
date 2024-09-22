const e = {
  checkoutScreen: '[class="card page-checkout-screen-itinerary-trip"]',
  gridTitle: '[class="h5-title page-checkout-screen-itinerary-trip-title"]',
  nextStepBtn: '[data-qa="checkout-next-step-button"]',
};

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class checkoutPage {
  validateFirstTicket(departure, destination, weakDay, mth, day) {
    cy.get(e.checkoutScreen)
      .find(e.gridTitle)
      .should("contain.text", wdays[weakDay])
      .and("contain.text", months[mth])
      .and("contain.text", day);
    cy.get(e.checkoutScreen)
      .find('[class*="trip-points-line-desc one-line"]')
      .eq(0)
      .should("contain.text", departure);
    cy.get(e.checkoutScreen)
      .find('[class*="trip-points-line-desc one-line"]')
      .eq(1)
      .should("contain.text", destination);
  }

  pressNextBtn() {
    cy.get(e.nextStepBtn).click();
    cy.get('[class="loader-content"]').should("not.exist", { wait: 2000 });
  }
}

module.exports = new checkoutPage();

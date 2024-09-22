const e = {
  contactDetails: '[class="block contact_details"]',
  phoneCode: '[data-qa="phone-with-code-select"]',
  phoneInput: '[data-qa="phone-with-code-input"]',
  emailInout: '[inputmode="email"]',

  tripsDetails: '[class*="block trips_details"]',
  pTime: '[data-qa="select-input-inner"]',

  nextStepBtn: '[data-qa="checkout-next-step-button"]',
};

class passengersPage {
  //Validate Adult record
  setPhone(phcode, phone) {
    cy.get(e.contactDetails).find(e.phoneCode).select(phcode);
    cy.get(e.phoneInput).type(phone);
  }
  setEmail(email) {
    cy.get(e.emailInout).type(email);
  }

  // fill one PassengerCard numeration started from 0
  fillPassengerCard(passengerIndex, firstName, lastName) {
    cy.get('[class="passenger-selector"]')
      .eq(passengerIndex)
      .parents('[data-qa="card"]')
      .find('[type="input"]')
      .eq(0)
      .type(firstName);
    cy.get('[class="passenger-selector"]')
      .eq(passengerIndex)
      .parents('[data-qa="card"]')
      .find('[type="input"]')
      .eq(1)
      .type(lastName);
  }

  pressNextStepBtn() {
    cy.get(e.nextStepBtn).click();
  }
}
module.exports = new passengersPage();

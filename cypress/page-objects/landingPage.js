class landingPage {
  open() {
    cy.intercept("/g/*").as("getAnalytic");
    cy.visit("");
    cy.get(".loader").should("not.exist");
    cy.wait("@getAnalytic");
  }
}

module.exports = new landingPage();

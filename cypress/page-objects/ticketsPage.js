const e = {
  searchForm: '[data-qa="search-form"]',
  recomendedBlock: '[class="recommended-list"]',
  gridView: '[class="transition-item"]',
  selectedDate: '[class="search-results-dates-date active"]',
  submitBtn: '[type="submit"]',
};

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class ticketsPage {
  validateSelectedDate(weakDay, mth, day) {
    cy.get(e.selectedDate)
      .should("contain.text", wdays[weakDay])
      .and("contain.text", months[mth])
      .and("contain.text", day);
  }

  validateFirstTicket(departure, destination) {
    cy.get(e.recomendedBlock)
      .find(e.gridView)
      .eq(0)
      .find('[class="one-line"]')
      .eq(0)
      .should("contain.text", departure);
    cy.get(e.recomendedBlock)
      .find(e.gridView)
      .eq(0)
      .find('[class="one-line"]')
      .eq(1)
      .should("contain.text", destination);
  }

  buyFirstTicke() {
    cy.get(e.recomendedBlock).find(e.gridView).eq(0).find(e.submitBtn).click();
    cy.get('[class="loader-content"]').should("not.exist", { wait: 2000 });
  }
}

module.exports = new ticketsPage();

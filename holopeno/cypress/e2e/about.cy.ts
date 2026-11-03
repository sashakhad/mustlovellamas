describe('about', () => {
  it('explains the blog', () => {
    cy.visit('/about');
    cy.contains('a jalapeño, rendered in light.');
    cy.contains('← back to posts').click();
    cy.location('pathname').should('eq', '/');
  });
});

describe('about', () => {
  it('explains the blog', () => {
    cy.visit('/about');
    cy.contains('Must Love LLaMas is my tech blog');
    cy.contains('Back to posts').click();
    cy.location('pathname').should('eq', '/');
  });
});

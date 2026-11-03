describe('home', () => {
  it('shows the lowercase wordmark and opens the intro post', () => {
    cy.visit('/');
    cy.get('header [role="img"]').should('have.attr', 'aria-label', 'holopeño');
    cy.contains('a', 'hello, holopeño').click();
    cy.url().should('include', '/posts/hello-holopeno');
    cy.contains('what to expect');
  });

  it('filters by tag', () => {
    cy.visit('/');
    cy.get('section').contains('button', '#meta').click();
    cy.contains('1 post for');
    cy.contains('hello, holopeño');
  });
});

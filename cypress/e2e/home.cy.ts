describe('home', () => {
  it('lists the intro post and opens it', () => {
    cy.visit('/');
    cy.contains('Must Love LLaMas');
    cy.contains('Hello from Must Love LLaMas').click();
    cy.url().should('include', '/posts/hello-from-must-love-llamas');
    cy.contains('Why MDX');
  });

  it('filters by tag', () => {
    cy.visit('/');
    cy.contains('button', '#mdx').click();
    cy.contains('1 post');
    cy.contains('Hello from Must Love LLaMas');
  });
});

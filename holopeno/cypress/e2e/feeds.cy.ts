describe('feeds', () => {
  it('uses slug-based guids in rss', () => {
    cy.request('/rss.xml')
      .its('body')
      .should('include', '<guid isPermaLink="false">holopeno:post:hello-holopeno</guid>');
  });

  it('serves robots and sitemap', () => {
    cy.request('/robots.txt').its('body').should('include', 'sitemap.xml');
    cy.request('/sitemap.xml').its('body').should('include', '/posts/hello-holopeno');
  });
});

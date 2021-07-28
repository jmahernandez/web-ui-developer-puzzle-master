describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When: I undo the add book action', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should not see the reading list empty', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('.book--content--info').then(books => {
      cy.wrap(books[0]).find('button').click();
      cy.wait(3000);
      cy.get('button').contains('Undo').click();
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="reading-list-container"]').should(
        'contain.text',
        'You haven\'t added any books to your reading list yet.'
      );
    });
  });
});

describe('When: I undo the remove book action', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see the reading list with text', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('.book--content--info').then(books => {
      cy.wrap(books[0]).find('button').click();
      cy.wait(3000);
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="reading-list-container"]').find('.mat-warn').first().click();
      cy.get('button').contains('Undo').click();
      cy.get('[data-testing="reading-list-container"]').should(
        'not.contain.text',
        'You haven\'t added any books to your reading list yet.'
      );
    });
  });
});

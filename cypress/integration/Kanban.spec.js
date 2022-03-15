/// <reference types="cypress" />

describe('Kanban', () => {
  before(() => {
    cy.visit('/');
  });

  it('displays 3 columns by default', () => {
    const columnSelector = '[data-cy=column]';
    const headingSelector = '[data-cy=column-heading]';

    cy.get(columnSelector).should('have.length', 3);
    cy.get(headingSelector).contains('Todo');
    cy.get(headingSelector).contains('In Progress');
    cy.get(headingSelector).contains('Done');
  });

  describe('column', () => {
    it('should add a new column', () => {
      const columnName = 'cypress column ❤️‍🔥';
      cy.get('[data-cy="add-column-button"]').click();
      cy.get('[data-cy="column-name-input"]').type(`${columnName}{enter}`);

      cy.get('[data-cy="column-heading"]').should('have.length', 4);
      cy.get('[data-cy="column-heading"]').last().contains(columnName);
      cy.get('[data-cy="column-heading"] span').last().contains(0);
    });

    it('should rename the new column', () => {
      const columnName = 'cypress column ❤️‍🔥';
      cy.get('[data-cy="column-heading"]').last().dblclick();
      cy.get('[data-cy="rename-column-name-input"]').type(` updated{enter}`);

      cy.get('[data-cy="column-heading"]')
        .last()
        .contains(columnName + ' updated');
    });

    it('should delete the new column', () => {
      const columnName = 'cypress column ❤️‍🔥 updated';
      cy.get('[data-cy="column-delete-icon"]').last().trigger('mouseover');
      cy.get('[data-cy="column-delete-icon"]').last().should('have.class', 'hover:fill-red-500');
      cy.get('[data-cy="column-delete-icon"]').last().click();

      cy.get('[data-cy="column-heading"]').should('have.length', 3);
      cy.get('[data-cy="column-heading"]').last().should('not.contain', columnName);
    });
  });

  describe('Task', () => {
    it('should add a new task to first column', () => {
      const taskName = 'cypress task';
      cy.get('[data-cy="add-card-button"]').first().click();
      cy.get('[data-cy="card-name-input"]').first().should('have.focus');
      cy.get('[data-cy="card-name-input"]').first().type(taskName).type('{enter}');

      cy.get('[data-cy="column"]')
        .first()
        .children()
        .last()
        .get('[data-cy="task-value"]')
        .contains(taskName);
    });

    it('should update the new task', () => {
      cy.get(':nth-child(3) > [data-cy="task-card"]  [data-cy="card-rename-button"]').click();
      cy.get(':nth-child(3) > [data-cy="task-card"]  [data-cy="task-name-input"]').should(
        'have.focus'
      );
      cy.get(':nth-child(3) > [data-cy="task-card"]  [data-cy="task-name-input"]')
        .clear()
        .type('have a break and drink water')
        .should('have.value', 'have a break and drink water')
        .type('{enter}');

      cy.get('[data-cy="column"]')
        .first()
        .children()
        .last()
        .get('[data-cy="task-value"]')
        .contains('have a break and drink water');
    });

    it('should remove the new task', () => {
      cy.get(':nth-child(3) > [data-cy="task-card"]  [data-cy="card-remove-button"]').click();
      cy.get('[data-cy="column"]').eq(0).find('[data-cy="task-card"]').should('have.length', 2);
    });

    describe('drag and drop', () => {
      const dataTransfer = new DataTransfer();

      it('should drag a task from first column to second column', () => {
        cy.get('[data-cy="task-card"]').eq(0).trigger('dragstart', {
          dataTransfer,
          waitForAnimations: true,
          scrollBehavior: 'center'
        });
        cy.get('[data-cy="column"]').eq(1).trigger('drop', { dataTransfer });

        cy.get('[data-cy="column"]').eq(0).find('[data-cy="task-card"]').should('have.length', 1);
        cy.get('[data-cy="column"]').eq(1).find('[data-cy="task-card"]').should('have.length', 2);
      });

      it('should lock the first task and make it non dragable', () => {
        cy.get('[data-cy="task-card"]')
          .first()
          .find('[data-cy="card-lock-button"]')
          .should('exist');

        cy.get('[data-cy="task-card"]').first().find('[data-cy="card-lock-button"]').click();
      });
      it('should unlock the first task and make it dragable', () => {
        cy.get('[data-cy="task-card"]')
          .first()
          .find('[data-cy="card-unlock-button"]')
          .should('exist');

        cy.get('[data-cy="task-card"]').first().find('[data-cy="card-unlock-button"]').click();
        cy.get('[data-cy="task-card"]')
          .first()
          .find('[data-cy="card-lock-button"]')
          .should('exist');
      });
    });
  });
});

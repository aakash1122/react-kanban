export function drag(dragSelector, dropSelector) {
  // Based on this answer: https://stackoverflow.com/a/55436989/3694288
  cy.get(dragSelector).should('exist').get(dropSelector).should('exist');

  const draggable = Cypress.$(dragSelector)[0]; // Pick up this
  const droppable = Cypress.$(dropSelector)[0]; // Drop over this

  const coords = droppable.getBoundingClientRect();
  draggable.dispatchEvent(new MouseEvent('mousedown'));
  draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
  draggable.dispatchEvent(
    new MouseEvent('mousemove', {
      clientX: coords.x + 10,
      clientY: coords.y + 10 // A few extra pixels to get the ordering right
    })
  );
  draggable.dispatchEvent(new MouseEvent('mouseup'));
  return cy.get(dropSelector);
}

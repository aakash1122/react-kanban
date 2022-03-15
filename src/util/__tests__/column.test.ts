import { createColumn } from '../column';

test('should return a column object', async () => {
  const name = 'Hi there ❤️‍🔥';
  const output = createColumn(name);

  expect(output).toHaveProperty('name');
  expect(output).toHaveProperty('tasks');
  expect(Object.keys(output).length).toBe(2);
  expect(output.name).toBe(name);
  expect(output.tasks.length).toBe(0);
  expect(output.tasks).toEqual([]);
});

import { TaskList } from '../../contexts/KanbanContext';
import { createCard, createTaskJsonDto, removeTasksById } from '../task';

test('should return a task object', async () => {
  const taskName = 'new task';
  const returnedTask = createCard(taskName);

  expect(returnedTask).toBeTruthy();
  expect(returnedTask).toHaveProperty('id');
  expect(returnedTask).toHaveProperty('locked');
  expect(returnedTask).toHaveProperty('value');
  expect(returnedTask).toMatchObject({ locked: false, value: taskName });
});

test('should return a json of taskKey and columnKey', async () => {
  const taskKey = '123';
  const columnKey = 'abcd';
  const output = createTaskJsonDto(taskKey, columnKey);

  expect(output).toBe(JSON.stringify({ taskKey, columnKey }));
});

describe('test removeTaskById', () => {
  const tasks: TaskList = {
    ab: {
      id: '12',
      locked: false,
      value: 'task 1'
    },
    abc: {
      id: '123',
      locked: true,
      value: 'task 2'
    },
    abcd: {
      id: '1234',
      locked: false,
      value: 'task 3'
    }
  };

  test('should delete single task and return a new tasklist', async () => {
    const taskToRemove = ['ab'];
    const output = removeTasksById(tasks, taskToRemove);
    const outputObjectKeys = Object.keys(output);

    expect(outputObjectKeys.length).toBe(2);
    expect(outputObjectKeys.includes('ab')).toBe(false);
  });

  test('should delete 2 task task and return a tasklist with single task', async () => {
    const taskToRemove = ['abc', 'abcd'];
    const output = removeTasksById(tasks, taskToRemove);
    const outputObjectKeys = Object.keys(output);

    expect(outputObjectKeys.length).toBe(1);
    expect(outputObjectKeys.includes('ab')).toBe(true);
    expect(output).toEqual({
      ab: {
        id: '12',
        locked: false,
        value: 'task 1'
      }
    });
  });

  test('should not delete and return current list', async () => {
    const output = removeTasksById(tasks, ['xyz']);
    const outputObjectKeys = Object.keys(output);
    const inputObjectKeys = Object.keys(tasks);

    expect(outputObjectKeys.length).toBe(inputObjectKeys.length);
    expect(output).toStrictEqual(tasks);
  });
});

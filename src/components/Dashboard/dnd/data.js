export default {
  tasks: {
    'task-1': {
      id: 'task-1',
      name: 'Clair Burge',
      area: 'San Francisco, CA',
      content: 'I am task 1',
      new: true
    },
    'task-2': {
      id: 'task-2',
      name: 'Christian Bass',
      area: 'Miami, FL',
      content: 'I am task 2'
    },
    'task-3': {
      id: 'task-3',
      name: 'Madge Marshall',
      area: 'Washington, DC',
      content: 'I am task 3',
      new: true
    },
    'task-4': {
      id: 'task-4',
      name: 'Clayton Garrett',
      area: 'Florida, CA',
      content: 'I am task 4'
    },
    'task-5': {
      id: 'task-5',
      name: 'Mattie Reese',
      area: 'Los Angeles, California',
      content: 'I am task 5'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Applied',
      count: 6,
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
    },
    'column-2': {
      id: 'column-2',
      title: 'Shortlisted',
      count: 2,
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
};

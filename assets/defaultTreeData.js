export const defaultTreeData = {
  value: 'Root',
  children: [
    {
      value: 'Task 1',
      type: 'preview',
      completed: false,
      children: [
        {
          value: 'Task 1.1',
          type: 'video',
          completed: false,
          children: []
        },
        {
          value: 'Task 1.2',
          type: 'video',
          completed: false,
          children: []
        }
      ]
    },
    {
      value: 'Task 2',
      type: 'form',
      completed: false,
      children: []
    },
    {
      value: 'Task 3',
      type: 'preview',
      completed: false,
      children: [
        {
          value: 'Task 3.1',
          type: 'article',
          completed: false,
          children: []
        }
      ]
    }
  ]
};
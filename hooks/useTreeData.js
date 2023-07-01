import { useState, useEffect } from 'react';
import useUserTask from './useUserTask';

const useTreeData = () => {
  const defaultData = {
    value: 'Root',
    type: 'root',
    completed: true,
    body: "",
    children: [
      {
        value: 'Task 1',
        type: 'preview',
        completed: false,
        body: "",
        children: [
          {
            value: 'Task 1.1',
            type: 'video',
            completed: false,
            body: "",
            children: []
          },
          {
            value: 'Task 1.2',
            type: 'video',
            completed: false,
            body: "",
            children: []
          }
        ]
      },
      {
        value: 'Task 2',
        type: 'form',
        completed: false,
        body: "",
        children: []
      },
      {
        value: 'Task 3',
        type: 'preview',
        completed: false,
        body: "",
        children: [
          {
            value: 'Task 3.1',
            type: 'article',
            completed: false,
            body: "Article Content...",
            children: []
          }
        ]
      }
    ]
  };

  const [treeData, setTreeData] = useState(() => {
    const initialTreeData = JSON.parse(JSON.stringify(defaultData));
    return initialTreeData;
  });

  const { userTask } = useUserTask();

  const updateNodeCompletion = (targetNode, completed) => {
    const updateNode = (node) => {
      if (node === targetNode) {
        return { ...node, completed };
      }
      if (node.children) {
        return { ...node, children: node.children.map(updateNode) };
      }
      return node;
    };

    setTreeData(prevTreeData => {
      const updatedTreeData = { ...prevTreeData, children: prevTreeData.children.map(updateNode) };
      return updatedTreeData;
    });
  };

  const resetTreeData = () => {
    const initialTreeData = JSON.parse(JSON.stringify(defaultData));
    setTreeData(initialTreeData);
  };

  return { treeData, setTreeData, updateNodeCompletion, resetTreeData };
};

export default useTreeData;

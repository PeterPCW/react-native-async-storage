import { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

import NaryTree from './components/NaryTree';
import NaryTreeSeq from './components/NaryTreeSeq'
import TaskPopUp from './components/TaskPopUp';
import useUserTask from './hooks/useUserTask';
import useTreeData from './hooks/useTreeData';

const App = () => {
  const [showTaskPopUp, setShowTaskPopUp] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const { userTask, addUserTask, deleteUserTask } = useUserTask();
  const { treeData, setTreeData, updateNodeCompletion, resetTreeData } = useTreeData();
  
  const handleStart = () => {
    setShowSequence(true);
  }

  const handleEnd = () => {
    setTreeData(treeData);
    setShowSequence(false);
  }

  const handleAddUserTask = () => {
    setShowTaskPopUp(true);
  };

  const handleSaveUserTask = (taskDescription) => {
    addUserTask(taskDescription);
    setShowTaskPopUp(false);
  };

  const handleDeleteUserTask = () => {
    deleteUserTask();
    setShowTaskPopUp(false);
  };

  const handleReset = () => {
    resetTreeData();
    deleteUserTask();
  };

  useEffect(() => {
    if (treeData) {
      if (userTask) {
        const taskExists = treeData.children.some(child => child.body === userTask.body);
        if (!taskExists) {
          setTreeData(prevTreeData => {
            const updatedTreeData = {
              ...prevTreeData,
              children: [
                ...prevTreeData.children.slice(0, 1),
                userTask,
                ...prevTreeData.children.slice(1)
              ]
            };
            return updatedTreeData;
          });
        }
      } else {
        setTreeData(prevTreeData => {
          const updatedTreeData = {
            ...prevTreeData,
            children: prevTreeData.children.filter(child => child.type !== 'user')
          };
          return updatedTreeData;
        });
      }
    }
  }, [userTask, treeData]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!showSequence ? (
        !showTaskPopUp ? (
          <View>
            {/*<Text>{JSON.stringify(treeData, null, 2)}</Text>*/}
            <NaryTree
              key={userTask?.value}
              treeData={treeData}
            />
            <Button title="Start" onPress={handleStart} />
            <Button title={(userTask ? "Edit User Task" : "Add User Task")} onPress={handleAddUserTask} />
            <Button title="Reset" onPress={handleReset} />
          </View>
        ) : (
          <TaskPopUp
            userTask={userTask}
            onHandleSave={handleSaveUserTask}
            onHandleDelete={handleDeleteUserTask}
          />
        ) 
      ) : ( <NaryTreeSeq
              key={userTask?.value} 
              treeData={treeData}
              updateNodeCompletion={updateNodeCompletion}
              handleEnd={handleEnd}
            />
          )
      }
    </View>
  );
};

export default App;

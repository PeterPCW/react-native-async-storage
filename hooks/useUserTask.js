import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const useUserTask = () => {
  const [userTask, setUserTask] = useState(null);

  useEffect(() => {
    const loadUserTask = async () => {
      try {
        const storedTask = await AsyncStorage.getItem('userTask');
        if (storedTask) {
          setUserTask(JSON.parse(storedTask));
        }
      } catch (error) {
        console.log('Error loading user task:', error);
      }
    };

    loadUserTask();
  }, []);

  const addUserTask = async (taskValue) => {
    const newTask = {
      value: "Special",
      type: 'user',
      completed: false,
      body: taskValue,
      children: [],
    };

    setUserTask(newTask);

    try {
      await AsyncStorage.setItem('userTask', JSON.stringify(newTask));
    } catch (error) {
      console.log('Error saving user task:', error);
    }
  };

  const deleteUserTask = async () => {
    setUserTask(null);

    try {
      await AsyncStorage.removeItem('userTask');
    } catch (error) {
      console.log('Error deleting user task:', error);
    }
  };

  return { userTask, addUserTask, deleteUserTask };
};

export default useUserTask;

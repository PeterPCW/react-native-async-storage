import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default TaskPopUp = ({ userTask, onHandleSave, onHandleDelete }) => {
  const [taskDescription, setTaskDescription] = useState((userTask ? userTask.body : ""));

  const handleSaveUserTask = () => {
    onHandleSave(taskDescription);
  };

  const handleDeleteUserTask = () => {
    onHandleDelete();
  };

  const placeholder = (userTask ? userTask.body : "Enter task description");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <Button title="Save Task" onPress={handleSaveUserTask} disabled={!taskDescription} />
      <Button title="Delete Task" onPress={handleDeleteUserTask} disabled={!taskDescription && !userTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

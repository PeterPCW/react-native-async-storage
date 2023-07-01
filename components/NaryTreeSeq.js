import { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button } from 'react-native';

const NaryTreeSeq = ({ treeData, updateNodeCompletion, handleEnd }) => {
  const getFirstIncompleteNode = (node) => {
    if (node && !node.completed) {
      return node;
    }
    if (node && node.children) {
      for (const child of node.children) {
        const result = getFirstIncompleteNode(child);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const firstIncompleteNode = getFirstIncompleteNode(treeData);

  if (!firstIncompleteNode) {
    handleEnd();
  }

  const TreeNode = ({ node }) => {
    
    const handleContinue = () => {
      updateNodeCompletion(node, true);
    };

    const handleSubmit = () => {
      updateNodeCompletion(node, true);
    };

    if (!node || node !== firstIncompleteNode) {
      return null; // Skip rendering nodes other than the first incomplete one
    }

    if (node.type === 'preview') {
      return (
        <View>
          <Text>{node.value}</Text>
          {node.children.map(childNode => (
            <View key={childNode.value}>
              <Text>{childNode.value}</Text>
            </View>
          ))}
          <Button title="Start" onPress={handleContinue} />
        </View>
      );
    }

    if (node.type === 'user') {
      return (
        <View>
          <Text>{node.value}</Text>
          <Text>{node.body}</Text>
          <Button title="Continue" onPress={handleContinue} />
        </View>
      );
    }
    
    if (node.type === 'video') {
      return (
        <View>
          <Text>{node.value}</Text>
          <Text>Video Player</Text>
          <Button title="Continue" onPress={handleContinue} />
        </View>
      );
    }

    if (node.type === 'form') {
      const [inputValue, setInputValue] = useState('');

      const handleInputChange = text => {
        setInputValue(text);
      };

      return (
        <View>
          <Text>{node.value}</Text>
          <TextInput value={inputValue} onChangeText={handleInputChange} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      );
    }

    if (node.type === 'article') {
      return (
        <View>
          <Text>{node.value}</Text>
          <Text>{node.body}</Text>
          <Image source={require('../assets/snack-icon.png')} />
          <Button title="Done" onPress={handleContinue} />
        </View>
      );
    }

    return (
      <View>
        <Text>{node.value}</Text>
        {node.children && node.children.map(childNode => (
          <TreeNode key={childNode.value} node={childNode} />
        ))}
      </View>
    );
  };

  return (
    <View>
      {/*<Text>{JSON.stringify(treeData, null, 2)}</Text>*/}
      {firstIncompleteNode && (
        <TreeNode key={firstIncompleteNode.value} node={firstIncompleteNode} />
      )}
      <Button title="Exit" onPress={handleEnd} />
    </View>

  );
};

export default NaryTreeSeq;

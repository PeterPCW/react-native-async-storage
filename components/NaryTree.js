import { useState, useEffect } from 'react';
import { View, Text, CheckBox } from 'react-native';

const NaryTree = ({ treeData }) => {

  const TreeNode = ({ node }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'space-between'}}>
        <CheckBox
          style={{ margin: '10px'}}
          value={node.completed}
          disabled={true}
        />
        <Text>{node.value}</Text>
      </View>
    );
  };

  return (
    <View>
      {/*<Text>{JSON.stringify(treeData, null, 2)}</Text>*/}
      {treeData && treeData.children.map((childNode) => {
        if (childNode) {
          return <TreeNode key={childNode.value} node={childNode} />;
        }
        return;
      })}
    </View>

  );
};

export default NaryTree;

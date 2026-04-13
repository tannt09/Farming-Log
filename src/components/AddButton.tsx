import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const AddButton = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={handleSubmit}>
      <Icon name="add" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30, // 👈 tròn
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

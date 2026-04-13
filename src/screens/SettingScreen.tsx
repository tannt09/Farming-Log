import { StyleSheet, View } from 'react-native';
import React from 'react';
import LanguageSwitch from '../components/LanguageSwitch';

const SettingScreen = () => {
  return (
    <View style={styles.main}>
      <LanguageSwitch />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

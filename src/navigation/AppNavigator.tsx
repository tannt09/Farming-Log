import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import LogListScreen from '../screens/LogListScreen';
import LogFormScreen from '../screens/LogFormScreen';
import SettingScreen from '../screens/SettingScreen';
import BottomNavigator from './BottomNavigator';

export type FormProps = NativeStackScreenProps<RootStackParamList, 'Form'>;

export type RootStackParamList = {
  LogList: undefined;
  Form: { id?: string };
  Setting: undefined;
  BottomNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomNavigator">
      <Stack.Screen
        name="LogList"
        component={LogListScreen}
        options={{ title: 'Farming Logs' }}
      />

      <Stack.Screen
        name="Form"
        component={LogFormScreen}
        options={{ title: 'Add / Edit Log' }}
      />

      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: 'Setting' }}
      />
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

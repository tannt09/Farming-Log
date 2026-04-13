import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import LogListScreen from '../screens/LogListScreen';
import LogFormScreen from '../screens/LogFormScreen';

export type Props = NativeStackScreenProps<RootStackParamList, 'LogList'>;

export type RootStackParamList = {
  LogList: undefined;
  Form: { id?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LogList">
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
    </Stack.Navigator>
  );
}
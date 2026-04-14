import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import LogListScreen from '../screens/LogListScreen';
import SettingScreen from '../screens/SettingScreen';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';

export type BottomTabParamList = {
  LogList: undefined;
  Setting: undefined;
};

type RouteType = RouteProp<BottomTabParamList, keyof BottomTabParamList>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon = ({
  route,
  color,
  size,
}: {
  route: RouteType;
  color: string;
  size: number;
}) => {
  let iconName = '';

  if (route.name === 'LogList') {
    iconName = 'home';
  } else if (route.name === 'Setting') {
    iconName = 'settings';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function BottomNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarIcon: ({ color, size }) => getTabBarIcon({ route, color, size }),
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="LogList"
        component={LogListScreen}
        options={{ title: t('farming_logs') }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: t('setting') }}
      />
    </Tab.Navigator>
  );
}

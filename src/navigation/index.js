// src/navigation/index.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import PlanScreen from '../screens/PlanScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home index"
        component={HomeScreen}
      />
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar In" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

function PlanStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Plan" component={PlanScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Statistics') {
            iconName = 'stats-chart';
          } else if (route.name === 'Calendar') {
            iconName = 'calendar';
          } else if (route.name === 'Plan') {
            iconName = 'clipboard';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false // Ocultamos el header del Tab Navigator
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Calendar" component={CalendarStack} />
      <Tab.Screen name="Plan" component={PlanStack} />
    </Tab.Navigator>
  );
}

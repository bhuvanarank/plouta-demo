import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type TabIconProps = {
  color: string;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }: TabIconProps) => <AntDesign name="user" size={24} color={color} />,
          tabBarLabel: 'Account'
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }: TabIconProps) => <AntDesign name="dashboard" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="select-goal"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }: TabIconProps) => <AntDesign name="search1" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

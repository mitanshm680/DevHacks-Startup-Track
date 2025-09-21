import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: '5%',
          right: '5%',
          backgroundColor: '#000000',
          borderRadius: 20,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          paddingHorizontal: 20,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#6ecded',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: 'Sell',
          tabBarIcon: ({ size, color, focused }) => (
            <View
              style={{
                backgroundColor: '#000000',
                borderRadius: 25,
                borderWidth: 3,
                borderColor: '#FFFFFF',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -10,
              }}
            >
              <FontAwesome name="plus" size={28} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="comment" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
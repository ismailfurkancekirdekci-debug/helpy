// App.js
import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EntriesProvider } from './src/context/EntriesContext';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>

      {/* 🟣 HOME SCREEN */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -8,
              }}
            >
              <Image
                source={require('./src/assets/helpy.png')}
                style={{ width: 90, height: 90, marginLeft: -12 }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 44,
                  fontWeight: '900',
                  color: '#7B4DFF',
                  marginLeft: -10,
                  marginTop: 4,
                }}
              >
                Helpy
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('History')}
              style={{ marginRight: 10, marginTop: 40 }}
            >
              <Text
                style={{
                  color: '#7B4DFF',
                  fontWeight: '700',
                  fontSize: 18,
                }}
              >
                Geçmiş
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
            height: 160,
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
      />

      {/* 🟠 HISTORY SCREEN */}
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Haftalık Özet',
          headerStyle: {
            backgroundColor: '#FFE4C4', // turuncu pastel header
            // height'i istersen tekrar eklersin:
            // height: 120,
          },
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: '900',
            color: '#6A3B1A',
          },
        }}
      />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <EntriesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </EntriesProvider>
  );
}

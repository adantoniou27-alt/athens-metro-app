import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import RouteScreen from './src/screens/RouteScreen';
import StationDetailsScreen from './src/screens/StationDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#1E90FF',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Athens Metro' }} />
                    <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Metro Map' }} />
                    <Stack.Screen name="Route" component={RouteScreen} options={{ title: 'Route Planner' }} />
                    <Stack.Screen name="StationDetails" component={StationDetailsScreen} options={{ title: 'Station Details' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
import React from 'react';
import { Animated, Platform, PlatformColor } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';

import { BottomMenu  } from '@components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes(){
    const { COLORS } = useTheme();

    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.SECONDARY_900,
                tabBarInactiveTintColor: COLORS.SECONDARY_400,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle:{
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu title="Pedidos" color={color} />
                    )
                }}
            />

            <Screen 
                name="Orders" 
                component={Orders}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu title="Pedidos" color={color} notifications='5'/>
                    )
                }}
            />
        </Navigator>
    )
}
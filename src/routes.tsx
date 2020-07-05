import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppRoutes } from './app.routes'

import Login from './pages/Login'
import Home from './pages/Home'
import QRCode from './pages/QRCode'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none' screenOptions={ { cardStyle: { backgroundColor: '#f0f0f5' } } }>
                <AppStack.Screen name={ AppRoutes.LOGIN } component={ Login }/>
                <AppStack.Screen name={ AppRoutes.HOME } component={ Home }/>
                <AppStack.Screen name={ AppRoutes.QRCODE } component={ QRCode }/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
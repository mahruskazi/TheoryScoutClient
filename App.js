import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import WelcomeScreen from './src/components/WelcomeScreen'
import Dashboard from './src/components/Dashboard'
import ScoutScreen from './src/components/ScoutScreen'
import MatchesScreen from './src/components/MatchesScreen'
import QrcodeReader from './src/components/qr-code'
import QRcodeGenerator from './src/components/qr-code-generator'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <QrcodeReader />
    );
  }
}

// const DashboardTabNavigator = createBottomTabNavigator({
//   Scout: {
//     screen: ScoutScreen,
//     navigationOptions: {
//       tabBarLabel: 'SCOUT',
//       tabBarIcon: (
//         <Icon name='analytics'/>
//       )
//     }
//   },
//   Matches: {
//     screen: MatchesScreen,
//     navigationOptions: {
//       tabBarLabel: 'MATCHES',
//       tabBarIcon: (
//         <Icon name='eye'/>
//       )
//     }
//   },
// },{
//   defaultNavigationOptions: {
//     tabBarOptions: {
//       activeTintColor: 'orange',
//       activeBackgroundColor: 'blue',
//       labelStyle: {
//         fontSize: 12,
//       },
//       style: {
//       },
//     }
//   }
// })

const DashboardTabNavigator = createMaterialBottomTabNavigator({
      Scout: {
        screen: ScoutScreen,
        navigationOptions: {
          tabBarLabel: 'SCOUT',
          tabBarIcon: (
            <Icon name='aperture' style={{color: 'white'}}/>
          )
        }
      },
      Matches: {
        screen: MatchesScreen,
        navigationOptions: {
          tabBarLabel: 'MATCHES',
          tabBarIcon: (
            <Icon name='eye' style={{color: 'white'}}/>
          )
        }
      },
}, {
  initialRouteName: 'Scout',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  shifting: true,
  barStyle: { backgroundColor: '#292F6D' },
});

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
}, {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerLeft: (
        <Icon name="md-menu" size={30} style={{ marginLeft: 10,}} onPress={() => navigation.openDrawer()}/>
      )
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen
  },
  Dashboard: {
    screen: AppDrawerNavigator
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

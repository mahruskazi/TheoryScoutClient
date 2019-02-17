import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Orientation from 'react-native-orientation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import WelcomeScreen from './src/components/WelcomeScreen'
import Dashboard from './src/components/Dashboard'
import ScoutScreen from './src/components/ScoutScreen'
import MatchesScreen from './src/components/MatchesScreen'
import DataInputScreen from './src/redux/containers/DataInputScreen.container'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }

  componentDidMount() {
    // this locks the view to Portrait Mode
    Orientation.lockToPortrait();

    // this locks the view to Landscape Mode
    //Orientation.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();

    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      console.log("To Landscape")
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
      <AppContainer/>
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
  DashboardTabNavigator: DashboardTabNavigator,
  DataInput: {
    screen: DataInputScreen,
    navigationOptions: {
      header: null
    }
  }
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

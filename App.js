import * as React from 'react';
import {Alert, useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NewPolicy from './screens/NewPolicy';
import Accounts from './screens/Accounts';
import Staff from './screens/Staff';
import Clients from './screens/Clients';
import ViewClient from './screens/ViewClient';
import Dues from './screens/Dues';
import SplashScreen from 'react-native-splash-screen';
import mobileAds from 'react-native-google-mobile-ads';


const Stack = createNativeStackNavigator();

function App() {
  const scheme = useColorScheme();
  
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 200);
    mobileAds()
      .setRequestConfiguration({
        // An array of test device IDs to add to the allow list.
        testDeviceIdentifiers: ['B242AE6AE672718DBA60304AD1A45076', 'EMULATOR'],
      })
      .then(() => {
        mobileAds()
          .initialize()
          .then(adapterStatuses => {
            console.log(adapterStatuses);
          });
      });
  }, []);
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewPolicy" component={NewPolicy} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Dues" component={Dues} />
        <Stack.Screen name="Staff" component={Staff} />
        <Stack.Screen name="Clients" component={Clients} />
        <Stack.Screen name="ViewClient" component={ViewClient} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

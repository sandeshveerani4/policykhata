import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Title = ({children, navigation, back = true, view = '', ...props}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View className="flex flex-row justify-center items-center">
      {back ? (
        <TouchableOpacity
          className="absolute left-0 h-full flex items-center justify-center p-2 px-3"
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            size={30}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
      ) : (
        view
      )}
      <Text className="text-4xl font-medium p-4 text-black dark:text-white text-center">
        {children}
      </Text>
    </View>
  );
};

export const BasicPage = ({children, title, ...props}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = 'bg-white flex-1 dark:bg-black';
  return (
    <SafeAreaView className={backgroundStyle} {...props}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <View className="bg-white flex-1 dark:bg-black">
        <Title {...props}>{title}</Title>
        {children}
      </View>
    </SafeAreaView>
  );
};

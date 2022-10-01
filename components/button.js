import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({children, text, ...props}) => {
  return (
    <TouchableOpacity
      className="p-4 py-3 rounded-3xl m-2 bg-blue-700 "
      {...props}>
      <View className="flex flex-row items-center justify-center">
        {children}
        <Text className="text-lg text-center font-medium text-white">
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

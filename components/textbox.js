import {TextInput} from 'react-native';
import React from 'react';

export default function TextBox({...props}) {
  return (
    <TextInput
      className="bg-neutral-200 dark:bg-white text-black rounded-3xl px-4 text-lg"
      placeholderTextColor={'#888'}

      {...props}
    />
  );
}

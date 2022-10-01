import * as React from 'react';
import {Text} from 'react-native';
import {BasicPage} from '../components/basicpage';

const Staff = ({navigation}) => {
  return (
    <BasicPage title="Staff" navigation={navigation}>
      <Text className="text-center text-black dark:text-white text-2xl font-bold">
        Coming Soon...
      </Text>
    </BasicPage>
  );
};

export default Staff;

import * as React from 'react';
import {Text} from 'react-native';
import {BasicPage} from '../components/basicpage';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {STAFFAD} from '@env';
const Staff = ({navigation}) => {
  const adUnitId = __DEV__ ? TestIds.BANNER : STAFFAD;
  return (
    <BasicPage title="Staff" navigation={navigation}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <Text className="text-center text-black dark:text-white text-2xl font-bold">
        Coming Soon...
      </Text>
    </BasicPage>
  );
};

export default Staff;

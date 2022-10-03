import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {BasicPage} from '../components/basicpage';
import {addListener, getPolicies, searchListener} from '../models/policies';
import TextBox from '../components/textbox';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {CLIENTS_AD} from '@env';

const Clients = ({navigation}) => {
  const [policies, setPolicy] = React.useState([]);
  const adUnitId = __DEV__ ? TestIds.BANNER : CLIENTS_AD;
  React.useEffect(() => addListener(setPolicy), []);
  return (
    <BasicPage title="Clients" navigation={navigation}>
      <TextBox
        placeholder="Search by Name / Policy # / Policy Year"
        className="m-2"
        onChangeText={text => {
          /* const srch = findResults(policies, {
            policyholdername: text,
          }); */
          if (text.trim() != '') {
            setPolicy(searchListener(setPolicy, text));
          } else {
            setPolicy(getPolicies());
          }
        }}
      />
      <FlatList
        data={policies}
        keyExtractor={key => key._id}
        ListHeaderComponent={
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        }
        renderItem={({item, key}) => {
          const paid = Object.values(item['paidarray']).filter(n => n).length;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                navigation.navigate('ViewClient', {
                  data: item,
                  // reload: reFunction,
                });
                /*  deletePolicy(item);
                  setPolicy(init()); */
              }}>
              <View className="border-b border-black dark:border-white rounded-lg m-2 p-2">
                <View className="flex">
                  <Text className="text-black dark:text-white text-xl font-bold">
                    {item['policyholdername']} {item['fatherorhusbandname']}
                  </Text>
                  <View className="flex flex-row">
                    <Text className="text-black font-bold dark:text-white flex-1">
                      <Text className="text-neutral-500 font-regular dark:text-neutral-300">
                        Date of issue:{' '}
                      </Text>
                      {item['dateofissued']
                        ? item['dateofissued']
                            .toDateString()
                            .split(' ')
                            .splice(1)
                            .join(' ')
                        : ''}
                    </Text>
                    <Text className="text-black dark:text-white font-bold">
                      P No # {item['policynumber']}
                    </Text>
                  </View>
                  <View className="flex flex-row ">
                    <View className="basis-1/3 flex justify-center items-center">
                      <Text className="text-black text-xl font-bold dark:text-white">
                        {paid}
                      </Text>
                      <Text className="text-neutral-500 dark:text-neutral-300">
                        Paid
                      </Text>
                    </View>
                    <View className="basis-1/3 flex justify-center items-center">
                      <Text className="text-black text-xl font-bold dark:text-white">
                        {item['policyduration'] - paid}
                      </Text>
                      <Text className="text-neutral-500 dark:text-neutral-300">
                        Due
                      </Text>
                    </View>
                    <View className="basis-1/3 flex justify-center items-center">
                      <Text className="text-black text-xl font-bold dark:text-white">
                        {item['premiumamount']}
                      </Text>
                      <Text className="text-neutral-500 dark:text-neutral-300">
                        Policy Amount
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text className="text-black dark:text-white p-2 text-lg text-center">
            No Entries Found
          </Text>
        }
      />
    </BasicPage>
  );
};

export default Clients;

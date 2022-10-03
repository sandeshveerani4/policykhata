import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {BasicPage} from '../components/basicpage';
import Button from '../components/button';
import {addDueListener, payUpdate} from '../models/policies';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {DUEAD} from '@env';

export default function Dues({navigation}) {
  const adUnitId = __DEV__ ? TestIds.BANNER : DUEAD;
  const [policies, setPolicy] = React.useState([]);
  React.useEffect(() => addDueListener(setPolicy), []);
  const [date, setDate] = useState(new Date());
  const [selectedid, setSid] = useState({});
  const [selINS, setINS] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <BasicPage title="Dues" navigation={navigation}>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          payUpdate(
            selectedid._id,
            selINS,
            date,
            new Date(selectedid.dateofissued),
          );
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <FlatList
        data={policies}
        keyExtractor={key => key._id}
        renderItem={({item, key}) => {
          const installment =
            Object.values(item['paidarray']).filter(n => n).length + 1;

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
                <View className="flex flex-row	">
                  <View className="basis-1/2 flex justify-center">
                    <Text className="text-black dark:text-white text-xl font-bold">
                      {item['policyholdername']} {item['fatherorhusbandname']}
                    </Text>
                    <View>
                      <Text className="mt-2 text-black font-bold dark:text-white flex-1">
                        <Text className="text-neutral-500 font-regular dark:text-neutral-300">
                          Installment #{' '}
                        </Text>
                        {installment}
                      </Text>
                      <Text className="text-black font-bold dark:text-white flex-1">
                        <Text className="text-neutral-500 font-regular dark:text-neutral-300">
                          Due Date:{' '}
                        </Text>
                        {item['nextduedate']
                          ? item['nextduedate']
                              .toDateString()
                              .split(' ')
                              .splice(1)
                              .join(' ')
                          : ''}
                      </Text>
                      <Text className="text-black font-bold dark:text-white flex-1">
                        <Text className="text-neutral-500 font-regular dark:text-neutral-300">
                          Premium Amount:{' '}
                        </Text>
                        {item['premiumamount']}
                      </Text>
                    </View>
                  </View>
                  <View className="basis-1/2">
                    <Button
                      className="mt-5"
                      text="Pay Now"
                      onPress={() => {
                        setSid(item);
                        setINS(installment - 1);
                        setOpen(true);
                      }}></Button>

                    <Button
                      className="bg-green-500 my-0"
                      text="Send SMS"></Button>
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
}

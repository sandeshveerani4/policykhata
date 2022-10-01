import {ScrollView, Text, useColorScheme, View} from 'react-native';
import * as React from 'react';
import {BasicPage} from '../components/basicpage';
import {deletePolicy, getPolicy} from '../models/policies';
import Button from '../components/button';
import {faTrash, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  calculate_age,
  dateFormater,
  sendPaymentSMS,
} from '../models/basicFunctions';
const UniField = ({children, title, gh = false}) => (
  <View className="my-2">
    <Text className="text-lg text-neutral-500 dark:text-neutral-300">
      {title}
    </Text>
    {gh ? (
      <View className="text-4xl font-bold text-black dark:text-white">
        {children}
      </View>
    ) : (
      <Text className="text-4xl font-bold text-black dark:text-white flex justify-center items-center">
        {children}
      </Text>
    )}
  </View>
);

const ViewClient = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {data} = route.params;
  const [details, setDetails] = React.useState(data);
  const reFunction = () => {
    getPolicy(data._id, setDetails);
  };
  const paid = Object.values(details['paidarray']).filter(n => n).length;
  const calc =
    details['dateofissued'] != null
      ? calculate_age(details['dateofissued'], details['dateofbirth'])
      : {finalyear: 0, years: 0, months: 0, days: 0};
  const intDate = new Date(details['dateofissued']);
  return (
    <BasicPage title="View Client" navigation={navigation}>
      <ScrollView>
        <View className="flex flex-row p-2 gap-3">
          <View className="rounded-full flex justify-center items-center border border-black dark:border-white flex-1 py-5">
            <Text className="text-4xl font-bold text-black dark:text-white">
              {paid}
            </Text>
            <Text className="text-lg text-neutral-500 dark:text-neutral-300">
              Paid
            </Text>
          </View>
          <View className="rounded-full flex justify-center items-center border border-black dark:border-white flex-1 py-5">
            <Text className="text-4xl font-bold text-black dark:text-white">
              {details['policyduration'] - paid}
            </Text>
            <Text className="text-lg text-neutral-500 dark:text-neutral-300">
              Due
            </Text>
          </View>
          <View className="rounded-full flex justify-center items-center border border-black dark:border-white flex-1 py-5">
            <Text className="text-4xl font-bold text-black dark:text-white">
              {calc['finalyear']}
            </Text>
            <Text className="text-lg text-neutral-500 dark:text-neutral-300">
              Age
            </Text>
          </View>
        </View>
        <View className="p-3 m-2">
          <UniField title="Policy Number">{details['policynumber']}</UniField>
          <UniField title="Policy Holder Name">
            {details['policyholdername']}
          </UniField>
          <UniField title="Father / Husband Name">
            {details['fatherorhusbandname']}
          </UniField>
          <UniField title="Date of Birth">
            {details['dateofbirth'] != null
              ? details['dateofbirth'].toDateString()
              : 0}
          </UniField>
          <UniField title="Age">
            {calc['years']}
            <Text className="text-blue-400">Y</Text> {calc['months']}
            <Text className="text-blue-400">M</Text> {calc['days']}
            <Text className="text-blue-400">D</Text>
          </UniField>
          <UniField title="Plan">{details['policyplan']}</UniField>
          <UniField title="Premium Amount">{details['premiumamount']}</UniField>
          <UniField title="Sum Assured">{details['sumassured']}</UniField>
          <UniField title="Date of Issue">
            {details['dateofissued']?.toDateString()}
          </UniField>
          <UniField title="Contact #">{details['contactnumber']}</UniField>
          <UniField title="Rider">
            FIB
            {details['fib'] == 'Yes' ? (
              <FontAwesomeIcon
                icon={faCheck}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            )}{' '}
            AIB
            {details['aib'] == 'Yes' ? (
              <FontAwesomeIcon
                icon={faCheck}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            )}{' '}
            ADB
            {details['adb'] == 'Yes' ? (
              <FontAwesomeIcon
                icon={faCheck}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            )}
          </UniField>
          <UniField title="Staff Name">{details['staffname']}</UniField>
          <Text className="text-lg text-black dark:text-neutral-300">
            Payment History
          </Text>
          <View className="p-2 w-full">
            {Array(details['policyduration'])
              .fill()
              .map((_, key) => {
                return (
                  <View className="flex flex-row justify-center items-center p-2">
                    <Text className="text-black dark:text-white w-10 font-bold">
                      {key + 1}.
                    </Text>
                    <Text className="text-black dark:text-white flex-1 text-lg ">
                      Due:{' '}
                      {dateFormater(
                        new Date(
                          intDate.setMonth(
                            intDate.getMonth() + (key == 0 ? 0 : 12),
                          ),
                        ),
                      )}
                      {'\n'}
                      Paid:{' '}
                      {details.paidarray[key]
                        ? typeof details.paidarray[key] == 'string'
                          ? dateFormater(new Date(details.paidarray[key]))
                          : dateFormater(details.paidarray[key])
                        : 'Not Paid'}
                    </Text>
                  </View>
                );
              })}
          </View>
          <Button
            text="Send SMS"
            className="bg-green-500"
            onPress={() => sendPaymentSMS(details)}></Button>
          <Button
            text="Edit"
            onPress={() => {
              let clone = {};
              for (const key in details) {
                clone[key] = details[key];
              }
              navigation.navigate('NewPolicy', {
                data: details,
                reload: reFunction,
              });
            }}></Button>
          <Button
            text="Delete"
            className="bg-red-500"
            onPress={() => {
              deletePolicy(details);
              navigation.goBack();
            }}>
            <View className="absolute left-0">
              <FontAwesomeIcon icon={faTrash} color="white" />
            </View>
          </Button>
        </View>
      </ScrollView>
    </BasicPage>
  );
};

export default ViewClient;

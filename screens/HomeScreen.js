import {
  faDollar,
  faPeopleLine,
  faPlus,
  faUserAstronaut,
  faArrowRotateRight,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {BasicPage} from '../components/basicpage';
import {addCountListener, addSumListener} from '../models/policies';

export const Box = ({children, title, back, box, ...props}) => (
  <View
    className={`${
      box ? 'basis-1/2' : 'flex-1'
    } items-center py-4 ${back} rounded-full`}
    {...props}>
    {box ? (
      <View>{children}</View>
    ) : (
      <Text className="text-2xl text-white font-medium">{children}</Text>
    )}
    {!box ? <Text className="text-xs text-white">{title}</Text> : ''}
  </View>
);

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [male, setMale] = React.useState(0);
  const [female, setFemale] = React.useState(0);
  const [policies, setPolicies] = React.useState(0);
  const [business, setBusiness] = React.useState(0);
  const reload = () => {
    addCountListener(setPolicies, '');
    addCountListener(setMale, 'gender="Male"');
    addCountListener(setFemale, 'gender="Female"');
    addSumListener(setBusiness, 'premiumamount');
  };
  reload();
  return (
    <BasicPage
      title="Dashboard"
      back={false}
      navigation={navigation}
      view={
        <TouchableOpacity
          className="absolute left-0 h-full flex items-center justify-center p-2 px-3"
          onPress={() => {
            reload();
          }}>
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            size={30}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
      }>
      <ScrollView>
        <View className="space-x-2 flex items-center mx-2 mb-2  flex-row flex-nowrap">
          <Box title="Policies" back="bg-violet-500">
            {policies}
          </Box>
          <Box title="Male" back="bg-indigo-500">
            {male}
          </Box>
          <Box title="Female" back="bg-pink-500">
            {female}
          </Box>
        </View>
        <View className="space-x-2 mt-2 flex items-center mb-2 mx-2  flex-row flex-nowrap">
          <Box title="Business" back="bg-green-400">
            {business}
          </Box>
        </View>
        {/* */}
        <View className="mt-10 flex items-center mx-2 flex-row">
          <Box box={true}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Clients')}
              className="flex flex-column justify-center items-center">
              <View className="rounded-full bg-amber-500 p-3 flex items-center">
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  size={50}
                  color={'white'}
                />
              </View>
              <Text className="text-black dark:text-white text-2xl text-center">
                Clients
              </Text>
            </TouchableOpacity>
          </Box>

          <Box box={true}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Dues')}
              className="flex flex-column justify-center items-center">
              <View className="rounded-full bg-red-600 p-3 flex items-center">
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  size={50}
                  color={'white'}
                />
              </View>
              <Text className="text-black dark:text-white text-2xl text-center">
                Dues
              </Text>
            </TouchableOpacity>
          </Box>
        </View>
        <View className="mt-2 mb-20 space-2 flex items-center mx-2 flex-row">
          <Box box={true}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Staff')}
              className="flex flex-column justify-center items-center">
              <View className="rounded-full bg-indigo-600 p-3 flex items-center">
                <FontAwesomeIcon
                  icon={faPeopleLine}
                  size={50}
                  color={'white'}
                />
              </View>
              <Text className="text-black dark:text-white text-2xl text-center">
                Staff
              </Text>
            </TouchableOpacity>
          </Box>
          <Box box={true}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Accounts')}
              className="flex flex-column justify-center items-center">
              <View className="rounded-full bg-emerald-600 p-3 flex items-center">
                <FontAwesomeIcon icon={faDollar} size={50} color={'white'} />
              </View>
              <Text className="text-black dark:text-white text-2xl text-center">
                Accounts
              </Text>
            </TouchableOpacity>
          </Box>
        </View>
      </ScrollView>
      <View className="absolute bottom-2 w-full flex items-center">
        <TouchableOpacity onPress={() => navigation.navigate('NewPolicy')}>
          <View className="flex justify-center items-center flex-row bg-green-300 w-unset rounded-3xl p-2">
            <View className="bg-green-400 rounded-full mr-2 p-1">
              <FontAwesomeIcon icon={faPlus} size={25} />
            </View>
            <Text className="text-black text-lg pr-1 font-medium">
              New Policy
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </BasicPage>
  );
};

export default HomeScreen;
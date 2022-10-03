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
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {BasicPage} from '../components/basicpage';
import {
  addCountListener,
  addSumListener,
  createPolicyinBulk,
} from '../models/policies';
import {
  useInterstitialAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import {HOMESCREEN_AD, INTERAD} from '@env';
import Button from '../components/button';
import {getPolicies} from '../models/policies';
import {DownloadDirectoryPath, writeFile} from 'react-native-fs';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
const adUnitId = __DEV__ ? TestIds.BANNER : HOMESCREEN_AD;
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
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    __DEV__ ? TestIds.INTERSTITIAL : INTERAD,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  const saveFile = async () => {
    const path = `${DownloadDirectoryPath}/PolicyKhataBackup${Date.now()}.backup`;
    console.log(path);
    try {
      await writeFile(path, JSON.stringify(getPolicies()), 'utf8');
      Alert.alert('File saved', 'Data has been saved to: ' + path, [
        {text: 'OK'},
      ]);
    } catch (e) {
      console.log('error', e);
    }
  };
  const [goToScreen, setgts] = React.useState('');
  React.useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);
  React.useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      navigation.navigate(goToScreen);
    }
  }, [isClosed, navigation]);

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
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
        <View className="space-x-2 mt-2 flex items-center mb-2 mx-2  flex-row flex-nowrap">
          <Box title="Business" back="bg-green-400">
            {business}
          </Box>
        </View>
        {/* */}
        <Text className="my-5 text-center">
          Press Top Left Button To Refresh the Stats.
        </Text>
        <View className="flex items-center mx-2 flex-row">
          <Box box={true}>
            <TouchableOpacity
              onPress={() => {
                setgts('Clients');
                isLoaded ? show() : navigation.navigate('Clients');
              }}
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
              onPress={() => {
                setgts('Dues');
                isLoaded ? show() : navigation.navigate('Dues');
              }}
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
        <View className="mt-2 space-2 flex items-center mx-2 flex-row">
          <Box box={true}>
            <TouchableOpacity
              onPress={() => {
                setgts('Staff');
                isLoaded ? show() : navigation.navigate('Staff');
              }}
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
              onPress={() => {
                setgts('Accounts');
                isLoaded ? show() : navigation.navigate('Accounts');
              }}
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
        <Button
          text="Import Data"
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
              });
              console.log(pickerResult);
              const jjdata = await RNFS.readFile(
                pickerResult['fileCopyUri'],
                'utf8',
              );
              createPolicyinBulk(JSON.parse(jjdata));
            } catch (e) {
              !DocumentPicker.isCancel(e) && !isInProgress(e)
                ? Alert.alert(
                    'An Error Occured. Make sure you attach valid backup file.',
                  )
                : '';
            }
          }}
        />
        <Button
          className="mb-20 bg-red-600"
          text="Export Data"
          onPress={saveFile}
        />
      </ScrollView>
      <View className="absolute bottom-2 w-full flex items-center">
        <TouchableOpacity
          onPress={() => {
            setgts('NewPolicy');
            isLoaded ? show() : navigation.navigate('NewPolicy');
          }}>
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

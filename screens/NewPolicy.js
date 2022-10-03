import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import * as React from 'react';

import {BasicPage} from '../components/basicpage';
import DatePicker from 'react-native-date-picker';
import Button from '../components/button';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SelectDropdown from 'react-native-select-dropdown';
import {createNewPolicy, updatePolicy} from '../models/policies';
import TextBox from '../components/textbox';
const fields = [
  'Policy Holder Name',
  'Father or Husband Name',
  'CNIC--numeric',
  'Date of Birth--date',
  'Place of Birth',
  'Gender--list--Male--Female',
  'Contact Number--numeric',
  'WhatsApp Number--numeric',
  // 'Policy Year--numeric',
  'Policy Plan--list--Endowment--Golden Endowment--Shadabad--Jeevan Sathi--Sadabahar--Child Education--Child Protection',
  'Sum Assured--numeric',
  'Premium Amount--numeric',
  'Maturity--numeric',
  'Policy Number',
  'Date of issued--date',
  'Date of Commencement--date',
  'Policy Duration--list--7--10--15--20--25',
  'FIB--list--Yes--No',
  'AIB--list--Yes--No',
  'ADB--list--Yes--No',
  'Nominee',
  'Relation',
  'Nominee CNIC--numeric',
  'Nominee Date of Birth--date',
  'Previous Policy Number',
  'Previous Policy Amount--numeric',
  'Previous Policy Issued Date--date',
  'Table',
  'Term',
  'Mode',
  'Address',
  'Paid Amount--numeric',
  'Compensate Amount--numeric',
  'Staff Name',
];
const NewPolicy = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [udata, setData] = React.useState(
    route.params?.data ? JSON.parse(JSON.stringify(route.params.data)) : {},
  );
  const [date, setDate] = React.useState({
    dateofissued: route.params?.data
      ? route.params.data.dateofissued
      : new Date(),
    dateofbirth: route.params?.data
      ? route.params.data.dateofbirth
      : new Date(),
    dateofcommencement: route.params?.data
      ? route.params.data.dateofcommencement
      : new Date(),
    nomineedateofbirth: route.params?.data
      ? route.params.data.nomineedateofbirth
      : new Date(),
    previouspolicyissueddate: route.params?.data
      ? route.params.data.previouspolicyissueddate
      : new Date(),
  });
  const [open, setOpen] = React.useState({
    dateofissued: false,
    dateofbirth: false,
    dateofcommencement: false,
    nomineedateofbirth: false,
    previouspolicyissueddate: false,
  });
  const [submit, setSubmit] = React.useState(false);
  const emptyObj = num => {
    const anobj = {};
    for (const x of Array(num).keys()) {
      anobj[x] = null;
    }
    return anobj;
  };
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!Object.keys(udata).length) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, udata],
  );
  const submitUdata = (update = false) => {
    update ? updatePolicy(udata) : createNewPolicy(udata);
    Alert.alert(
      'Sucesss',
      route?.params?.data
        ? 'Policy has been updated successfully.'
        : 'Policy has been created successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSubmit(false);
            route?.params?.reload();
            navigation.goBack();
          },
        },
      ],
    );
  };
  const handleClick = () => {
    const dateofiss = date.dateofissued;
    const datsh = new Date(date.dateofissued.getTime());

    const paid = udata?.paidarray
      ? Object.values(udata['paidarray']).filter(n => n).length
      : 1;
    setData({
      ...udata,
      ['policyyear']: String(dateofiss.getFullYear()),
      ['paidarray']: udata?.paidarray
        ? {...udata['paidarray'], 0: dateofiss}
        : {...emptyObj(udata?.policyduration), 0: dateofiss},
      ['nextduedate']: new Date(datsh.setMonth(datsh.getMonth() + 12 * paid)),
      ['alertdate']: new Date(datsh.setMonth(datsh.getMonth() - 2)),
    });
    setSubmit(true);
  };
  React.useEffect(() => {
    if (submit && udata?.policyyear) {
      setData({});
      submitUdata(route?.params?.data ? true : false);
    }
  }, [submit, udata]);
  return (
    <BasicPage
      title={route.params?.data ? 'Update Policy' : 'New Policy'}
      navigation={navigation}>
      <FlatList
        data={fields}
        removeClippedSubviews={false}
        renderItem={({item, key}) => {
          let seprs = item.split('--');
          let lowered = seprs[0].split(' ').join('').toLowerCase();
          if (seprs.length == 1 || seprs.includes('numeric')) {
            return (
              <View className="px-1" key={key}>
                <Text className="text-lg text-center text-black dark:text-white">
                  {seprs[0]}
                </Text>
                <TextBox
                  placeholder={seprs[0]}
                  keyboardType={seprs.length > 1 ? seprs[1] : 'default'}
                  maxLength={
                    lowered == 'cnic' || lowered == 'nomineecnic' ? 13 : 1000
                  }
                  defaultValue={
                    Number.isInteger(udata[lowered])
                      ? String(udata[lowered])
                      : udata[lowered]
                  }
                  onChangeText={text => {
                    setData({
                      ...udata,
                      [lowered]:
                        seprs.length > 1
                          ? lowered != 'contactnumber'
                            ? Number(text)
                            : text
                          : text,
                    });
                  }}
                />
              </View>
            );
          } else if (seprs.includes('date')) {
            return (
              <View className="px-1 flex justify-center items-center" key={key}>
                <Text className="text-lg text-center text-black dark:text-white">
                  {seprs[0]}
                </Text>
                <TouchableOpacity
                  className="w-full"
                  onPress={() => setOpen({...open, [lowered]: true})}>
                  <View className="bg-neutral-200 h-10 dark:bg-white rounded-3xl px-4 flex justify-center w-full">
                    <Text className="text-black text-lg ">
                      {date[lowered].toDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open[lowered]}
                  date={date[lowered]}
                  mode="date"
                  onConfirm={date_given => {
                    setOpen({...open, [lowered]: false});
                    setData({...udata, [lowered]: date_given});
                    setDate({...date, [lowered]: date_given});
                  }}
                  onCancel={() => {
                    setOpen({...open, [lowered]: false});
                  }}
                />
              </View>
            );
          } else if (seprs.includes('list')) {
            const newarr = seprs.splice(2);
            return (
              <View className="px-1 flex justify-center items-center" key={key}>
                <Text className="text-lg text-center text-black dark:text-white">
                  {seprs[0]}
                </Text>
                <SelectDropdown
                  data={newarr}
                  defaultValue={udata[lowered]}
                  buttonStyle={{
                    backgroundColor: isDarkMode ? 'white' : '#E5E5E5',
                    width: '100%',
                    borderRadius: 24,
                  }}
                  onSelect={selectedItem => {
                    setData({
                      ...udata,
                      [lowered]:
                        lowered == 'policyduration'
                          ? Number(selectedItem)
                          : selectedItem,
                    });
                  }}
                  buttonTextStyle={{color: 'black'}}></SelectDropdown>
              </View>
            );
          }
        }}></FlatList>
      <Button
        text={route?.params?.data ? 'Update Data' : 'Create New Policy'}
        className={route?.params?.data ? 'bg-green-600' : ''}
        onPress={handleClick}>
        <View className="absolute left-0">
          <FontAwesomeIcon icon={faAngleRight} color="white" />
        </View>
      </Button>
    </BasicPage>
  );
};

export default NewPolicy;

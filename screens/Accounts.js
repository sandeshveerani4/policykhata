import {ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {BasicPage} from '../components/basicpage';
import TextBox from '../components/textbox';
import {Box} from './HomeScreen';
import {addCountListener, sumAmount} from '../models/policies';

const Accounts = ({navigation}) => {
  const [year, setYear] = React.useState('');
  const [commission, setCommission] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [bonus, setBonus] = React.useState(0);
  const [policies, setPolicies] = React.useState(0);
  const [end, setend] = React.useState(0);
  const [dend, setdend] = React.useState(0);
  const [shd, setshd] = React.useState(0);
  const [js, setjs] = React.useState(0);
  const [sb, setsb] = React.useState(0);
  const [che, setche] = React.useState(0);
  const [chp, setchp] = React.useState(0);
  const handleSubmit = () => {
    if (year == '') {
      addCountListener(setPolicies, '');
      addCountListener(setend, "policyplan='Endowment'");
      addCountListener(setdend, "policyplan='Golden Endowment'");
      addCountListener(setshd, "policyplan='Shadabad'");
      addCountListener(setjs, "policyplan='Jeevan Sathi'");
      addCountListener(setsb, "policyplan='Sadabahar'");
      addCountListener(setche, "policyplan='Child Education'");
      addCountListener(setchp, "policyplan='Child Protection'");
    } else {
      addCountListener(setPolicies, "policyyear = '" + year + "'");
      addCountListener(
        setdend,
        "policyyear = '" + year + "' && policyplan='Golden Endowment'",
      );
      addCountListener(
        setend,
        "policyyear = '" + year + "' && policyplan='Endowment'",
      );
      addCountListener(
        setshd,
        "policyyear = '" + year + "' && policyplan='Shadabad'",
      );
      addCountListener(
        setjs,
        "policyyear = '" + year + "' && policyplan='Jeevan Sathi'",
      );

      addCountListener(
        setsb,
        "policyyear = '" + year + "' && policyplan='Sadabahar'",
      );
      addCountListener(
        setche,
        "policyyear = '" + year + "' && policyplan='Child Education'",
      );
      addCountListener(
        setchp,
        "policyyear = '" + year + "' && policyplan='Child Protection'",
      );
    }

    sumAmount(setAmount, year != '' ? "policyyear= '" + year + "'" : '');
  };
  handleSubmit();
  return (
    <BasicPage title="Accounts" navigation={navigation}>
      <ScrollView className="mx-3">
        <TextBox
          placeholder="Enter Year"
          keyboardType="numeric"
          defaultValue={year}
          onChangeText={text => {
            setYear(text);
            handleSubmit();
          }}
        />
        <View className="flex flex-row gap-7 items-stretch">
          <View className="flex-1">
            <Text className="text-lg text-black dark:text-white text-center">
              Commission
            </Text>
            <TextBox
              placeholder="Enter %"
              keyboardType="numeric"
              defaultValue={commission}
              onChangeText={text => {
                setCommission(text);
                handleSubmit();
              }}
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg text-black dark:text-white text-center">
              Tax
            </Text>
            <TextBox
              placeholder="Enter %"
              keyboardType="numeric"
              defaultValue={tax}
              onChangeText={text => {
                setTax(text);
                handleSubmit();
              }}
            />
          </View>
        </View>
        <View className="my-2">
          <Text className="text-lg text-center text-white">Extra Bonus</Text>
          <TextBox
            placeholder="Enter Bonus"
            keyboardType="numeric"
            defaultValue={bonus}
            onChangeText={text => {
              setBonus(Number(text));
              handleSubmit();
            }}
          />
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <Box title="Business" back="bg-yellow-500">
            {parseFloat(amount).toFixed(0)}
          </Box>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <Box title="Commission" back="bg-green-400">
            {parseFloat((amount * commission) / 100 + bonus).toFixed(0)}
          </Box>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <Box title="Tax Deducted" back="bg-red-400">
            {parseFloat(
              (((amount * commission) / 100 + bonus) * tax) / 100,
            ).toFixed(0)}
          </Box>
          <Box title="Net Amount" back="bg-cyan-500">
            {parseFloat(
              (amount * commission) / 100 +
                bonus -
                (((amount * commission) / 100 + bonus) * tax) / 100,
            ).toFixed(0)}
          </Box>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4 bg-indigo-500 rounded-full">
            <Text className="text-2xl text-right ml-10 text-white">
              Total Policies
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-white font-medium">
              {policies}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Endowment
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {end}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Golden Endowment
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {dend}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Shadabad
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {shd}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Jeevan Sathi
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {js}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Sadabahar
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {sb}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Child Education
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {che}
            </Text>
          </View>
        </View>
        <View className="space-x-2 mt-2 space-2 flex items-center  flex-row flex-nowrap">
          <View className="flex-1 flex flex-row items-center py-4  rounded-full">
            <Text className="text-2xl text-right ml-10 text-black dark:text-white">
              Child Protection
            </Text>
            <Text className="text-3xl  flex-1 text-right px-10 text-black dark:text-white font-medium">
              {chp}
            </Text>
          </View>
        </View>
      </ScrollView>
    </BasicPage>
  );
};

export default Accounts;

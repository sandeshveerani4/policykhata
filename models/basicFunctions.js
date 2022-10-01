import {Linking} from 'react-native';

export function calculate_age(today, date) {
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var yy = parseInt(date.getFullYear());
  var mm = parseInt(date.getMonth());
  var dd = parseInt(date.getDate());
  var years, months, days;
  // months
  months = month - mm;
  if (day < dd) {
    months = months - 1;
  }
  // years
  years = year - yy;
  if (month * 100 + day < mm * 100 + dd) {
    years = years - 1;
    months = months + 12;
  }
  // days
  days = Math.floor(
    (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
      (24 * 60 * 60 * 1000),
  );
  months -= 1;
  let finalYear = years;
  if (months > 6 || (months == 6 && days > 0)) {
    finalYear += 1;
  }
  if (months < 0) {
    months = months + 12;
    years -= 1;
  }
  //
  return {finalyear: finalYear, years: years, months: months, days: days};
}

export const dateFormater = dateobj => {
  try {
    return dateobj.toDateString().split(' ').splice(1).join(' ');
  } catch {
    return null;
  }
};
function openUrl(url) {
  return Linking.openURL(url);
}
export function openSmsUrl(phone, body) {
  return openUrl(`sms:${phone}${getSMSDivider()}body=${body}`);
}
function getSMSDivider() {
  return Platform.OS === 'ios' ? '&' : '?';
}
export const sendPaymentSMS = details => {
  openSmsUrl(
    details['contactnumber'],
    `${
      details['policyholdername']
    }\n آپکی ${new Date().getFullYear()} کی پالیسی کی پریمیم ${
      details['premiumamount']
    } جمع کروانے کی آخری تاریخ قریب آرہی ہے لہزا اپنی پریمیم جلد سے جلد جمع کروائیں۔ شکریہ\nاسٹیٹ لائف انشورنس کارپوریشن `,
  );
};

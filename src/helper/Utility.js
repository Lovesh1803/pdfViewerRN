import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';

export const isNetworkAvailable = () =>
  new Promise(async (resolve, reject) => {
    await NetInfo.fetch().then(state => {
      console.log('GET NETWORK STATE', state);
      resolve(state.isConnected);
    });
  });

export const getFormattedDate = (date, format) => {
  return moment(date).format(format);
};

export const getFileNameFromUrl = url => {
  if (url) {
    let filename = url.substring(
      url.lastIndexOf('/') + 1,
      url.lastIndexOf('.'),
    );
    return filename;
  }
  return '';
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageConstant} from '.';

const setAuthAsyncStorage = async (bookmarks) => {
  await AsyncStorage.setItem(StorageConstant.BOOKMARKS, bookmarks);
};

const getBookmarksAsyncStorage = async () => {
  
};

export const AuthAsyncStorage = {
  getBookmarksAsyncStorage,
  setAuthAsyncStorage
};

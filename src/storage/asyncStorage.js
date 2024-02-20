import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageConstant} from '.';

const setBookmarkAsyncStorage = async bookmarks => {
  await AsyncStorage.setItem(
    StorageConstant.BOOKMARKS,
    JSON.stringify(bookmarks),
  );
};

const getBookmarksAsyncStorage = async () => {
  return await AsyncStorage.getItem(StorageConstant.BOOKMARKS);
};

export const BookmarkLocalStorage = {
  getBookmarksAsyncStorage,
  setBookmarkAsyncStorage,
};

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {AppColors} from '../Assets/AppColors';
import AppText from '../libComponents/AppText';
import AppIcon, {Icons} from '../libComponents/AppIcon';
import AppTouchableOpacity from '../libComponents/AppTouchableOpacity';
import {useDispatch, useSelector} from 'react-redux';
import {getFormattedDate} from '../helper/Utility';
import {removeBookmark} from '../redux/actions';
import {useNavigation} from '@react-navigation/native';

const BookmarkListScreen = ({navigation}) => {
  const {bookmarks} = useSelector(state => state.pdfViewerReducer);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppTouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon
            type={Icons.AntDesign}
            name={'back'}
            style={styles.backIcon}
            color={AppColors.white}
          />
        </AppTouchableOpacity>
        <View style={styles.headingWrapper}>
          <AppText text={'Bookmarks'} style={styles.headerTitle} />
        </View>
      </View>
      <ScrollView
        style={styles.bookmarkWrapper}
        contentContainerStyle={styles.bookmarkContainer}>
        {bookmarks.length ? (
          bookmarks.map((bookmark, index) => {
            return <BookmarkCard key={index} bookmark={bookmark} />;
          })
        ) : (
          <AppText text={'No bookmarks found'} />
        )}
      </ScrollView>
    </View>
  );
};

const BookmarkCard = ({bookmark}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to remove bookmark
   */
  const onPressRemoveBookmark = () => {
    dispatch(removeBookmark(bookmark));
  };

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to navigate to specific page
   */
  const onPressBookmark = () => {
    navigation.navigate('PdfViewerScreen', {pageNo: bookmark?.pageNo});
  };

  return (
    <AppTouchableOpacity style={styles.bookmarkCard} onPress={onPressBookmark}>
      <View>
        <AppText
          text={`Page: ${bookmark?.pageNo}`}
          style={styles.bookmarkTitle}
        />
        <AppText
          text={getFormattedDate(bookmark?.createdAt, 'DD MMM YY')}
          style={styles.bookmarkDate}
        />
      </View>
      <AppTouchableOpacity onPress={onPressRemoveBookmark}>
        <AppIcon
          type={Icons.MaterialCommunityIcons}
          name={'bookmark-remove'}
          style={styles.backIcon}
          color={AppColors.white}
        />
      </AppTouchableOpacity>
    </AppTouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: AppColors.chineseBlack,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  backIcon: {},
  headingWrapper: {
    alignItems: 'center',
    width: '90%',
  },
  headerTitle: {
    color: AppColors.white,
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  bookmarkWrapper: {
    width: '100%',
  },
  bookmarkContainer: {
    alignItems: 'center',
  },
  bookmarkCard: {
    width: '100%',
    backgroundColor: AppColors.maastrichtBlue,
    padding: 10,
    borderBottomColor: AppColors.cadet,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookmarkTitle: {
    fontSize: 18,
    color: AppColors.spanishYellow,
  },
  bookmarkDate: {
    fontSize: 14,
    color: AppColors.cadet,
    marginTop: 5,
  },
});

export default BookmarkListScreen;

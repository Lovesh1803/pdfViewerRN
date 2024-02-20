import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Pdf from 'react-native-pdf';
import {AppColors} from '../Assets/AppColors';
import AppText from '../libComponents/AppText';
import AppIcon, {Icons} from '../libComponents/AppIcon';
import AppTouchableOpacity from '../libComponents/AppTouchableOpacity';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addBookmark, removeBookmark, setBookmark} from '../redux/actions';
import {getFileNameFromUrl} from '../helper/Utility';
import {BookmarkLocalStorage} from '../storage/asyncStorage';

const PdfViewerScreen = ({navigation, route}) => {
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const {bookmarks} = useSelector(state => state.pdfViewerReducer);
  const [pdfTotalPages, setPdfTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isCurrentPageBookmarked, setIsCurrentPageBookmarked] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(
    'https://www.sldttc.org/allpdf/21583473018.pdf',
  );

  useEffect(() => {
    const getBookmarks = async () => {
      const bookmarks = await BookmarkLocalStorage.getBookmarksAsyncStorage();
      if (bookmarks && JSON.parse(bookmarks).length)
        dispatch(setBookmark(JSON.parse(bookmarks)));
    };

    getBookmarks();
  }, []);

  useEffect(() => {
    BookmarkLocalStorage.setBookmarkAsyncStorage(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    if (route?.params?.pageNo) {
      pdfRef.current.setPage(route.params.pageNo);
    }
    console.log('Pdf url: ', route?.params);
    if (route?.params?.pdfUrl) {
      setPdfUrl(route?.params?.pdfUrl);
    }
  }, [route]);

  useEffect(() => {
    const isBookmarked = bookmarks.some(
      bookmark => bookmark.pageNo === currentPage,
    );
    setIsCurrentPageBookmarked(isBookmarked);
  }, [bookmarks, currentPage]);

  const onPinchGestureEvent = event => {
    const newScale = event.nativeEvent.scale;
    console.log('New scale: ' + newScale);
    setScale(newScale);
  };

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to open bookmark list
   */
  const onPressBookmarkList = () => {
    navigation.navigate('BookmarkList');
  };

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to add/remove bookmark
   */
  const onPressBookmark = () => {
    const bookmarkData = {
      pageNo: currentPage,
      createdAt: new Date(),
    };
    isCurrentPageBookmarked
      ? dispatch(removeBookmark(bookmarkData))
      : dispatch(addBookmark(bookmarkData));
  };

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to zoomin page
   */
  const onPressZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 5));
  };

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to zoomout page
   */
  const onPressZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText
          text={getFileNameFromUrl(pdfUrl)}
          numberOfLines={1}
          style={styles.headerTitle}
        />
        <AppTouchableOpacity
          style={styles.bookmarkListIcon}
          onPress={onPressBookmarkList}>
          <AppIcon
            name={'collections-bookmark'}
            type={Icons.MaterialIcons}
            color={AppColors.white}
            size={26}
          />
          {bookmarks.length ? (
            <View style={styles.bookmarksBadge}>
              <AppText
                text={bookmarks.length}
                style={styles.bookmarksBadgeText}
              />
            </View>
          ) : null}
        </AppTouchableOpacity>
      </View>
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Pdf
          trustAllCerts={false}
          ref={pdfRef}
          source={{
            uri: pdfUrl,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setPdfTotalPages(numberOfPages);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
            setCurrentPage(page);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdfView}
          scale={scale}
        />
      </PinchGestureHandler>
      <View style={styles.pdfOptions}>
        <View style={styles.pdfPages}>
          <AppText text={`${currentPage}`} style={styles.pdfCurrPage} />
          <AppText text={` / ${pdfTotalPages}`} style={styles.pdfTotalPages} />
        </View>
        <View style={styles.pdfZoomWrapper}>
          <AppTouchableOpacity onPress={onPressZoomOut}>
            <AppIcon
              name={'minus-circle'}
              type={Icons.FontAwesome}
              color={AppColors.white}
              size={24}
            />
          </AppTouchableOpacity>
          <AppText text={scale.toFixed(2)} style={styles.zoomScale} />
          <AppTouchableOpacity onPress={onPressZoomIn}>
            <AppIcon
              name={'plus-circle'}
              type={Icons.FontAwesome}
              color={AppColors.white}
              size={24}
            />
          </AppTouchableOpacity>
        </View>
        <View style={styles.bookmarkIcon}>
          <AppTouchableOpacity onPress={onPressBookmark}>
            <AppIcon
              name={isCurrentPageBookmarked ? 'bookmark' : 'bookmark-o'}
              type={Icons.FontAwesome}
              color={AppColors.white}
              size={24}
            />
          </AppTouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  headerTitle: {
    width: '80%',
    color: AppColors.white,
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  bookmarkListIcon: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 5,
  },
  bookmarksBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    width: 15,
    height: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    borderColor: AppColors.chineseBlack,
    borderWidth: 1,
  },
  bookmarksBadgeText: {
    fontSize: 9,
  },
  pdfView: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdfOptions: {
    position: 'absolute',
    width: '70%',
    height: 50,
    bottom: 15,
    backgroundColor: AppColors.chineseBlack,
    elevation: 10,
    borderRadius: 40,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pdfPages: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  pdfCurrPage: {
    color: AppColors.spanishYellow,
    fontSize: 16,
    fontWeight: '500',
  },
  pdfTotalPages: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '400',
  },
  bookmarkIcon: {
    width: '25%',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  pdfZoomWrapper: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  zoomScale: {
    width: '40%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: AppColors.cadet,
    borderRadius: 5,
    padding: 5,
    color: AppColors.chineseBlack,
  },
});

export default PdfViewerScreen;

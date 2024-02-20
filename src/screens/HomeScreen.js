import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import AppTouchableOpacity from '../libComponents/AppTouchableOpacity';
import AppText from '../libComponents/AppText';
import {AppColors} from '../Assets/AppColors';
import pdfIcon from '../Assets/images/pdf.png';
import DocumentPicker from 'react-native-document-picker';

const HomeScreen = ({navigation}) => {
  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to show sample pdf
   */
  const onPressSamplePdf = () => {
    navigation.navigate('PdfViewerScreen');
  };

  /**
   * @author Lovesh Singh
   * @since 20-02-2024
   * @description to handle choose pdf
   */
  const onChoosePdf = async () => {
    DocumentPicker.pick({
      type: 'application/pdf',
      allowMultiSelection: false,
      copyTo: 'cachesDirectory',
    })
      .then(res => {
        console.log('Pdf select', res);
        navigation.navigate('PdfViewerScreen', {pdfUrl: res[0]?.fileCopyUri});
      })
      .catch(err => {
        console.log('Document picker Error: ', err);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={pdfIcon} style={styles.pdfIcon} resizeMode="contain" />
      <AppText style={styles.chooseFileText} text={'Choose your PDF'} />
      <AppTouchableOpacity onPress={onChoosePdf} style={styles.choosePdfBtn}>
        <AppText style={styles.chooseBtnText} text={'Upload a file'} />
      </AppTouchableOpacity>
      <View style={styles.separator}></View>
      <AppTouchableOpacity
        style={styles.samplePdfBtn}
        onPress={onPressSamplePdf}>
        <AppText style={styles.sampleBtnText} text={'Use Sample PDF'} />
      </AppTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.chineseBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfIcon: {
    height: '30%',
    width: '100%',
  },
  chooseFileText: {
    fontSize: 26,
    color: AppColors.spanishYellow,
    marginTop: 40,
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: AppColors.cadet,
    marginVertical: 50,
  },
  choosePdfBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: AppColors.maastrichtBlue,
    borderColor: AppColors.cadet,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  chooseBtnText: {
    color: AppColors.white,
  },
  samplePdfBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: AppColors.maastrichtBlue,
    borderColor: AppColors.cadet,
    borderWidth: 1,
    borderRadius: 10,
  },
  sampleBtnText: {
    color: AppColors.spanishYellow,
  },
});

export default HomeScreen;

import DocumentPicker from 'react-native-document-picker';

export const pickFile = async (setMethod: CallableFunction) => {
  const pickerResult = await DocumentPicker.pickSingle({
    type: [DocumentPicker.types.pdf],
    copyTo: 'cachesDirectory'
  });
  setMethod(pickerResult)
}

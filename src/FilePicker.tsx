import { Platform } from 'react-native';

let FilePickerModule: any = null;

if (Platform.OS === 'web') {
    import('use-file-picker')
        .then((module) => {
            FilePickerModule = module.default;
        })
} else {
    import('react-native-document-picker')
        .then((module) => {
            FilePickerModule = module.default;
        })
}

const pickFile = async () => {
    if (Platform.OS === 'web') {
        console.log('web picker');
    }
    else {
        console.log('native picker')
        return FilePickerModule.pickSingle({ type: [FilePickerModule.types.pdf] });
    }
}

export default pickFile;

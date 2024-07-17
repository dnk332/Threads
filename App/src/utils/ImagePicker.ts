import ImageMultiPicker, {
  Image as ImagePickerResponse,
} from 'react-native-image-crop-picker';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

import {Alert, Platform} from 'react-native';

interface ConfigOptions {
  storageOptions?: {
    skipBackup: boolean;
    cameraRoll: boolean;
    path: string;
  };
}

const configOptions: ConfigOptions =
  Platform.OS === 'ios'
    ? {
        storageOptions: {
          skipBackup: true,
          cameraRoll: true,
          path: 'thread-app',
        },
      }
    : {};

type ImagePickerCallback = (
  error: any,
  images: Array<{
    uri: string;
    type: string;
    name: string;
    width: number;
    height: number;
    size: number;
    sourceURL: string;
    data: string;
  }> | null,
) => void;

export const openImagePicker = (
  callback: ImagePickerCallback,
  options: Record<string, any> = {},
) => {
  const onOpenImagePicker = () => {
    ImageMultiPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      cropping: true,
      includeBase64: true,
      ...configOptions,
      ...options,
    })
      .then((images: ImagePickerResponse | ImagePickerResponse[]) => {
        if ('path' in images) {
          callback(null, [
            {
              uri: images.path,
              type: images.mime,
              name: images.filename || 'image_noname',
              width: images.width,
              height: images.height,
              size: images.size,
              sourceURL: images.sourceURL,
              data: images.data,
            },
          ]);
        } else if (Array.isArray(images) && images.length > 0) {
          const list = images.map(i => ({
            uri: i.path,
            type: i.mime,
            name: i.filename || 'image_noname',
            width: i.width,
            height: i.height,
            size: i.size,
            sourceURL: i.sourceURL,
            data: i.data,
          }));
          callback(null, list);
        } else {
          callback({}, null);
        }
      })
      .catch(e => {
        callback(e, null);
      });
  };

  check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  )
    .then(result => {
      console.log('permission result', result);
      switch (result) {
        case RESULTS.DENIED:
          request(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.PHOTO_LIBRARY
              : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          )
            .then(res => {
              if (res === RESULTS.GRANTED) {
                onOpenImagePicker();
              }
            })
            .catch(() => {
              Alert.alert(
                'Error',
                'An error occurred while requesting permissions.',
              );
            });
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Required',
            'Please allow access to your photo library.',
            [
              {
                text: 'Next Time',
              },
              {
                text: 'Accept',
                onPress: () => {
                  openSettings().catch(() =>
                    Alert.alert(
                      'Error',
                      'An error occurred while opening settings.',
                    ),
                  );
                },
              },
            ],
          );
          break;
        case RESULTS.LIMITED:
        case RESULTS.GRANTED:
          onOpenImagePicker();
          break;
        case RESULTS.UNAVAILABLE:
          Alert.alert('Error', 'Permissions are unavailable on this device.');
          break;
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};

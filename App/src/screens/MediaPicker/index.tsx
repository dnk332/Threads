// import React, {useEffect, useState} from 'react';
// import {PermissionsAndroid} from 'react-native';
// import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll/src/CameraRoll';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';
//
// import {MediaType} from '@src/types/enum';
// import {isAndroid} from '@utils/Device';
// import MediaPickerView from './view';
//
// TODO: Update image picker
// type MediaPickerProps = {
//   type: MediaType;
//   multiple: boolean;
//   editable: boolean;
//   editorProps: boolean;
// };
//
// interface PhotoIdentifierCustom extends PhotoIdentifier {
//   mimeType: any;
// }
//
// const MediaPicker: React.FC = ({
//   type,
//   multiple,
//   editable,
//   editorProps,
// }: MediaPickerProps) => {
//   const isPickingPhoto = type === MediaType.Photo;
//
//   const [medias, setMedias] = useState<PhotoIdentifierCustom>();
//
//   useEffect(() => {
//     // state.setFetching(true);
//     const init = async () => {
//       if (isAndroid) {
//         await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         );
//       }
//       CameraRoll.getPhotos({
//         assetType: isPickingPhoto ? 'Photos' : 'Videos',
//         first: 9999999,
//       })
//         .then(data => {
//           const mediaItems = data.edges.map(edge => {
//             const extension = edge.node.image.uri.split('.').pop();
//             const isVideo = edge.node.type.includes('video');
//             const mimeType = isVideo
//               ? `video/${extension}`
//               : `image/${extension === 'jpg' ? 'jpeg' : extension}`;
//             return {
//               ...edge.node,
//               mimeType,
//             };
//           });
//           // state.setFetching(false);
//           // state.setMedias(medias);
//           setMedias(mediaItems);
//         })
//         .catch(err => {
//           // state.setFetching(false);
//           console.log(err);
//         });
//     };
//     init();
//   }, [isPickingPhoto]);
//
//   return <MediaPickerView medias={medias} />;
// };
//
// export default MediaPicker;

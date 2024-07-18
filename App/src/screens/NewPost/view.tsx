import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  InputAccessoryView,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import {AppContainer, AppInput, AppText, Avatar} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import layout from '@themes/layout';
import {colors} from '@themes/color';
import SvgComponent from '@svg/index';
import HandelKeyboard from '@utils/KeyboardInfo';
import {IUserProfile} from '@src/types/user';
import {IImage} from '@src/types/other';
import {imageHeight, imageWidth} from '@constants/deviceSize';
import {FlashList} from '@shopify/flash-list';
import PostImageItem from '@screens/NewPost/Components/PostImageItem';

interface NewPostScreenProps {
  createPost: (textContent: string) => void;
  uploadImage: () => void;
  userInfo: IUserProfile;
}

export interface NewPostScreenRef {
  onUpdatePostImage: (postImages: IImage[]) => void;
}

const SeparatorItem = () => <View style={styles.separator} />;

const NewPostScreenView = forwardRef<NewPostScreenRef, NewPostScreenProps>(
  ({createPost, uploadImage, userInfo}, ref) => {
    const inputAccessoryViewID = 'postThreadInput';

    const {heightKB} = HandelKeyboard();
    const [contentViewHeight, setContentViewHeight] = useState<number>(0);
    const [thread, setThread] = useState<string>('');
    const [images, setImages] = useState<IImage[]>([]);

    const inputRef = useRef<TextInput>();

    const clearInput = () => {
      setThread('');
      setImages([]);
    };

    const deleteImage = uri => {
      setImages(prevImages => prevImages.filter(image => image.uri !== uri));
    };

    useImperativeHandle(ref, () => ({
      onUpdatePostImage: postImages => {
        setImages(postImages);
        inputRef.current.focus();
      },
    }));

    return (
      <AppContainer
        style={styles.container}
        haveTitle={true}
        title="New thread"
        haveBackButton={true}
        backButton={<AppText fontSize={16}>Cancel</AppText>}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          style={[styles.contentContainer]}>
          <View style={[layout.fill]}>
            <View style={[layout.row, layout.fill, styles.avatar]}>
              <Avatar
                source={{
                  uri: userInfo.avatar_url,
                }}
              />
              <AppText style={styles.username} fontSize={16} fontWeight={600}>
                {userInfo.name}
              </AppText>
              {(thread !== '' || images.length > 0) && (
                <View style={[styles.deleteBtnContainer]}>
                  <Pressable onPress={clearInput} style={styles.deleteBtn}>
                    <SvgComponent name="DELETE" />
                  </Pressable>
                </View>
              )}
            </View>
            <View
              style={[
                styles.lineWrapper,
                {
                  height:
                    contentViewHeight +
                    120 +
                    (images.length > 0 ? imageHeight : 0),
                },
              ]}>
              <View style={[styles.line]} />
              <Avatar
                source={{
                  uri: userInfo.avatar_url,
                }}
                imgStyle={styles.tagImg}
              />
              <View style={styles.replyItem}>
                <AppText>Add another reply</AppText>
              </View>
            </View>
            <View>
              <View style={[layout.alignItemsStart, styles.content]}>
                <AppInput
                  ref={inputRef}
                  autoFocus
                  placeholder="What's news?"
                  onBlur={e => e.preventDefault()}
                  value={thread}
                  onChangeText={setThread}
                  multiline={true}
                  inputAccessoryViewID={inputAccessoryViewID}
                  numberOfLines={1}
                  scrollEnabled={false}
                  style={styles.textInput}
                  onLayout={({nativeEvent}) => {
                    const {height} = nativeEvent.layout;
                    setContentViewHeight(height);
                  }}
                />
              </View>
              {images.length > 0 && (
                <View style={styles.imagesWrapper}>
                  <FlashList
                    horizontal={true}
                    data={images}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                      <PostImageItem deleteImage={deleteImage} image={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={0.3}
                    nestedScrollEnabled
                    ListHeaderComponent={
                      <View style={styles.listImageHeader} />
                    }
                    ItemSeparatorComponent={SeparatorItem}
                    estimatedListSize={{
                      height: imageHeight,
                      width: imageWidth * 10,
                    }}
                  />
                </View>
              )}
              <View style={[layout.alignItemsStart, styles.content]}>
                <View
                  style={[
                    layout.row,
                    layout.alignItemsCenter,
                    layout.justifyContentBetween,
                    styles.functionBtnContainer,
                  ]}>
                  <Pressable onPress={uploadImage} style={styles.functionBtn}>
                    <SvgComponent name={'IMAGE'} />
                  </Pressable>
                  <Pressable style={styles.functionBtn}>
                    <SvgComponent name={'CAMERA'} />
                  </Pressable>
                  <Pressable style={styles.functionBtn}>
                    <SvgComponent name={'GIF'} />
                  </Pressable>
                  <Pressable style={styles.functionBtn}>
                    <SvgComponent name={'MIC'} />
                  </Pressable>
                  <Pressable style={styles.functionBtn}>
                    <SvgComponent name={'HASHTAG'} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={{height: heightKB + 100}} />
        </ScrollView>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View
            style={[
              layout.row,
              layout.justifyContentBetween,
              layout.alignItemsCenter,
              styles.bottomBtn,
            ]}>
            <Pressable>
              <AppText fontSize={13}>Anyone can reply & quote</AppText>
            </Pressable>
            {thread.length > 0 ? (
              <Pressable
                onPress={() => createPost(thread)}
                style={[styles.fragment, styles.submitBtn]}>
                <AppText fontSize={13} fontWeight={600}>
                  Post
                </AppText>
              </Pressable>
            ) : (
              <View style={styles.fragment} />
            )}
          </View>
        </InputAccessoryView>
      </AppContainer>
    );
  },
);

export default NewPostScreenView;

const styles = AppStyleSheet.create({
  container: {marginTop: 0, paddingTop: 16},
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 14,
  },
  avatar: {
    margin: 16,
    marginBottom: 0,
  },
  line: {
    width: 2,
    backgroundColor: colors.border,
    flex: 1,
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 2,
    zIndex: -1,
  },
  lineWrapper: {
    position: 'absolute',
    top: 40,
    left: 25,
    zIndex: -1,
  },
  content: {
    marginLeft: 68,
    marginTop: -10,
    marginBottom: 10,
  },
  submitBtn: {
    borderRadius: 16,
    backgroundColor: colors.dark_gray,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  tagImg: {width: 20, height: 20, marginTop: 8},
  replyItem: {
    position: 'absolute',
    bottom: 0,
    width: 120,
    left: 42,
    alignSelf: 'flex-start',
  },
  functionBtnContainer: {
    marginTop: 16,
    gap: 5,
    marginLeft: -7,
  },
  functionBtn: {
    padding: 4,
  },
  bottomBtn: {
    padding: 16,
    backgroundColor: colors.background,
  },
  deleteBtn: {
    padding: 4,
  },
  textInput: {
    maxWidth: '95%',
  },
  fragment: {
    width: 80,
    height: 35,
  },
  postImage: {
    width: imageWidth,
    height: imageHeight,
  },
  listImageHeader: {
    width: 68,
  },
  username: {
    marginLeft: 10,
  },
  deleteBtnContainer: {
    position: 'absolute',
    top: -6,
    right: -10,
  },
  imagesWrapper: {
    maxHeight: imageHeight,
  },
  separator: {
    padding: 5,
  },
});

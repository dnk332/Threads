import React, {useState} from 'react';
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import {AppContainer, AppText, AppInput, Avatar} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import layout from '@themes/layout';
import {colors} from '@themes/color';
import SvgComponent from '@svg/index';
import HandelKeyboard from '@utils/KeyboardInfo';

const NewPostScreenView = () => {
  const inputAccessoryViewID = 'postThreadInput';
  const {heightKB} = HandelKeyboard();
  const [contentViewHeight, setContentViewHeight] = useState<number>(0);
  const [thread, setThread] = useState<string>('');

  return (
    <AppContainer
      style={styles.container}
      haveTitle={true}
      title="New thread"
      haveBackButton={true}
      backButton={<AppText fontSize={16}>Cancel</AppText>}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={[styles.contentContainer]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[layout.row, layout.fill]}>
          <Avatar
            source={{
              uri: 'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg',
            }}
          />
          <View>
            <View
              style={[
                styles.lineWrapper,
                {
                  height: contentViewHeight + 15,
                },
              ]}>
              <View style={[styles.line]} />
              <Avatar
                source={{
                  uri: 'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg',
                }}
                imgStyle={styles.tagImg}
              />
              <View style={styles.replyItem}>
                <AppText>Add another reply</AppText>
              </View>
            </View>
            <View
              onLayout={({nativeEvent}) => {
                const {height} = nativeEvent.layout;
                setContentViewHeight(height);
              }}
              style={[layout.alignItemsStart, styles.content]}>
              <View
                style={[
                  layout.row,
                  layout.alignItemsCenter,
                  layout.justifyContentBetween,
                  styles.header,
                ]}>
                <AppText fontSize={16} fontWeight={600}>
                  Brian
                </AppText>
                <View style={styles.btnContainer}>
                  {thread !== '' && (
                    <Pressable
                      onPress={() => setThread('')}
                      style={styles.deleteBtn}>
                      <SvgComponent name="DELETE" />
                    </Pressable>
                  )}
                </View>
              </View>
              <AppInput
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
              />
              <View
                style={[
                  layout.row,
                  layout.alignItemsCenter,
                  layout.justifyContentBetween,
                  styles.functionBtnContainer,
                ]}>
                <Pressable style={styles.functionBtn}>
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
        </KeyboardAvoidingView>
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
          <Pressable style={styles.submitBtn}>
            <AppText fontSize={13} fontWeight={600}>
              Post
            </AppText>
          </Pressable>
        </View>
      </InputAccessoryView>
    </AppContainer>
  );
};

export default NewPostScreenView;

const styles = AppStyleSheet.create({
  container: {marginTop: 0, paddingTop: 16},
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 14,
    padding: 16,
  },
  header: {
    marginTop: -4,
    marginBottom: 4,
    width: '90%',
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
    left: -30,
    zIndex: 2,
  },
  content: {
    marginLeft: 10,
  },
  submitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.dark_gray,
  },
  tagImg: {width: 20, height: 20, marginTop: 8},
  replyItem: {
    position: 'absolute',
    bottom: 0,
    width: 120,
    left: 40,
    alignSelf: 'flex-start',
  },
  functionBtnContainer: {
    marginTop: 4,
    gap: 5,
    marginLeft: -4,
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
    maxWidth: '90%',
  },
  btnContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {useEffect, useRef, useState} from 'react';
import {AppContainer, AppInput, AppText, Avatar} from '@components/index';
import {AppStyleSheet} from '@themes/responsive';

import {InputAccessoryView, Pressable, ScrollView, View} from 'react-native';
import {colors, layout} from '@themes/index';
import {SvgComponent} from '@assets/svg';
import HandelKeyboard from '@utils/KeyboardInfo';

const NewPostView = () => {
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
      <ScrollView style={[styles.contentContainer]}>
        <View style={[layout.row, layout.fill]}>
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
                <Pressable
                  onPress={() => setThread('')}
                  style={styles.deleteBtn}>
                  <SvgComponent name="delete" />
                </Pressable>
              </View>
              <AppInput
                placeholder="What's news?"
                autoCorrect={false}
                spellCheck={false}
                onBlur={e => e.preventDefault()}
                // ref={ref => {
                //   if (ref !== undefined && ref && !ref.isFocused()) {
                //     ref.focus();
                //   }
                // }}
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
                  <SvgComponent name={'image'} />
                </Pressable>
                <Pressable style={styles.functionBtn}>
                  <SvgComponent name={'camera'} />
                </Pressable>
                <Pressable style={styles.functionBtn}>
                  <SvgComponent name={'gif'} />
                </Pressable>
                <Pressable style={styles.functionBtn}>
                  <SvgComponent name={'mic'} />
                </Pressable>
                <Pressable style={styles.functionBtn}>
                  <SvgComponent name={'hashtag'} />
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

export default NewPostView;

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
});

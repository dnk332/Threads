import React, {useEffect, useRef, useState} from 'react';
import {AppContainer, AppInput, AppText, Avatar} from '@components/index';
import {AppStyleSheet} from '@themes/responsive';

import {Pressable, ScrollView, View} from 'react-native';
import {colors, layout} from '@themes/index';
import HandelKeyboard from '@utils/KeyboardInfo';
import {SvgComponent} from '@assets/svg';
// import {SVGName} from '@assets/svg';

const NewPostView = () => {
  const {heightKB} = HandelKeyboard();
  const textInputRef = useRef(undefined);

  const [contentViewHeight, setContentViewHeight] = useState<number>(0);

  useEffect(() => {
    if (
      textInputRef.current !== undefined &&
      textInputRef.current &&
      !textInputRef.current.isFocused()
    ) {
      textInputRef.current.focus();
    }
  }, [textInputRef]);

  return (
    <AppContainer
      style={styles.container}
      haveTitle={true}
      title="New thread"
      haveBackButton={true}
      backButton={<AppText fontSize={16}>Cancel</AppText>}>
      <ScrollView style={[layout.fill, styles.contentContainer]}>
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
                  height: contentViewHeight + 20,
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
              <View style={[layout.row]}>
                <AppText style={styles.userName} fontSize={16} fontWeight={600}>
                  Brian
                </AppText>
              </View>
              <AppInput
                placeholder="What's news?"
                autoCorrect={false}
                spellCheck={false}
                onBlur={e => e.preventDefault()}
                ref={textInputRef}
                multiline={true}
              />
              <View
                style={[
                  layout.row,
                  layout.alignItemsCenter,
                  layout.justifyContentBetween,
                ]}>
                {/* <Pressable>
                  <SVGName title={'image'} />
                </Pressable>
                <Pressable>
                  <SVGName title={'camera'} />
                </Pressable>
                <Pressable>
                  <SVGName title={'document'} />
                </Pressable>
                <Pressable>
                  <SVGName title={'mic'} />
                </Pressable>
                <Pressable>
                  <SVGName title={'hashtag2'} />
                </Pressable> */}
                <Pressable>
                  <SvgComponent name={'user_minus'} color={'red'} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            layout.row,
            layout.justifyContentBetween,
            layout.alignItemsCenter,
            {bottom: -heightKB - 40},
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
      </ScrollView>
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
    paddingBottom: 0,
  },
  userName: {
    marginTop: -3,
    marginBottom: 4,
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
  bottomBtn: {
    position: 'absolute',
    flex: 1,
    width: '100%',
  },
});

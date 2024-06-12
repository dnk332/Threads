import React, {useCallback, useRef, useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import SearchItem from './Component/SearchItem';
import SvgComponent from '@svg/index';
import layout from '@themes/layout';
import {AppContainer, AppText, AppInput} from '@components';

const SearchScreenView = () => {
  const SearchInputPosition = useSharedValue(0);
  const [titleHeight, setTitleHeight] = useState<number>(0);

  const _renderItem = useCallback(({}) => {
    return <SearchItem />;
  }, []);

  const animatedSearchInputContainerStyle = useAnimatedStyle(() => {
    return {
      top: SearchInputPosition.value,
    };
  });

  const animatedSearchInputStyle = useAnimatedStyle(() => {
    return {
      width: SearchInputPosition.value >= titleHeight / 1.5 ? '100%' : '80%',
    };
  });

  const animatedCancelBtnStyle = useAnimatedStyle(() => {
    return {
      width: SearchInputPosition.value >= titleHeight / 1.5 ? '0%' : '20%',
    };
  });

  const animatedFlatListStyle = useAnimatedStyle(() => {
    return {
      marginTop: SearchInputPosition.value,
      opacity: SearchInputPosition.value >= titleHeight ? 1 : 0,
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: SearchInputPosition.value >= titleHeight / 3 ? 1 : 0,
    };
  });

  const SearchInputRef = useRef<TextInput>();

  const onFocusTextInput = () => {
    SearchInputPosition.value = withTiming(0, {
      duration: 200,
      easing: Easing.linear,
    });
  };

  const onBlurTextInput = () => {
    SearchInputRef.current.clear();
    SearchInputPosition.value = withTiming(titleHeight, {
      duration: 200,
      easing: Easing.linear,
    });
  };

  const clearSearch = () => {
    SearchInputRef.current.clear();
    SearchInputRef.current.blur();
    onBlurTextInput();
  };

  return (
    <AppContainer statusBarProps={{barStyle: 'light-content'}}>
      <View style={styles.header}>
        <Animated.View
          style={animatedTitleStyle}
          onLayout={({nativeEvent}) => {
            const {height} = nativeEvent.layout;
            SearchInputPosition.value = height;
            setTitleHeight(height);
          }}>
          <AppText style={styles.title} fontSize={32} fontWeight={700}>
            Search
          </AppText>
        </Animated.View>
        <Animated.View
          style={[
            layout.row,
            layout.alignItemsCenter,
            styles.animatedSearchContainer,
            animatedSearchInputContainerStyle,
          ]}>
          <Animated.View
            style={[
              layout.row,
              layout.alignItemsCenter,
              styles.searchContainer,
              animatedSearchInputStyle,
            ]}>
            <SvgComponent
              name="SEARCH"
              size={18}
              color={colors.text_secondary}
            />
            <AppInput
              ref={SearchInputRef}
              style={styles.searchInput}
              placeholderTextColor={colors.shadow}
              placeholder="Search"
              onFocus={onFocusTextInput}
              onBlur={onBlurTextInput}
            />
          </Animated.View>
          <Animated.View style={animatedCancelBtnStyle}>
            <Pressable onPress={clearSearch}>
              <AppText>Cancel</AppText>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
      <Animated.View style={[layout.fill, animatedFlatListStyle]}>
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={item => item.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={10}
          onEndReachedThreshold={0.5}
        />
      </Animated.View>
    </AppContainer>
  );
};

export default SearchScreenView;

const styles = AppStyleSheet.create({
  header: {
    paddingHorizontal: 16,
  },
  searchContainer: {
    borderRadius: 10,
    backgroundColor: colors.dark_gray,
    paddingHorizontal: 8,
    marginHorizontal: 16,
  },
  animatedSearchContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
  },
  title: {
    marginBottom: 8,
  },
  searchInput: {
    fontSize: 16,
    marginLeft: 4,
    width: '100%',
    alignSelf: 'flex-start',
    maxWidth: '90%',
    paddingVertical: 8,
  },
});

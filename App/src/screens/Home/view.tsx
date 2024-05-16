import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import PostItem from '../../components/PostItem/';
import AppContainer from '../../components/AppContainer';

const HomeScreenView = () => {
  return (
    <AppContainer useFading={true}>
      <ScrollView>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
    </AppContainer>
  );
};

export default HomeScreenView;

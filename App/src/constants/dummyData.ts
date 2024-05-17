import {loremIpsum, username} from 'react-lorem-ipsum';
import {getRandomItem, getRandomNumber} from '@utils/Random';

const listAvatar = [
  'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const dummyPost = [
  {
    id: 1,
    rootPost: {
      userData: {
        username: username(),
        avatar: getRandomItem(listAvatar),
      },
      post: {
        textContent: loremIpsum({avgSentencesPerParagraph: 1}),
        mediaContent: [{link: '', type: 'image'}],
        time: '2024-05-16T14:38:08.169Z',
        liked: getRandomNumber(100),
        comment: getRandomNumber(100),
        reported: getRandomNumber(100),
      },
    },
    replies: [],
  },
  {
    id: 2,
    rootPost: {
      userData: {
        username: username(),
        avatar: getRandomItem(listAvatar),
      },
      post: {
        textContent: loremIpsum({avgSentencesPerParagraph: 1}),
        time: '2024-05-16T14:38:08.169Z',
        liked: getRandomNumber(100),
        comment: getRandomNumber(100),
        reported: getRandomNumber(100),
      },
    },
    replies: [
      {
        id: 1,
        userData: {
          username: username(),
          avatar: getRandomItem(listAvatar),
        },
        post: {
          textContent: loremIpsum({avgSentencesPerParagraph: 1}),
          mediaContent: [{link: '', type: 'image'}],
          time: '2024-05-16T14:38:08.169Z',
          liked: getRandomNumber(100),
          comment: getRandomNumber(100),
          reported: getRandomNumber(100),
        },
      },
      {
        id: 2,
        userData: {
          username: username(),
          avatar: getRandomItem(listAvatar),
        },
        post: {
          textContent: loremIpsum({avgSentencesPerParagraph: 1}),
          mediaContent: [{link: '', type: 'image'}],
          time: '2024-05-16T14:38:08.169Z',
          liked: getRandomNumber(100),
          comment: getRandomNumber(100),
          reported: getRandomNumber(100),
        },
      },
      {
        id: 3,
        userData: {
          username: username(),
          avatar: getRandomItem(listAvatar),
        },
        post: {
          textContent: loremIpsum({avgSentencesPerParagraph: 1}),
          mediaContent: [{link: '', type: 'image'}],
          time: '2024-05-16T14:38:08.169Z',
          liked: getRandomNumber(100),
          comment: getRandomNumber(100),
          reported: getRandomNumber(100),
        },
      },
    ],
  },
  {
    id: 3,
    rootPost: {
      userData: {
        username: username(),
        avatar: getRandomItem(listAvatar),
      },
      post: {
        textContent: loremIpsum({avgSentencesPerParagraph: 1}),
        mediaContent: [{link: '', type: 'image'}],
        time: '2024-05-16T14:38:08.169Z',
        liked: getRandomNumber(100),
        comment: getRandomNumber(100),
        reported: getRandomNumber(100),
      },
    },
    replies: [
      {
        id: 1,
        userData: {
          username: username(),
          avatar: getRandomItem(listAvatar),
        },
        post: {
          textContent: loremIpsum({avgSentencesPerParagraph: 1}),
          mediaContent: [{link: '', type: 'image'}],
          time: '2024-05-16T14:38:08.169Z',
          liked: getRandomNumber(100),
          comment: getRandomNumber(100),
          reported: getRandomNumber(100),
        },
      },
      {
        id: 2,
        userData: {
          username: username(),
          avatar: getRandomItem(listAvatar),
        },
        post: {
          textContent: loremIpsum({avgSentencesPerParagraph: 1}),
          mediaContent: [{link: '', type: 'image'}],
          time: '2024-05-16T14:38:08.169Z',
          liked: getRandomNumber(100),
          comment: getRandomNumber(100),
          reported: getRandomNumber(100),
        },
      },
    ],
  },
];

export {dummyPost};

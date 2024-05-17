import {loremIpsum, username} from 'react-lorem-ipsum';

const dummyPost = [
  {
    id: 1,
    rootPost: {
      userData: {
        username: username(),
        avatar:
          'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      post: {
        content: loremIpsum({p: 1}),

        time: '2024-05-16T14:38:08.169Z',
        liked: 100,
        comment: 3,
        reported: 10,
      },
    },
    replies: [],
  },
  {
    id: 2,
    rootPost: {
      userData: {
        username: username(),
        avatar:
          'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      post: {
        content: loremIpsum({p: 1}),

        time: '2024-05-16T14:38:08.169Z',
        liked: 100,
        comment: 3,
        reported: 10,
      },
    },
    replies: [
      {
        id: 1,
        userData: {
          username: username(),
          avatar:
            'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        post: {
          content: loremIpsum({p: 1}),

          time: '2024-05-16T14:38:08.169Z',
          liked: 100,
          comment: 3,
          reported: 10,
        },
      },
      {
        id: 2,
        userData: {
          username: username(),
          avatar:
            'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        post: {
          content: loremIpsum({p: 1}),

          time: '2024-05-16T14:38:08.169Z',
          liked: 100,
          comment: 3,
          reported: 10,
        },
      },
      {
        id: 3,
        userData: {
          username: username(),
          avatar:
            'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        post: {
          content: loremIpsum({p: 1}),

          time: '2024-05-16T14:38:08.169Z',
          liked: 100,
          comment: 3,
          reported: 10,
        },
      },
    ],
  },
  {
    id: 3,
    rootPost: {
      userData: {
        username: username(),
        avatar:
          'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      post: {
        content: loremIpsum({p: 1}),

        time: '2024-05-16T14:38:08.169Z',
        liked: 100,
        comment: 3,
        reported: 10,
      },
    },
    replies: [
      {
        id: 1,
        userData: {
          username: username(),
          avatar:
            'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        post: {
          content: loremIpsum({p: 1}),

          time: '2024-05-16T14:38:08.169Z',
          liked: 100,
          comment: 3,
          reported: 10,
        },
      },
      {
        id: 2,
        userData: {
          username: username(),
          avatar:
            'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        post: {
          content: loremIpsum({p: 1}),

          time: '2024-05-16T14:38:08.169Z',
          liked: 100,
          comment: 3,
          reported: 10,
        },
      },
    ],
  },
];

export {dummyPost};

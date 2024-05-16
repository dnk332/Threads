import {loremIpsum, username} from 'react-lorem-ipsum';

const dummyPost = [
  {
    id: 1,
    postData: [
      {
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
    id: 2,
    postData: [
      {
        userData: {
          username: username(),
          avatar:
            'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        post: {
          content: loremIpsum({p: 1}),
          time: '2024-05-16T14:38:08.169Z',
          liked: 1,
          comment: 3,
          reported: 10,
        },
      },
      {
        userData: {
          username: username(),
          avatar:
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        post: {
          content: loremIpsum({p: 1}),
          time: '2024-05-16T14:38:08.169Z',
          liked: 1,
          comment: 3,
          reported: 10,
        },
      },
    ],
  },
];

export {dummyPost};

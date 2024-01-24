import { IPost } from '../../interfaces/IPost';

const postMock: IPost = {
  title: 'Primeiro Post',
  content: 'Esse é um post de teste',
  userId: '62cf1fc6498565d94eba52cd',
};

const postMockWithId: IPost & { _id: string; published: string; updated: string } = {
  _id: '65b064c3b5b29a5cda4bfaed',
  title: 'Primeiro Post',
  content: 'Esse é um post de teste',
  userId: '62cf1fc6498565d94eba52cd',
  published: '2024-01-24T01:15:47.110Z',
  updated: '2024-01-24T01:15:47.110Z',
};

const allPostMock: IPost[] & { _id: string; published: string; updated: string }[] = [
  {
    _id: '65b064c3b5b29a5cda4bfaed',
    title: 'Primeiro Post',
    content: 'Esse é um post de teste',
    userId: '62cf1fc6498565d94eba52cd',
    published: '2024-01-24T01:15:47.110Z',
    updated: '2024-01-24T01:15:47.110Z',
  },
  {
    _id: '68b064c3b5b29a5cda4bfaed',
    title: 'Segundo Post',
    content: 'Esse foi o segundo post',
    userId: '62cf1fc6498565d94eba52cd',
    published: '2024-01-24T01:15:47.110Z',
    updated: '2024-01-24T01:15:47.110Z',
  },
  {
    _id: '69b064c3b5b29a5cda4bfaed',
    title: 'Terceiro Post',
    content: 'Esse fo o terceiro post',
    userId: '62cf1fc6498565d94eba52cd',
    published: '2024-01-24T01:15:47.110Z',
    updated: '2024-01-24T01:15:47.110Z',
  },
];

const postChangeMock: IPost = {
  title: 'Novo Título',
  content: 'Achei melhor trocar o título de post',
  userId: '62cf1fc6498565d94eba52cd',
};

const postChangeMockWithId: IPost & { _id: string; published: string; updated: string } = {
  _id: '65b064c3b5b29a5cda4bfaed',
  title: 'Novo Título',
  content: 'Achei melhor trocar o título de post',
  userId: '62cf1fc6498565d94eba52cd',
  published: '2024-01-24T01:15:47.110Z',
  updated: '2024-01-25T01:15:47.110Z',
};

const postDeletedMockWithId: IPost & { _id: string; published: string; updated: string } = {
  _id: '65b064c3b5b29a5cda4bfaed',
  title: 'Novo Título',
  content: 'Achei melhor trocar o título de post',
  userId: '62cf1fc6498565d94eba52cd',
  published: '2024-01-24T01:15:47.110Z',
  updated: '2024-01-25T01:15:47.110Z',
};

export { postMock, postMockWithId, allPostMock, postChangeMock, postChangeMockWithId, postDeletedMockWithId };

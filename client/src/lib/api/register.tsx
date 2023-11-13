import client from './client';
import { AxiosResponse } from 'axios';
import { GetListType, RegisterState } from '../../modules/register/type';

export const registerForm = ({
  form,
  userNum,
}: {
  form: RegisterState;
  userNum: number;
}): Promise<AxiosResponse> => {
  return client.post('/register', { form, userNum });
};

export const getList = (data: GetListType): Promise<AxiosResponse> => {
  return client.get('/register/list', { params: data });
};

export const getPopularList = (): Promise<AxiosResponse> => {
  return client.get('/register/popularList');
};

export const getForm = (postId: Number): Promise<AxiosResponse> => {
  return client.get('/register/post/:postId', { params: postId });
};

export const postClose = (postId: Number): Promise<AxiosResponse> => {
  return client.post(`/register/close/${postId}`, postId);
};

export const postDelete = (postId: Number): Promise<AxiosResponse> => {
  return client.post(`/register/delete/${postId}`, postId);
};

export const postComment = ({
  comment,
  postId,
  userNum,
}: {
  comment: RegisterState;
  postId: number;
  userNum: number;
}): Promise<AxiosResponse> => {
  return client.post(`/register/postComment/${postId}`, {
    comment,
    postId,
    userNum,
  });
};

export const getComment = (postId: Number): Promise<AxiosResponse> => {
  return client.get('/register/getComment/:postId', { params: postId });
};

export const modifyForm = ({
  form,
  postId,
}: {
  form: RegisterState;
  postId: Number;
}): Promise<AxiosResponse> => {
  return client.post(`/register/modifyForm/${postId}`, { form, postId });
};

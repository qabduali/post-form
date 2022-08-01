import 'antd/dist/antd.css';

import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

import { axiosInstance as axios } from './axios';

export const postForm = async (data): Promise<AxiosResponse> => {
  return await axios.post('support', JSON.stringify(data));
};

export function useMutateForm() {
  return useMutation(['postForm'], (form) => postForm(form), {
    onSuccess: () => {
      notification['success']({
        description: 'Your form has been accepted',
        message: 'Success',
      });
    },
  });
}

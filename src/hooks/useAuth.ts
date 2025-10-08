import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function UseAuth() {
  const loginMutation = useMutation({
    mutationFn: async data => {
      return await axios.post('/api/auth/login', data);
    },
    onSuccess: data => {
      console.log(data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async data => {
      return await axios.post('/api/auth/register', data);
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
}

export default UseAuth;

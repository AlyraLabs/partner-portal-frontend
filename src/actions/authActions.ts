'use server';

import { cookies } from 'next/headers';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

export async function isAuthenticated() {
  const { value: accessToken } = (await cookies())?.get('access_token') || {};

  return !!accessToken;
}

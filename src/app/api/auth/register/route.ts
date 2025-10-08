import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createServerAxios } from '@/lib/axios/server';

export type RegisterBody = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  accessToken: string;
  user?: { id: string; email: string; name?: string };
};

const THIRTY_DAYS = 30 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as RegisterBody;
    const cookieStore = await cookies();
    const axios = createServerAxios();

    const response = await axios.post<RegisterResponse>('/auth/register', {
      email,
      password,
    });
    console.log(response);
    // const token = response.data.accessToken;
    //
    // if (token) {
    //   cookieStore.set('access_token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'lax',
    //     maxAge: THIRTY_DAYS,
    //     path: '/',
    //   });
    // }

    return NextResponse.json({
      success: true,
      message: 'Register successful',
    });
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

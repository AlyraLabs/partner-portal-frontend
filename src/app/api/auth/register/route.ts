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

    const token = response.data.accessToken;

    if (token) {
      cookieStore.set('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: THIRTY_DAYS,
        path: '/',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Register successful',
      user: response.data.user,
    });
  } catch (error: unknown) {
    let status = 500;
    let message = 'Internal server error';

    if (typeof error === 'object' && error !== null) {
      const err = error as { status?: number; data?: { message?: string } };
      if (typeof err.status === 'number') status = err.status;
      if (typeof err.data?.message === 'string') message = err.data.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message,
        status,
      },
      { status }
    );
  }
}

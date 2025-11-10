import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerAxios } from '@/lib/axios/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const axios = createServerAxios();
    const accessToken = cookieStore.get('access_token');

    if (!accessToken) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const response = await axios.get('/auth/me');

    return NextResponse.json({
      success: true,
      data: response.data,
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

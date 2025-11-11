import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerAxios } from '@/lib/axios/server';

export async function DELETE() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const axios = createServerAxios();

  if (!accessToken) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { data } = await axios.delete('/auth/account');

    cookieStore.delete('access_token');
    return NextResponse.json({
      success: true,
      message: data.message || 'Account deleted successfully',
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

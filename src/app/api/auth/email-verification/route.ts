import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createServerAxios } from '@/lib/axios/server';

export type EmailVerificationBody = {
  code: string;
  session: string;
};

export type EmailVerificationResponse = {
  success: boolean;
  message: string;
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get('session');
  const { code } = (await request.json()) as EmailVerificationBody;
  const axios = createServerAxios();

  try {
    const { data } = await axios.post<EmailVerificationResponse>('/auth/confirm-email', {
      code,
      session,
    });

    if (!data.success) {
      throw { status: 422, data };
    }

    return NextResponse.json({
      success: data.success,
      message: data.message || 'Email verification successful',
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

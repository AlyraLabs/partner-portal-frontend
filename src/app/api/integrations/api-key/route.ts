import { NextResponse } from 'next/server';

import { createServerAxios } from '@/lib/axios/server';

export async function GET() {
  const axios = createServerAxios();

  try {
    const { data } = await axios.post('/integrations/generate-api-key');

    return NextResponse.json({
      success: true,
      data: data,
      message: data.message || 'Api key generated successfully',
    });
  } catch (error: unknown) {
    let status = 500;
    let message = 'Failed to create integration';

    if (typeof error === 'object' && error !== null) {
      const err = error as { status?: number; data?: { message?: string } };
      if (typeof err.status === 'number') status = err.status;
      if (typeof err.data?.message === 'string') message = err.data.message;

      console.error('Backend error:', err.data);
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status }
    );
  }
}

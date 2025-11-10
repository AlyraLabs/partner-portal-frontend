import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createServerAxios } from '@/lib/axios/server';
import { CreateIntegrationDto, Integration } from '@/types/integration';

export type IntegrationsResponse = {
  success: boolean;
  data?: Integration[];
  message?: string;
};

export type IntegrationResponse = {
  success: boolean;
  data?: Integration;
  message?: string;
};

// GET - Fetch all integrations
export async function GET() {
  const accessToken = (await cookies()).get('access-token');
  if (!accessToken) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  try {
    const axios = createServerAxios();
    const response = await axios.get<Integration[]>('/integrations');

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error: unknown) {
    let status = 500;
    let message = 'Failed to fetch integrations';

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
      },
      { status }
    );
  }
}

// POST - Create a new integration
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateIntegrationDto;
    const axios = createServerAxios();

    // Send only the string field to backend
    const response = await axios.post<Integration>('/integrations', {
      string: body.string,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
      message: 'Integration created successfully',
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

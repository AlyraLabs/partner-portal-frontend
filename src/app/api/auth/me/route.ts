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

    const response = axios.get('/auth/profile');
    console.log(response);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Auth check API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

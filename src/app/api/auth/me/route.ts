import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // TODO: Validate session with backend
    // Example: const response = await fetch(`${process.env.BACKEND_URL}/auth/validate-session`, {
    //   headers: { 'Authorization': `Bearer ${sessionCookie.value}` }
    // });

    // Simulate session validation (replace with actual backend call)
    const userData = validateSession(sessionCookie.value);
    
    if (!userData) {
      // Clear invalid session
      cookieStore.delete('session');
      return NextResponse.json(
        { message: 'Invalid session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error('Auth check API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simulate session validation (replace with actual backend call)
function validateSession(sessionToken: string) {
  try {
    // TODO: Replace with actual session validation from backend
    const payload = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    
    // Check if session is not too old (24 hours for demo)
    const isExpired = Date.now() - payload.timestamp > 24 * 60 * 60 * 1000;
    
    if (isExpired) {
      return null;
    }

    return {
      id: '1',
      email: payload.email,
      name: payload.email.split('@')[0],
    };
  } catch {
    return null;
  }
}

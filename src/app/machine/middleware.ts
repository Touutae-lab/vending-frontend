import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const middleware = async (req: NextRequest) => {
    const jwt = req.cookies.get('auth-token');
  

    const url = req.nextUrl.clone();
    if (!jwt && !url.pathname.includes('/machine/api/login')) {
      if (url.pathname.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      } else {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }
  
    return NextResponse.next();
  };
  
  export default middleware;
  
  export const config = {
    matcher: ['/machine/:path*', '/api/:path*'],
  };
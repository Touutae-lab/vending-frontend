import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const middleware = async (req: NextRequest) => {
    const jwt = req.cookies.get('auth-token');
  

    const url = req.nextUrl.clone();
    if (!jwt && !url.pathname.includes('/machine/api/login')) {
      if (url.pathname.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      } else {
        url.pathname = '/machine/';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.rewrite(url);
  };
  
  export default middleware;
  
  export const config = {
    matcher: ['/machine/:path*', '/api/:path*', '/machine/api/:path*/:id*'],
  };
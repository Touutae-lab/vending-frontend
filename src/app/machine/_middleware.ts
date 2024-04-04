import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';


const middleware = async (req: NextRequest) => {
    const jwt = req.cookies.get('auth-token');

    const isValid = jwt && await verify(jwt);

    if (!isValid) {
        return NextResponse.redirect('/login');
    }
}

const verify = async (jwt: RequestCookie): Promise<Boolean> => {

    return true;
}

export default middleware;
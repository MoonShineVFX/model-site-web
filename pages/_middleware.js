import { NextRequest, NextResponse } from 'next/server';

export function middleware (req = NextRequest) {

    console.log('betty req:', req)

    // const res = NextResponse.rewrite(new URL('/', req.url));
    // res.cookie('wtf', 'betty');

    // // console.log('betty res:', res)
    // return res;
    // return new Response('Hello world!');

}

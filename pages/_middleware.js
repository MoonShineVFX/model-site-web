import { NextResponse } from 'next/server';

export function middleware () {

    let response = NextResponse.next();
    return response;

}

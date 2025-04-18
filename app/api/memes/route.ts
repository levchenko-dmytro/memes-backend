import { NextResponse } from 'next/server';
import memes from '../../../storage/memes.json' assert { type: "json" };

export async function GET() {
  return NextResponse.json(memes);
}

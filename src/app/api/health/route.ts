import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        message: 'FreteConnect API is running'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "API funcionando corretamente!",
    timestamp: new Date().toISOString(),
    status: "success",
    upstreamError: false
  });
}

export async function POST() {
  return NextResponse.json({
    message: "POST request funcionando!",
    timestamp: new Date().toISOString(),
    status: "success"
  });
}
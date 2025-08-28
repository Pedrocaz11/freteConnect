export async function GET() {
  return Response.json({
    status: "🎉 EMERGENCY FIX SUCCESS!",
    message: "API funcionando perfeitamente!",
    timestamp: new Date().toISOString(),
    upstreamError: false,
    nextjs: "OK",
    preview: "FUNCIONANDO",
    build: "SUCESSO"
  });
}

export async function POST() {
  return Response.json({
    status: "POST funcionando!",
    timestamp: new Date().toISOString()
  });
}
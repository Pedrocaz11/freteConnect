export async function GET() {
  return Response.json({
    status: "success",
    message: "API funcionando!",
    timestamp: new Date().toISOString(),
    upstreamError: false
  });
}
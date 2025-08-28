"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro da aplicação:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Algo deu errado!
          </CardTitle>
          <CardDescription>
            Ocorreu um erro inesperado. Tente novamente ou volte à página inicial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar Novamente
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
          
          {process.env.NODE_ENV === "development" && (
            <div className="pt-4 border-t text-left">
              <p className="text-xs text-gray-600 mb-2">Erro (desenvolvimento):</p>
              <code className="text-xs bg-gray-100 p-2 rounded block overflow-auto">
                {error.message}
              </code>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
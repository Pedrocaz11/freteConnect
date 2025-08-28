import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 text-6xl font-bold text-blue-600">
            404
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Página não encontrada
          </CardTitle>
          <CardDescription>
            A página que você está procurando não existe ou foi movida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Página Anterior
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              Se você acredita que isso é um erro, entre em contato conosco.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
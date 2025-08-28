import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FreteConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectamos motoristas a oportunidades de frete de forma rápida e segura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card para Motoristas */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Sou Motorista</CardTitle>
              <CardDescription className="text-base">
                Encontre fretes disponíveis na sua região e aumente sua renda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Fretes verificados e seguros
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Pagamento garantido
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Escolha seus horários
                </li>
              </ul>
              <Link href="/register?type=driver" className="block">
                <Button className="w-full" size="lg">
                  Cadastrar como Motorista
                </Button>
              </Link>
              <Link href="/login?type=driver" className="block">
                <Button variant="outline" className="w-full">
                  Já tenho conta
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card para Clientes */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Tenho Frete</CardTitle>
              <CardDescription className="text-base">
                Publique seu frete e encontre motoristas confiáveis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Motoristas verificados
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Acompanhamento em tempo real
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Preços competitivos
                </li>
              </ul>
              <Link href="/register?type=client" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Cadastrar como Cliente
                </Button>
              </Link>
              <Link href="/login?type=client" className="block">
                <Button variant="outline" className="w-full">
                  Já tenho conta
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            Mais de 10.000 fretes realizados com sucesso
          </p>
        </div>
      </div>
    </div>
  );
}
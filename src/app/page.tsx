export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FreteConnect
          </h1>
          <p className="text-xl text-gray-600">
            Conectamos motoristas a oportunidades de frete de forma rápida e segura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card para Motoristas */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚛</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Sou Motorista</h2>
              <p className="text-gray-600">
                Encontre fretes disponíveis na sua região e aumente sua renda
              </p>
            </div>
            
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>✓ Fretes verificados e seguros</li>
              <li>✓ Pagamento garantido</li>
              <li>✓ Escolha seus horários</li>
            </ul>
            
            <div className="space-y-3">
              <a 
                href="/register?type=driver" 
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
              >
                Cadastrar como Motorista
              </a>
              <a 
                href="/login?type=driver" 
                className="block w-full border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50"
              >
                Já tenho conta
              </a>
            </div>
          </div>

          {/* Card para Clientes */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Tenho Frete</h2>
              <p className="text-gray-600">
                Publique seu frete e encontre motoristas confiáveis
              </p>
            </div>
            
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>✓ Motoristas verificados</li>
              <li>✓ Acompanhamento em tempo real</li>
              <li>✓ Preços competitivos</li>
            </ul>
            
            <div className="space-y-3">
              <a 
                href="/register?type=client" 
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
              >
                Cadastrar como Cliente
              </a>
              <a 
                href="/login?type=client" 
                className="block w-full border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50"
              >
                Já tenho conta
              </a>
            </div>
          </div>
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
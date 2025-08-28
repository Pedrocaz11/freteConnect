export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ✅ Preview Funcionando!
          </h1>
          <p className="text-gray-600">
            Se você está vendo esta página, o upstream error foi resolvido.
          </p>
        </div>
        
        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-green-600 font-medium">✅ Online</span>
          </div>
          <div className="flex justify-between">
            <span>Build:</span>
            <span className="text-green-600 font-medium">✅ Sucesso</span>
          </div>
          <div className="flex justify-between">
            <span>Preview:</span>
            <span className="text-green-600 font-medium">✅ Funcionando</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <a 
            href="/" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  );
}
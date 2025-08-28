export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f9ff',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          color: '#1f2937',
          marginBottom: '20px'
        }}>
          🚛 FreteConnect
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#6b7280',
          marginBottom: '40px'
        }}>
          Conectamos motoristas a oportunidades de frete
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚛</div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Sou Motorista</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Encontre fretes disponíveis
            </p>
            <a 
              href="/register?type=driver"
              style={{
                display: 'block',
                background: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                marginBottom: '10px'
              }}
            >
              Cadastrar como Motorista
            </a>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Tenho Frete</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Publique seu frete
            </p>
            <a 
              href="/register?type=client"
              style={{
                display: 'block',
                background: '#10b981',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                marginBottom: '10px'
              }}
            >
              Cadastrar como Cliente
            </a>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#ecfdf5',
          borderRadius: '10px',
          border: '1px solid #bbf7d0'
        }}>
          <h3 style={{ color: '#065f46', marginBottom: '10px' }}>✅ Preview Funcionando!</h3>
          <p style={{ color: '#047857', fontSize: '14px' }}>
            Se você está vendo esta página, o emergency fix funcionou!
          </p>
          <div style={{ marginTop: '10px' }}>
            <a href="/emergency-test" style={{ color: '#059669', textDecoration: 'underline' }}>
              Ir para página de teste →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
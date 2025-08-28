export default function EmergencyTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        
        <h1 style={{ 
          color: '#1f2937', 
          marginBottom: '15px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          EMERGENCY FIX FUNCIONOU!
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Se você está vendo esta página, o preview está funcionando perfeitamente!
        </p>
        
        <div style={{
          background: '#f0fdf4',
          border: '2px solid #bbf7d0',
          borderRadius: '10px',
          padding: '20px',
          margin: '20px 0',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#065f46', marginBottom: '15px', fontSize: '18px' }}>
            ✅ Status do Sistema:
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
            <span style={{ color: '#374151' }}>Preview:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ FUNCIONANDO</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
            <span style={{ color: '#374151' }}>Next.js:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ OK</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
            <span style={{ color: '#374151' }}>Upstream Error:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ RESOLVIDO</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
            <span style={{ color: '#374151' }}>Build:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ SUCESSO</span>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            ← Voltar ao Início
          </a>
          
          <a 
            href="/api/emergency-test"
            style={{
              display: 'inline-block',
              background: '#10b981',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Testar API →
          </a>
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          fontSize: '12px', 
          color: '#9ca3af',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '15px'
        }}>
          Emergency Fix aplicado com sucesso!<br/>
          Timestamp: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
}
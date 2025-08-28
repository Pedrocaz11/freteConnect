export default function TestSimple() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ color: '#1f2937', marginBottom: '10px' }}>Preview Funcionando!</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Se você está vendo esta página, o problema foi resolvido.
        </p>
        
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '6px',
          padding: '15px',
          margin: '20px 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
            <span>Status:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Online</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
            <span>Preview:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Funcionando</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
            <span>Upstream:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Resolvido</span>
          </div>
        </div>

        <a 
          href="/" 
          style={{
            display: 'inline-block',
            background: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px'
          }}
        >
          Voltar ao FreteConnect
        </a>
      </div>
    </div>
  );
}
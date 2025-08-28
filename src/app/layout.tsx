import "./globals.css";

export const metadata = {
  title: "FreteConnect - Conectando Motoristas e Clientes",
  description: "Plataforma para conectar motoristas a oportunidades de frete",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
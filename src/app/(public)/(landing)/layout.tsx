export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <nav>Landing Aqui va el navbar se peude crear un componenet</nav>
      <div>
        {children}
      </div>
      <footer>Lading Aqui va el footer se puede crear un componente</footer>
    </div>
  );
}

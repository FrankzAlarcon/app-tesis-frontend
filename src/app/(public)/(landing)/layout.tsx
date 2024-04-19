import Footer from "./_components/footer";
import Header from "./_components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <header>
        <Header />
      </header>
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
}

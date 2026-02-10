import "./globals.css";
import Header from "./components/Header";
import GlobalScrollTrigger from "./components/GlobalScrollTrigger";
import GlobalFloating from "./components/GlobalFloating";
import LenisProvider from "./components/Lenis";

        

export const metadata = {
  title: "My Next Project",
  description: "Next.js Project",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-black smooth-wrapper">
        <Header />
        <LenisProvider />
        <GlobalFloating />
        <GlobalScrollTrigger />
        
        <div id="smooth-content">
        
         
         
        {/*children*/}

          {children}
          </div>
      </body>
    </html>
  );
}

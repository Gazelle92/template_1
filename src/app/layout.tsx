import "./globals.scss";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>
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

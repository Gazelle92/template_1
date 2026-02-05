import "./globals.css";
import Header from "./components/Header";
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
      <body className="bg-white text-black">
        <Header />
        {children}
      </body>
    </html>
  );
}

import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/AuthContext"; 

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Vibely",
  description: "Mạng xã hội học tập kết nối các bạn học sinh, sinh viên",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} antialiased`}>
        <AuthContextProvider>  {/* Bọc toàn bộ ứng dụng trong AuthContextProvider */}
          <ThemeProvider attribute="class">
            <Header />
            {children}
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

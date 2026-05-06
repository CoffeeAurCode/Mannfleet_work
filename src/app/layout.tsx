import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import LogoIntro from "@/components/LogoIntro";
import ContentReveal from "@/components/ContentReveal";
export const metadata: Metadata = {
  title: "Mann Fleet Partners — Premium Car Rental",
  description: "Drive in style with Mann Fleet Partners. Premium vehicles for every journey.",
};

const themeScript = `(function(){try{var s=localStorage.getItem('mannfleet-theme');if(s!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LogoIntro />
        <ContentReveal>
          <ThemeProvider>{children}</ThemeProvider>
        </ContentReveal>
      </body>
    </html>
  );
}

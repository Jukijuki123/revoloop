import "./globals.css";
import "leaflet/dist/leaflet.css";
import ClientProviders from "@/components/layout/ClientProviders";

export const metadata = {
  title: {
    default: "REVOLOOP — Ubah Sampah Jadi Rupiah",
    template: "%s | REVOLOOP",
  },
  description:
    "Platform digital untuk mengedukasi dan membantu masyarakat mengelola sampah menjadi nilai ekonomi. Temukan bank sampah, tukar sampah jadi uang, dan pelajari daur ulang.",
  keywords: [
    "REVOLOOP", "bank sampah", "daur ulang", "tukar sampah",
    "ekonomi sirkular", "lingkungan", "SDGs",
  ],
  openGraph: {
    title: "REVOLOOP — Ubah Sampah Jadi Rupiah",
    description: "Platform digital pengelolaan sampah dan ekonomi sirkular.",
    url: "https://revoloop.vercel.app",
    siteName: "REVOLOOP",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="scroll-smooth">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

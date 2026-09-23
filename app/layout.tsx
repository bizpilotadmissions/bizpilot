import "./globals.css";

export const metadata = {
  title: "BizPilot | Automated Lead Ingestion & Admission Engine",
  description: "Capture, automate, and convert leads across Instagram, WhatsApp, and Email.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
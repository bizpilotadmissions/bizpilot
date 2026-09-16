import { AuthProvider } from "@/app/context/AuthContext";
import { LeadProvider } from "@/app/context/LeadContext";
import "./globals.css";

export const metadata = {
  title: "Apex Academy - BizPilot Admissions",
  description: "Admissions & Lead Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 antialiased font-sans">
        <AuthProvider>
          <LeadProvider>{children}</LeadProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
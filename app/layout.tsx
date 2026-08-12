import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"HH Goa 2026 — Frame In Goa",description:"Create, download and share your HH Goa 2026 builder identity.",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000")};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
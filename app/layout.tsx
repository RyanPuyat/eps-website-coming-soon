import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://epscorner.com";

export const metadata: Metadata = {
  title: {
    default: "EPS Corner — EPS-TOPIK, KLT & SCBT Reviewer for OFWs",
    template: "%s | EPS Corner",
  },
  description:
    "Free and premium EPS-TOPIK, KLT, and SCBT reviewer for Filipino workers applying for jobs in Korea. Practice real exam-format questions for reading, listening, and all 8 SCBT categories. Join the waitlist for early access.",
  keywords: [
    "EPS-TOPIK reviewer",
    "EPS TOPIK Philippines",
    "KLT reviewer",
    "SCBT reviewer",
    "EPS TOPIK practice test",
    "Korean language test for OFW",
    "EPS TOPIK Philippines review",
    "SCBT exam Korea job",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EPS Corner — EPS-TOPIK, KLT & SCBT Reviewer for OFWs",
    description:
      "Practice real EPS-TOPIK, KLT, and SCBT exam-format questions. Join the waitlist for early access.",
    url: SITE_URL,
    siteName: "EPS Corner",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "EPS Corner — EPS-TOPIK, KLT & SCBT Reviewer for OFWs",
    description:
      "Practice real EPS-TOPIK, KLT, and SCBT exam-format questions. Join the waitlist for early access.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  // Add this once you register the domain in Google Search Console —
  // Settings > Ownership verification > HTML tag method gives you this value.
  // verification: { google: "PASTE_VERIFICATION_CODE_HERE" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EPS Corner",
  url: SITE_URL,
  description:
    "Korean exam prep platform for Filipino workers preparing for EPS-TOPIK, KLT, and SCBT employment visa exams.",
  areaServed: "PH",
  audience: {
    "@type": "Audience",
    audienceType: "Overseas Filipino Workers (OFW) applying under the EPS employment program",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

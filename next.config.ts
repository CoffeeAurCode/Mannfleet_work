import type { NextConfig } from "next";

// Investor PDFs used to sit flat in public/investors/. They now live in one
// folder per investors-page tab. These redirects keep the old flat URLs
// working, since some were shared outside the site before the move.
const MOVED_INVESTOR_DOCS: Record<string, string[]> = {
  "annual-reports": [
    "Annual-Report_2021-22.pdf",
    "Annual-Report_2022-23.pdf",
    "Annual-Report_2023-24.pdf",
    "Annual-Report_2024-25.pdf",
    "Annual-Report_2025-26.pdf",
  ],
  "annual-returns": [
    "Annual-Return_2021-22_Mann.pdf",
    "Annual-Return_2022-23_Mann.pdf",
    "Annual-Return_2023-24_Mann.pdf",
    "Annual-Return_2024-25_Mann.pdf",
  ],
  "board-reports": [
    "Board-Report_2021-22.pdf",
    "Board-Report_2022-23.pdf",
    "Board-Report_2023-24.pdf",
    "Board-Report_2024-25.pdf",
    "Board-Report_2025-26.pdf",
  ],
  "constitutive-documents": [
    "Articles-of-Association.pdf",
    "Certificate-of-Incorporation_Change-of-Name-2025.pdf",
    "Memorandum-of-Association.pdf",
  ],
  "corporate-information": [
    "Certificate-of-Incorporation_Conversion-to-Public-Company-2024.pdf",
    "Certificate-of-Incorporation_Original-1992.pdf",
    "Composition-of-Committee.pdf",
    "Contact-Details-Grievance-Redressal.pdf",
    "Details-of-Business.pdf",
    "Details-of-KMPs-authorized-to-determine-Materiality.pdf",
    "Terms-of-Appointment_Independent-Directors.pdf",
  ],
  "csr-certificates": [
    "Utilization-Certificate_CSR_Global-Social_2024-25.pdf",
    "Utilization-Certificate_Impact-Paramedical_2023-24.pdf",
  ],
  "financial-statements": [
    "Financial-Statements_2021-22.pdf",
    "Financial-Statements_2022-23.pdf",
    "Financial-Statements_2023-24.pdf",
    "Financial-Statements_2024-25_Audited.pdf",
    "Financial-Statements_2025-26_Standalone_Audited.pdf",
  ],
  "group-company": [
    "Financial-Statements_Mann-Tours_2022.pdf",
    "Financial-Statements_Mann-Tours_2023.pdf",
    "Financial-Statements_Mann-Tours_2024-25.pdf",
    "Financial-Statements_Mann-Tours_2024.pdf",
    "Mann-Tours_Annual-Return_2021-22.pdf",
    "Mann-Tours_Annual-Return_2022-23.pdf",
    "Mann-Tours_Annual-Return_2023-24.pdf",
    "Mann-Tours_Annual-Return_2024-25.pdf",
  ],
  "ipo": [
    "DRHP-Mann-Fleet-Partners-Limited.pdf",
    "Draft-Abridged-Prospectus_Mann.pdf",
    "Industry-Assessment-Report_Mann.pdf",
  ],
  "newspaper-advertisements": [
    "Newspaper-Advertisement_Financial-Express_Delhi.pdf",
    "Newspaper-Advertisement_Jansatta_Delhi.pdf",
    "Newspaper-Advertisement_Pratah-Kiran_Delhi.pdf",
  ],
  "policies": [
    "Board-Diversity-Policy_Mann.pdf",
    "CSR-Policy_Mann.pdf",
    "Code-of-Conduct-for-Directors-and-SMP_Mann.pdf",
    "Code-of-Conduct-for-Prevention-of-Insider-Trading_Mann.pdf",
    "Documents-Preservation-and-Archival-Policy_Mann.pdf",
    "Familiarisation-Programme-for-Independent-Directors_Mann.pdf",
    "Nomination-Remuneration-Policy_Mann.pdf",
    "Policy-for-determining-Material-Subsidiaries_Mann.pdf",
    "Policy-on-Determination-of-Materiality-for-Disclosure-of-Events-Information_Mann.pdf",
    "Policy-on-Materiality-of-Related-Party-Transaction_Mann.pdf",
    "Policy-on-Succession-Planning-of-Board-and-Senior-Management_Mann.pdf",
    "Prevention-of-Sexual-Harassment-at-Workplace_Mann.pdf",
    "Whistle-Blower-Policy_Mann.pdf",
  ],
  "subsidiary-company": [
    "Financial-Statements_Leap-Green-Infra_2024-25.pdf",
    "Leap-Green-Infra-Audited-Balance-Sheet_December-2025.pdf",
    "Leap-Green-Infra-Audited-Balance-Sheet_October-2025.pdf",
    "Leap-Green-Infra_Annual-Return_2024-25.pdf",
  ],
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return Object.entries(MOVED_INVESTOR_DOCS).flatMap(([folder, files]) =>
      files.map((file) => ({
        source: `/investors/${file}`,
        destination: `/investors/${folder}/${file}`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;

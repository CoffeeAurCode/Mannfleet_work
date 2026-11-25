import type { Metadata } from "next";
import StaffVehicleDetails from "@/components/StaffVehicleDetails";

export const metadata: Metadata = {
  title: "Send vehicle details — Mann Fleet staff",
  robots: { index: false, follow: false },
};

export default function StaffVehicleDetailsPage() {
  return <StaffVehicleDetails />;
}

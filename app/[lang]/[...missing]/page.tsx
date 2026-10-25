import { notFound } from "next/navigation";

// This segment never renders, so there is nothing to validate for instant navigation.
export const instant = false;

// Unknown paths under a valid language render the localized 404 (with header and footer) instead of the bare global one.
export default function MissingPage() {
  notFound();
}

import AppShell from "@/components/AppShell";

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}

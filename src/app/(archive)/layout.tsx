import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-56 pt-14 p-8 min-h-screen bg-slate-50">
        <div className="mx-auto" style={{ maxWidth: "1400px" }}>
          {children}
        </div>
      </main>
    </>
  );
}

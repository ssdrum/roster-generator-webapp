import Navbar from "@/app/ui/navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />

      {children}
    </section>
  );
}

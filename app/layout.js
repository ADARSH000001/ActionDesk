import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ToastProvider } from "@/components/ui/Toast";
import { NotificationProvider } from "@/lib/notifications";

export const metadata = {
  title: {
    default: "ActionDesk",
    template: "%s · ActionDesk",
  },
  description:
    "An intelligent workspace that transforms scattered business communication into organised actions.",
  keywords: ["business", "CRM", "invoices", "action management", "AI"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <ToastProvider>
          <NotificationProvider>
            {/* App shell: sidebar + content column */}
            <div className="flex h-screen overflow-hidden bg-bg">

              {/* Sidebar */}
              <Sidebar />

              {/* Main column */}
              <div className="flex flex-1 flex-col overflow-hidden">
                <Header />

                {/* Page content */}
                <main
                  id="main-content"
                  className="flex-1 overflow-y-auto scroll-smooth"
                >
                  <div className="mx-auto max-w-[1600px] px-8 py-8 lg:px-14 xl:px-20">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </NotificationProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

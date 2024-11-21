import Navbar from "@/pages/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <header className="fixed h-24 top-0 flex items-center z-50 gap-2 left-0 right-0 dark:bg-inherit">
          <Navbar />
        </header>
        <main className="relative top-28">
          <Outlet />
          <footer className="footer text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Student Brochure System. All
            rights reserved.
          </footer>
        </main>
      </ThemeProvider>
    </>
  );
}
export default App;

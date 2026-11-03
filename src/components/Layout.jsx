import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Wraps every page. <Outlet /> is where the page for the current URL appears.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet /> {/* ← This is the actual component, not a comment */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;

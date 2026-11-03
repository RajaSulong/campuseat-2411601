import { Link, useParams, useSearchParams } from "react-router";
import { useVendors } from "../hooks/useVendors.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function VendorPage() {
  // 1. Get the vendor ID from the URL
  const { id } = useParams();

  // 2. S8 Feature (Digit 1): Use URL search params for the category filter
  // Rules of hooks: must be at the top, before any returns!
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get("cat") ?? ""; // '' when the URL has no ?cat=

  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">
          There is no vendor called "{id}". <Link to="/">Back to vendors</Link>
        </p>
      </section>
    );
  }

  // 3. Filter the menu based on the 'cat' URL parameter
  const categories = ["All", "Main Dish", "Add Ons", "Drinks"];

  const shown = vendor.menu.filter(
    (item) => cat === "" || cat === "All" || item.category === cat,
  );

  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>

      {/* 4. Category buttons that update the URL instead of useState */}
      <div className="category-filter">
        {categories.map((c) => (
          <button
            key={c}
            className={`btn ${cat === c || (cat === "" && c === "All") ? "active" : ""}`}
            onClick={() => {
              // If 'All', clear the param. Otherwise set 'cat'.
              // { replace: true } stops every click from adding a new history entry.
              setSearchParams(c === "All" ? {} : { cat: c }, { replace: true });
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Pass the filtered menu to MenuList */}
      <MenuList items={shown} />
    </section>
  );
}

export default VendorPage;

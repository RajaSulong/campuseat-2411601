import { useVendors } from "../hooks/useVendors.js";
import VendorCard from "../components/VendorCard.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  // Add this temporary console log to see what the hook is returning
  console.log("HomePage data:", { vendors, loading, error });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;

import Listing from "@/components/Listing";

export default function Listings({ listings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map(listing => (
        <Listing key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

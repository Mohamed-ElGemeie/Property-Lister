import { getApartmentById } from "@/server/actions/apartment";
import SingleListing from "@/views/SingleListing";

export default async function ListingPage({ params }) {
  const { id } = await params;

  const result = await getApartmentById({ id });

  if (!result.success) {
    return <div className="p-10 text-red-500">Failed to load listing: {result.message}</div>;
  }

  const listing = result.data;

  return (
    <>
      <SingleListing listing={listing} />
    </>
  );
}

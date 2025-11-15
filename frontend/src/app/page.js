
export const dynamic = 'force-dynamic';

import Listings from '@/views/Listings.jsx';
import { getApartments } from '@/server/actions/apartment';

export default async function Page() {

  const response = await getApartments();
  // Debug: log response shape during server render
  try {
    // eslint-disable-next-line no-console
    console.log('DEBUG getApartments response:', JSON.stringify(response).slice(0,1000));
  } catch (e) {}
  const listingsArray = response?.data || []; 

  return (
    <>
        {listingsArray.length ? (
          <Listings listings={listingsArray} />
        ) : (
          <p className="text-center text-gray-500">No listings found.</p>
        )}
    </>
  );
}

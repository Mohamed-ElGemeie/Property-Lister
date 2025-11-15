import ImageCarousel from "@/components/ImageCarousel";

export default function SingleListing({ listing }) {
  return (
    <div className="max-w-5xl mx-auto pb-12">

      {/* HERO IMAGE CAROUSEL */}
      <ImageCarousel images={listing.images} height={300} />

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">{listing.name}</h1>

      {/* PRICE */}
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        ${listing.price} <span className="text-gray-500 text-base">/ night</span>
      </p>

      {/* LOCATION */}
      <p className="text-gray-600 mb-6 text-lg">
        {listing.city}, {listing.country}
      </p>

      {/* INFO + DESCRIPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">

          {/* ICON ROW */}
          <div className="flex items-center space-x-6 text-gray-800 text-lg mb-6">
            <div className="flex items-center space-x-2">
              <i className="ti ti-users text-xl"></i>
              <span>{listing.max_guests} guests</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ti ti-bed text-xl"></i>
              <span>{listing.bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ti ti-bath text-xl"></i>
              <span>{listing.bathrooms} bathrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ti ti-bed-flat text-xl"></i>
              <span>{listing.beds} beds</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          {listing.description && (
            <p className="text-gray-900 leading-relaxed text-[17px] mb-10 whitespace-pre-line">
              {listing.description}
            </p>
          )}

          {/* MAP */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="w-full h-72 rounded-xl overflow-hidden border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${listing.latitude},${listing.longitude}&z=14&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

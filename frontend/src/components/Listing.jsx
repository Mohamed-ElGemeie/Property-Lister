import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";

export default function Listing({ listing }) {
  return (
    <Link
      href={`/${listing.id}`}
      target="_blank"
      className="block h-full" // make link take full height
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full">
        
        {/* Image Carousel */}
        <div className="h-60 w-full flex-shrink-0">
          <ImageCarousel images={listing.images} height={240} />
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-semibold mb-1">{listing.name}</h2>

          <p className="text-black text-sm mb-2">
            {listing.city}, {listing.country}
          </p>

          <div className="flex text-black text-sm mb-2 space-x-4">
            <span>{listing.max_guests} guests</span>
            <span>{listing.bedrooms} bedrooms</span>
            <span>{listing.bathrooms} bathrooms</span>
          </div>

          <p className="text-lg font-bold">${listing.price} / night</p>

          {listing.description && (
            <p className="text-black text-sm mt-2 line-clamp-3 flex-1">
              {listing.description}
            </p>
          )}
        </div>

      </div>
    </Link>
  );
}

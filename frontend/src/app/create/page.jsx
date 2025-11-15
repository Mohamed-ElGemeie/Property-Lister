"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createApartment } from "@/server/actions/apartment";
import { CITIES, COUNTRIES } from "@/server/config/enums";
import toast from "react-hot-toast";

export default function CreateApartmentPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError, // <-- import setError here
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      max_guests: "",
      bedrooms: "",
      bathrooms: "",
      beds: "",
      description: "",
      longitude: "",
      latitude: "",
      price: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await createApartment({
        ...data,
        max_guests: Number(data.max_guests),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        beds: Number(data.beds),
        longitude: Number(data.longitude),
        latitude: Number(data.latitude),
        price: Number(data.price),
      });

      setLoading(false);

      if (!response.success) {
        toast.error(response.message);

        if (response.errors) {
          Object.keys(response.errors).forEach(field => {
            setError(field, {
              type: "server",
              message: response.errors[field],
            });
          });
        }
      } else {
        toast.success("Apartment created successfully!");
        reset();
      }
    } catch (err) {
      setLoading(false);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Apartment</h1>
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
              className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Max Guests, Bedrooms, Bathrooms */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium">Max Guests</label>
              <input
                type="number"
                {...register("max_guests", {
                  required: "Max guests is required",
                  min: { value: 1, message: "Must be at least 1" },
                })}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.max_guests && <p className="text-red-500 text-sm mt-1">{errors.max_guests.message}</p>}
            </div>
            <div>
              <label className="block font-medium">Bedrooms</label>
              <input
                type="number"
                {...register("bedrooms", {
                  required: "Bedrooms is required",
                  min: { value: 0, message: "Bedrooms cannot be negative" },
                })}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms.message}</p>}
            </div>
            <div>
              <label className="block font-medium">Bathrooms</label>
              <input
                type="number"
                {...register("bathrooms", {
                  required: "Bathrooms is required",
                  min: { value: 0, message: "Bathrooms cannot be negative" },
                })}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms.message}</p>}
            </div>
          </div>

          {/* Beds */}
          <div>
            <label className="block font-medium">Beds</label>
            <input
              type="number"
              {...register("beds", {
                required: "Beds is required",
                min: { value: 0, message: "Beds cannot be negative" },
              })}
              className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.beds && <p className="text-red-500 text-sm mt-1">{errors.beds.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea {...register("description")} className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Longitude & Latitude */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium">Longitude</label>
              <input
                type="number"
                step="0.000001"
                {...register("longitude", {
                  required: "Longitude is required",
                  min: { value: -180, message: "Longitude must be >= -180" },
                  max: { value: 180, message: "Longitude must be <= 180" },
                })}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
            </div>
            <div>
              <label className="block font-medium">Latitude</label>
              <input
                type="number"
                step="0.000001"
                {...register("latitude", {
                  required: "Latitude is required",
                  min: { value: -90, message: "Latitude must be >= -90" },
                  max: { value: 90, message: "Latitude must be <= 90" },
                })}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block font-medium">City</label>
            <select {...register("city", { required: "City is required" })} className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select city</option>
              {CITIES.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium">Country</label>
            <select {...register("country", { required: "Country is required" })} className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors" disabled={loading}>
            {loading ? "Creating..." : "Create Apartment"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use server";

import { axiosAuth, axiosPublic } from "@/server/lib/axios";
import { apartmentSchema } from "@/server/lib/schemas";
import { createResponse } from "@/server/lib/response";
import { parseFormErrors } from "@/server/lib/helpers";
import { APARTMENT } from "@/server/config/routes";
/** Authenticated Requests **/

// Get all apartments
export async function getApartments() {
  try {
    const { data } = await axiosAuth.get(APARTMENT);

      return createResponse({
        success: data.success,
        message: data.message,
        code: data.code,
        data: data.data,
      });
  } catch (error) {
    console.error("Error fetching apartments:", error);
      return createResponse({ success: false, data: [], message: error.message });
  }
}

// Get apartment by ID
export async function getApartmentById({ id }) {
  try {
    const { data } = await axiosAuth.get(`${APARTMENT}/${id}`);
      return createResponse({
        success: data.success,
        message: data.message,
        code: data.code,
        data: data.data,
      });
  } catch (error) {
    console.error(`Error fetching apartment ${id}:`, error);
    return createResponse({ success: false, data: {}, message: error.message });
  }
}

// Create a new apartment passing each field individually
export async function createApartment({ name, max_guests, bedrooms, bathrooms, beds, description, longitude, latitude, price, city, country }) {
  try {
    const { error, value } = apartmentSchema.validate(
      {
        name,
        max_guests,
        bedrooms,
        bathrooms,
        beds,
        description,
        longitude,
        latitude,
        price,
        city,
        country,
      },
      { abortEarly: false }
    );

    if (error) {
      return createResponse({
        success: false,
        data: {},
        errors: parseFormErrors(error),
        message: "Validation error",
      });
    }

    const { data } = await axiosAuth.post(APARTMENT, value);
    return createResponse({
      success: data.success,
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (error) {
    console.error("Error creating apartment:", error);
    return createResponse({ success: false, data: {}, message: error.message });
  }
}

/** Non-authenticated Requests **/

// Ping endpoint to check server status
export async function pingServer() {
  try {
    const { data } = await axiosPublic.get("/ping");
      return createResponse({
        success: data.success,
        message: data.message,
        code: data.code,
        data: data.data,
      });
  } catch (error) {
    console.error("Error pinging server:", error);
    return createResponse({ success: false, data: {}, message: error.message });
  }
}

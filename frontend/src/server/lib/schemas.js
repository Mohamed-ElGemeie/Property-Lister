import Joi from "joi";

export const apartmentSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),
  max_guests: Joi.number().integer().min(1).required().messages({
    "number.base": "Max guests must be a number",
    "number.min": "Max guests must be at least 1",
    "any.required": "Max guests is required",
  }),
  bedrooms: Joi.number().integer().min(0).required().messages({
    "number.base": "Bedrooms must be a number",
    "number.min": "Bedrooms must be 0 or more",
    "any.required": "Bedrooms is required",
  }),
  bathrooms: Joi.number().integer().min(0).required().messages({
    "number.base": "Bathrooms must be a number",
    "number.min": "Bathrooms must be 0 or more",
    "any.required": "Bathrooms is required",
  }),
  beds: Joi.number().integer().min(0).required().messages({
    "number.base": "Beds must be a number",
    "number.min": "Beds must be 0 or more",
    "any.required": "Beds is required",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    "number.base": "Longitude must be a number",
    "number.min": "Longitude must be >= -180",
    "number.max": "Longitude must be <= 180",
    "any.required": "Longitude is required",
  }),
  latitude: Joi.number().min(-90).max(90).required().messages({
    "number.base": "Latitude must be a number",
    "number.min": "Latitude must be >= -90",
    "number.max": "Latitude must be <= 90",
    "any.required": "Latitude is required",
  }),
  price: Joi.number().min(0.01).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be greater than 0",
    "any.required": "Price is required",
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required",
  }),
  country: Joi.string().required().messages({
    "any.required": "Country is required",
  }),
});

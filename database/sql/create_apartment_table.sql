CREATE TABLE IF NOT EXISTS apartment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    max_guests INT NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    beds INT NOT NULL,
    description TEXT,
    longitude DECIMAL(10, 6),
    latitude DECIMAL(10, 6),
    price DECIMAL(10, 2),
    images TEXT[],
    city city_enum,
    country country_enum
);

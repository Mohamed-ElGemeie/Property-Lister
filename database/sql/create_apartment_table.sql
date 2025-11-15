CREATE TABLE IF NOT EXISTS apartment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    max_guests INT NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    beds INT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    longitude DECIMAL(10, 6) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    city city_enum NOT NULL,
    country country_enum NOT NULL,
    images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

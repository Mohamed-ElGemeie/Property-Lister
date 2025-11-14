DO $$
BEGIN
    -- Drop and recreate city enum
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'city_enum') THEN
        DROP TYPE city_enum;
    END IF;

    CREATE TYPE city_enum AS ENUM (
        -- Egypt
        'Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Port Said', 
        'Suez', 'Shubra El Kheima', 'Tanta', 'Mansoura', 'Hurghada', 
        'Sharm El Sheikh', 'Faiyum', 'Ismailia', 'Minya', 'Damietta',
        'Asyut', 'Beni Suef', 'Damanhur', 'Qena', 'Al Mahallah al Kubra',
        'El Alamein', 'Shibin al Kawm', 'Siwa',

        -- UAE
        'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 
        'Fujairah', 'Umm Al Quwain', 'Al Ain', 'Kalba', 'Khor Fakkan',
        'Dibba Al Fujairah', 'Dibba Al Hisn', 'Al Madam', 
        'Al Awir', 'Al Manama'
    );

    -- Drop and recreate country enum
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'country_enum') THEN
        DROP TYPE country_enum;
    END IF;

    CREATE TYPE country_enum AS ENUM (
        'Egypt',
        'UAE'
    );
END $$;

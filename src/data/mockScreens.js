export const MOCK_SCREENS = [
    {
        id: 'SCR-001',
        name: 'Mubrakiya Main Plaza',
        location: 'Mubrakiya',
        governorate: 'Capital',
        country: 'Kuwait',
        type: 'Outdoor',
        resolution: '1920x1080',
        size: '40ft x 20ft',
        totalQuantity: 5,
        basePricePerHour: 50, // KWD
        coordinates: { lat: 29.3759, lng: 47.9774 },
        audience: 'High Traffic, Tourists',
        availableSlots: 24,
        description: 'Located in the heart of the historic souq, visible to thousands of shoppers daily.',
        tags: ['Peak Hours', 'Outdoor'],
        previews: [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000'
        ],
        metrics: {
            daily: '75,000',
            weekly: '525,000',
            monthly: '2,250,000'
        },
        specs: {
            physicalSize: '12m x 6m',
            operatingHours: '08:00 AM - 11:00 PM',
            slotDuration: '180 seconds',
            loopLength: '180 seconds',
            category: 'Heritage Site',
            resolutionText: 'Full HD (1920 x 1080)'
        },
        demographics: {
            nationality: { kuwaiti: 43, arab: 27, nonArab: 30 },
            gender: { male: 67, female: 33 },
            age: { boomers: 24, genX: 28, millennials: 29, genZ: 19 },
            mainAgeGroup: 'Millennials (29 - 44)',
            mainGender: 'Male',
            mainNationality: 'Kuwaiti'
        }
    },
    {
        id: 'SCR-002',
        name: 'Al Salam Mall Entrance',
        location: 'Al Salam Mall Salmiya',
        governorate: 'Hawally',
        country: 'Kuwait',
        type: 'Indoor',
        resolution: '1080x1920',
        size: '55 inch',
        totalQuantity: 10,
        basePricePerHour: 15, // KWD
        coordinates: { lat: 29.3340, lng: 48.0680 },
        audience: 'Shoppers, Families',
        availableSlots: 48,
        description: 'Prime placement at the main entrance, capturing all incoming footfall.',
        tags: ['Indoor', 'High Dwell Time'],
        previews: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000'
        ],
        metrics: {
            daily: '40,000',
            weekly: '280,000',
            monthly: '1,200,000'
        },
        specs: {
            physicalSize: '1.2m x 0.7m',
            operatingHours: '10:00 AM - 10:00 PM',
            slotDuration: '180 seconds',
            loopLength: '180 seconds',
            category: 'Shopping Mall',
            resolutionText: 'Full HD Portrait (1080 x 1920)'
        },
        demographics: {
            nationality: { kuwaiti: 39, arab: 32, nonArab: 29 },
            gender: { male: 60, female: 40 },
            age: { boomers: 18, genX: 24, millennials: 35, genZ: 23 },
            mainAgeGroup: 'Gen Z (Less Than 28)',
            mainGender: 'Female',
            mainNationality: 'Arab'
        }
    },
    {
        id: 'SCR-003',
        name: 'Fnaitees Highway Board',
        location: 'Fnaitees',
        governorate: 'M.Kabeer',
        country: 'Kuwait',
        type: 'Outdoor',
        resolution: '3840x2160',
        size: '20ft x 10ft',
        totalQuantity: 3,
        basePricePerHour: 30, // KWD
        coordinates: { lat: 29.2089, lng: 48.0933 },
        audience: 'Commuters',
        availableSlots: 12,
        description: 'High-visibility digital billboard on the major coastal highway.',
        tags: ['Highway', 'Outdoor'],
        previews: [
            'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1000'
        ],
        metrics: {
            daily: '120,000',
            weekly: '840,000',
            monthly: '3,600,000'
        },
        specs: {
            physicalSize: '6m x 3m',
            operatingHours: '24 Hours',
            slotDuration: '180 seconds',
            loopLength: '180 seconds',
            category: 'Highway',
            resolutionText: '4K Ultra HD (3840 x 2160)'
        },
        demographics: {
            nationality: { kuwaiti: 45, arab: 25, nonArab: 30 },
            gender: { male: 80, female: 20 },
            age: { boomers: 20, genX: 40, millennials: 30, genZ: 10 },
            mainAgeGroup: 'GenX (45-60)',
            mainGender: 'Male',
            mainNationality: 'Non Arab'
        }
    },
    {
        id: 'SCR-004',
        name: 'Divonne Complex Center',
        location: 'Divonne Complex',
        governorate: 'Ahmadi',
        country: 'Kuwait',
        type: 'Indoor',
        resolution: '1280x720',
        size: '85 inch',
        totalQuantity: 8,
        basePricePerHour: 20, // KWD
        coordinates: { lat: 29.3519, lng: 47.9940 },
        audience: 'Elite, Shoppers',
        availableSlots: 18,
        description: 'Luxury complex screen targeting affluent visitors.',
        tags: ['Indoor', 'Luxury'],
        previews: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'
        ],
        metrics: {
            daily: '25,000',
            weekly: '175,000',
            monthly: '750,000'
        },
        specs: {
            physicalSize: '1.9m x 1.1m',
            operatingHours: '10:00 AM - 11:00 PM',
            slotDuration: '180 seconds',
            loopLength: '180 seconds',
            category: 'Luxury Complex',
            resolutionText: 'HD (1280 x 720)'
        },
        demographics: {
            nationality: { kuwaiti: 60, arab: 20, nonArab: 20 },
            gender: { male: 45, female: 55 },
            age: { boomers: 40, genX: 30, millennials: 20, genZ: 10 },
            mainAgeGroup: 'Boomers (61-80)',
            mainGender: 'Female',
            mainNationality: 'Kuwaiti'
        }
    },
    {
        id: 'SCR-005',
        name: 'Riyadh Park Digital',
        location: 'Riyadh Park',
        governorate: 'Farwania',
        country: 'Kuwait',
        type: 'Indoor',
        resolution: '1920x1080',
        size: '65 inch',
        totalQuantity: 12,
        basePricePerHour: 25, // KWD approx
        coordinates: { lat: 24.7743, lng: 46.6397 },
        audience: 'Shoppers',
        availableSlots: 36,
        description: 'Vibrant screen in the food court area of Riyadh Park.',
        tags: ['Indoor', 'Food Court'],
        previews: [
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000'
        ],
        metrics: {
            daily: '60,000',
            weekly: '420,000',
            monthly: '1,800,000'
        },
        specs: {
            physicalSize: '1.5m x 0.9m',
            operatingHours: '09:00 AM - 12:00 AM',
            slotDuration: '180 seconds',
            loopLength: '180 seconds',
            category: 'Shopping Mall',
            resolutionText: 'Full HD (1920 x 1080)'
        },
        demographics: {
            nationality: { kuwaiti: 30, arab: 50, nonArab: 20 },
            gender: { male: 55, female: 45 },
            age: { boomers: 10, genX: 20, millennials: 40, genZ: 30 },
            mainAgeGroup: 'Millennials (29 - 44)',
            mainGender: 'Male',
            mainNationality: 'Arab'
        }
    },
    {
        id: 'SCR-006',
        name: 'Doha Corniche LED',
        location: 'Corniche',
        governorate: 'Jahara',
        country: 'Kuwait',
        type: 'Outdoor',
        resolution: '3840x2160',
        size: '30ft x 15ft',
        totalQuantity: 4,
        basePricePerHour: 60, // KWD approx
        coordinates: { lat: 25.2916, lng: 51.5303 },
        audience: 'Tourists, Locals',
        availableSlots: 10,
        description: 'Iconic LED screen along the Doha Corniche waterfront.',
        tags: ['Outdoor', 'Iconic'],
        previews: [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000'
        ],
        metrics: {
            daily: '90,000',
            weekly: '630,000',
            monthly: '2,700,000'
        },
        specs: {
            physicalSize: '10m x 5m',
            operatingHours: '05:00 PM - 02:00 AM',
            slotDuration: '180 seconds',
            loopLength: '180 seconds',
            category: 'Public Space',
            resolutionText: '4K Ultra HD'
        },
        demographics: {
            nationality: { kuwaiti: 20, arab: 30, nonArab: 50 },
            gender: { male: 50, female: 50 },
            age: { boomers: 5, genX: 10, millennials: 35, genZ: 50 },
            mainAgeGroup: 'Gen Z (Less Than 28)',
            mainGender: 'Female',
            mainNationality: 'Non Arab'
        }
    }
];

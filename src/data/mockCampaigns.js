export const MOCK_CAMPAIGNS = [
    {
        id: 'CAM-001',
        name: 'Summer Sale 2024',
        status: 'Running',
        screens: 5,
        reach: '250,000',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        price: 1250, // KWD
        description: 'Major summer promotion campaign targeting mall visitors and commuters.',
        slotsPerDay: 4,
        totalImpressions: 1500000,
        durationDays: 32,
        timeline: {
            submitted: '2024-01-10',
            booked: '2024-01-12',
            running: '2024-01-15',
            completed: null
        },
        locations: [
            { name: 'Dubai Mall Entrance', location: 'Dubai, UAE', size: '5m x 3m' },
            { name: 'Sheikh Zayed Road Billboard', location: 'Dubai, UAE', size: '12m x 6m' },
            { name: 'Marina Walk Digital Tower', location: 'Dubai, UAE', size: '8m x 4m' }
        ]
    },
    {
        id: 'CAM-002',
        name: 'Product Launch Q1',
        status: 'Booked',
        screens: 3,
        reach: '180,000',
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        price: 840, // KWD
        description: 'Launch event for the new Q1 product line.',
        slotsPerDay: 2,
        totalImpressions: 800000,
        durationDays: 28,
        timeline: {
            submitted: '2024-01-15',
            booked: '2024-01-18',
            running: null,
            completed: null
        },
        locations: [
            { name: 'Al Salam Mall Entrance', location: 'Kuwait', size: '55 inch' }
        ]
    },
    {
        id: 'CAM-003',
        name: 'Brand Awareness',
        status: 'Submitted', // Changed from Processing to Submitted or Booked based on request, but user asked for Submitted, Booked, Running, Completed
        screens: 8,
        reach: '420,000',
        startDate: '2024-02-10',
        endDate: '2024-03-10',
        price: 1500, // KWD
        description: 'General brand awareness across high traffic areas.',
        slotsPerDay: 6,
        totalImpressions: 2000000,
        durationDays: 30,
        timeline: {
            submitted: '2024-01-20',
            booked: null,
            running: null,
            completed: null
        },
        locations: [
            { name: 'Mubrakiya Main Plaza', location: 'Kuwait', size: '40ft x 20ft' }
        ]
    },
    {
        id: 'CAM-004',
        name: 'Holiday Special',
        status: 'Submitted',
        screens: 4,
        reach: '200,000',
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        price: 920, // KWD
        description: 'Holiday season special offers.',
        slotsPerDay: 4,
        totalImpressions: 900000,
        durationDays: 31,
        timeline: {
            submitted: '2024-01-25',
            booked: null,
            running: null,
            completed: null
        },
        locations: []
    },
    {
        id: 'CAM-005',
        name: 'Anniversary Event',
        status: 'Completed',
        screens: 6,
        reach: '320,000',
        startDate: '2023-12-01',
        endDate: '2023-12-31',
        price: 1100, // KWD
        description: '10th Anniversary celebration event.',
        slotsPerDay: 8,
        totalImpressions: 1800000,
        durationDays: 31,
        timeline: {
            submitted: '2023-11-15',
            booked: '2023-11-20',
            running: '2023-12-01',
            completed: '2023-12-31'
        },
        locations: []
    },
    {
        id: 'CAM-006',
        name: 'New Year Promo',
        status: 'Completed',
        screens: 10,
        reach: '500,000',
        startDate: '2023-12-25',
        endDate: '2024-01-05',
        price: 1850, // KWD
        description: 'New Year promotional offers.',
        slotsPerDay: 10,
        totalImpressions: 2500000,
        durationDays: 12,
        timeline: {
            submitted: '2023-12-10',
            booked: '2023-12-15',
            running: '2023-12-25',
            completed: '2024-01-05'
        },
        locations: []
    },
    {
        id: 'CAM-007',
        name: 'Spring Collection',
        status: 'Submitted',
        screens: 7,
        reach: '350,000',
        startDate: '2024-03-15',
        endDate: '2024-04-15',
        price: 1320, // KWD
        description: 'Spring fashion collection launch.',
        slotsPerDay: 5,
        totalImpressions: 1600000,
        durationDays: 31,
        timeline: {
            submitted: '2024-02-01',
            booked: null,
            running: null,
            completed: null
        },
        locations: []
    }
];

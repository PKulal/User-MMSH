export const MOCK_REPORTS = {
    overall: {
        totalImpressions: 1250000,
        totalSpent: 4500.50,
        totalBudgetAllocated: 12000,
        activeCampaigns: 4,
        playouts: 15400,
        performanceHistory: [
            { date: 'Sep 24', impressions: 800, spend: 15, playouts: 120 },
            { date: 'Sep 25', impressions: 1200, spend: 20, playouts: 180 },
            { date: 'Sep 26', impressions: 1100, spend: 18, playouts: 165 },
            { date: 'Sep 27', impressions: 1400, spend: 25, playouts: 210 },
            { date: 'Sep 28', impressions: 1300, spend: 22, playouts: 195 },
            { date: 'Sep 29', impressions: 1150, spend: 19, playouts: 172 },
            { date: 'Sep 30', impressions: 1250, spend: 21, playouts: 188 },
            { date: 'Oct 01', impressions: 900, spend: 14, playouts: 135 },
        ],
        ecpmHistory: [
            { date: 'Sep 24', ecpm: 18.75 },
            { date: 'Sep 25', ecpm: 16.67 },
            { date: 'Sep 26', ecpm: 16.36 },
            { date: 'Sep 27', ecpm: 17.86 },
            { date: 'Sep 28', ecpm: 16.92 },
            { date: 'Sep 29', ecpm: 16.52 },
            { date: 'Sep 30', ecpm: 16.80 },
            { date: 'Oct 01', ecpm: 15.56 },
        ],
        demographics: {
            ageGroups: [
                { name: '18-24', value: 150000 },
                { name: '25-34', value: 450000 },
                { name: '35-44', value: 380000 },
                { name: '45-54', value: 200000 },
                { name: '55+', value: 70000 }
            ],
            gender: [
                { name: 'Male', value: 58 },
                { name: 'Female', value: 42 }
            ],
            nationality: [
                { name: 'Kuwaiti', value: 45 },
                { name: 'Arab', value: 55 },
                { name: 'Non-Arab', value: 10 }
            ]
        },
        heatmapData: [
            120, 80, 45, 30, 20, 15, 60, 150, 450, 680, 820, 950,
            980, 1100, 1050, 920, 1200, 1450, 1600, 1800, 1500, 1100, 650, 300
        ],
        health: {
            actualImpressions: 1250000,
            targetImpressions: 5000000,
            completionRate: 25
        },
        screenPerformance: [
            { name: 'Terminal 1 Main', playouts: 4500, impressions: 350000, status: 'Playing' },
            { name: 'Arrival Hall B', playouts: 3800, impressions: 280000, status: 'Playing' },
            { name: 'Duty Free Center', playouts: 5200, impressions: 420000, status: 'Playing' },
            { name: 'Gate 4 VIP', playouts: 1900, impressions: 200000, status: 'Scheduled' },
        ],
        regionalPerformance: [
            { region: 'Kuwait City', playouts: 8500, impressions: 650000 },
            { region: 'Hawally', playouts: 4200, impressions: 320000 },
            { region: 'Salmiya', playouts: 3800, impressions: 280000 },
            { region: 'Ahmadi', playouts: 1900, impressions: 150000 }
        ],
        screensHistory: [
            { date: 'Sep 24', screens: 12 },
            { date: 'Sep 25', screens: 15 },
            { date: 'Sep 26', screens: 14 },
            { date: 'Sep 27', screens: 18 },
            { date: 'Sep 28', screens: 18 },
            { date: 'Sep 29', screens: 17 },
            { date: 'Sep 30', screens: 19 },
            { date: 'Oct 01', screens: 16 },
        ]
    },
    campaigns: {
        'CAM-001': {
            name: 'Summer Sale 2024',
            spent: 1250.75,
            plannedBudget: 3000,
            impressions: 450000,
            playouts: 5200,
            history: [
                { date: 'Jun 01', impressions: 12000, playouts: 150 },
                { date: 'Jun 02', impressions: 15000, playouts: 180 },
                { date: 'Jun 03', impressions: 14500, playouts: 175 },
                { date: 'Jun 04', impressions: 18000, playouts: 200 },
                { date: 'Jun 05', impressions: 17000, playouts: 190 },
            ],
            demographics: {
                ageGroups: [
                    { name: '18-24', value: 80000 },
                    { name: '25-34', value: 150000 },
                    { name: '35-44', value: 120000 },
                    { name: '45-54', value: 70000 },
                    { name: '55+', value: 30000 }
                ],
                gender: [
                    { name: 'Male', value: 45 },
                    { name: 'Female', value: 55 }
                ]
            },
            heatmapData: [
                10, 5, 2, 1, 0, 0, 5, 20, 50, 100, 150, 200,
                250, 300, 280, 260, 350, 450, 550, 650, 500, 350, 150, 50
            ],
            health: {
                actualImpressions: 450000,
                targetImpressions: 1000000,
                completionRate: 45
            }
        },
        'CAM-002': {
            name: 'Product Launch Q1',
            spent: 850.00,
            plannedBudget: 5000,
            impressions: 120000,
            playouts: 1200,
            history: [
                { date: 'Oct 15', impressions: 8000, playouts: 80 },
                { date: 'Oct 16', impressions: 9500, playouts: 95 },
                { date: 'Oct 17', impressions: 11000, playouts: 110 },
            ]
        }
    }
};

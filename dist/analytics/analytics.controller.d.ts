import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    analytics(): Promise<{
        totalRevenue: number;
        todaysRevenue: number;
        totalOrders: number;
    }>;
}

const mapping: Record<string, string> = {
  bookings: 'booking',
  cars: 'car',
  companies: 'company',
  issues: 'issue',
  reviews: 'review',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

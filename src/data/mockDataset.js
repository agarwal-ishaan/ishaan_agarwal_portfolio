export const rawDataset = [
  { id: 1, date: '2023/15/42', revenue: '9999999', category: 'elec...', status: 'Active', outliers: true },
  { id: -1, date: 'N/A', revenue: 'NaN', category: 'Electorincs', status: 'pendng ', missing: true },
  { id: 3, date: '2023-11-01', revenue: '1,200.5', category: 'Clothes ', status: 'Active', clean: false },
  { id: 4, date: '01-Jan-23', revenue: null, category: null, status: 'UNKNOWN', missing: true },
  { id: 5, date: '2023/11/05', revenue: '-500', category: 'Homewares', status: 'Active', clean: false },
  { id: 9999, date: '2024-02-30', revenue: 'NaN', category: 'Tech', status: ' Active', outliers: true },
  { id: 7, date: 'Oct 12 23', revenue: '850.00', category: 'Clothes', status: 'Active', clean: false },
  { id: null, date: '2023-10-15', revenue: '90.5', category: 'homewares', status: 'Inctive', missing: true },
];

export const cleanDataset = [
  { id: 1, date: '2023-11-15', revenue: '850.00', category: 'Electronics', status: 'Active' },
  { id: 2, date: '2023-10-28', revenue: '450.00', category: 'Electronics', status: 'Pending' },
  { id: 3, date: '2023-11-01', revenue: '1200.50', category: 'Clothing', status: 'Active' },
  { id: 4, date: '2023-01-01', revenue: '0.00', category: 'Unknown', status: 'Unknown' },
  { id: 5, date: '2023-11-05', revenue: '500.00', category: 'Home', status: 'Active' },
  { id: 6, date: '2024-02-28', revenue: '120.00', category: 'Tech', status: 'Active' },
  { id: 7, date: '2023-10-12', revenue: '850.00', category: 'Clothing', status: 'Active' },
  { id: 8, date: '2023-10-15', revenue: '90.50', category: 'Home', status: 'Inactive' },
];

// Helper to interpolate between messy and clean state based on progress (0.0 to 1.0)
export const getInterpolatedData = (progress) => {
  return rawDataset.map((raw, index) => {
    const clean = cleanDataset[index];
    
    // We will clean different columns at different progress thresholds
    // Progress thresholds for columns:
    // ID: 0.2
    // Date: 0.4
    // Category: 0.6
    // Revenue: 0.8
    // Status: 0.9

    const currentId = progress > 0.2 ? clean.id : raw.id;
    const currentDate = progress > 0.4 ? clean.date : raw.date;
    const currentCategory = progress > 0.6 ? clean.category : raw.category;
    
    // Revenue transition: interpolate numbers if not NaN/missing, else just swap at 0.8
    let currentRevenue = raw.revenue;
    if (progress > 0.8) {
      currentRevenue = clean.revenue;
    } else if (progress > 0.5 && !isNaN(parseFloat(raw.revenue)) && parseFloat(raw.revenue) > 0) {
      // Small visual interpolation effect for numbers
      const rawVal = parseFloat(raw.revenue.replace(/,/g, ''));
      const cleanVal = parseFloat(clean.revenue);
      // Normalized progress between 0.5 and 0.8
      const p = (progress - 0.5) / 0.3;
      currentRevenue = (rawVal + (cleanVal - rawVal) * p).toFixed(2);
    } else if (progress > 0.8) {
      currentRevenue = clean.revenue;
    }

    const currentStatus = progress > 0.9 ? clean.status : raw.status;

    return {
      id: currentId,
      date: currentDate,
      revenue: currentRevenue,
      category: currentCategory,
      status: currentStatus,
      // Metadata for styling
      isDirtyId: currentId === raw.id && currentId !== clean.id,
      isDirtyDate: currentDate === raw.date && currentDate !== clean.date,
      isDirtyRevenue: currentRevenue === raw.revenue && currentRevenue !== clean.revenue,
      isDirtyCategory: currentCategory === raw.category && currentCategory !== clean.category,
      isDirtyStatus: currentStatus === raw.status && currentStatus !== clean.status,
    };
  });
};

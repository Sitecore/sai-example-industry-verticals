const GRID_LABELS = {
  grid: {
    normal: { value: 'normal', tLabel: 'grid_status_normal' },
    warning: { value: 'warning', tLabel: 'grid_status_warning' },
    critical: { value: 'critical', tLabel: 'grid_status_critical' },
  },
  temperature: {
    celsius: '°C',
    fahrenheit: '°F',
  },
  outages: {
    active: { value: 'active', tLabel: 'outage_active' },
    restored: { value: 'restored', tLabel: 'outage_restored' },
  },
};

export const GRID_CONDITIONS_DATA = {
  grid: {
    load: { value: 68245, status: GRID_LABELS.grid.warning },
    capacity: { value: 82150, status: GRID_LABELS.grid.normal },
    margin: { value: 16.9, status: GRID_LABELS.grid.normal },
    frequency: { value: 60.2, status: GRID_LABELS.grid.normal },
  },
  temperature: {
    unit: GRID_LABELS.temperature.fahrenheit,
    current: 108,
    forecast: 112,
    loadIncrease: '+15%',
  },
  outages: [
    {
      area: 'Houston Metro',
      status: GRID_LABELS.outages.active,
    },
    {
      area: 'Dallas-Fort Worth',
      status: GRID_LABELS.outages.active,
    },
    {
      area: 'Austin Area',
      status: GRID_LABELS.outages.restored,
    },
    {
      area: 'San Antonio',
      status: GRID_LABELS.outages.active,
    },
  ],
};

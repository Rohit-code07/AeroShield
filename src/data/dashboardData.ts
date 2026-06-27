export interface StatCard {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: string;
  isPositive: boolean; // whether the change is good (e.g. reduction is positive)
  iconName: string;
  description: string;
}

export interface MapMarker {
  id: string;
  name: string;
  type: 'industrial' | 'steel' | 'mining' | 'traffic' | 'pollution';
  coordinates: { x: number; y: number }; // percentage based coordinates for custom svg container
  details: string;
  aqi: number;
  pm10: number;
  pm25: number;
  vehiclesPerDay: number;
}

export interface ChartDataPoint {
  month: string;
  aqiBefore: number;
  aqiAfter: number;
  pm10Before: number;
  pm10After: number;
  pm25Before: number;
  pm25After: number;
  vehicleCount: number;
  dustReducedTons: number;
}

export interface CostDataRow {
  vehicleCategory: string;
  existingTrucks: number;
  retrofitCost: number; // per truck in INR
  annualMaintenance: number; // per truck in INR
  dustReduction: number; // percentage
  fuelSavings: number; // percentage due to aerodynamic wing drag reduction
  roiMonths: number;
  totalCostCr: number; // total fleet cost in Crores
}

export interface ScopeItem {
  year: string;
  phase: string;
  description: string;
  details: string[];
}

export const STATISTICS: StatCard[] = [
  {
    id: 'winter-aqi',
    title: 'Avg. Winter AQI',
    value: 342,
    unit: '',
    change: '+18% vs national average',
    isPositive: false,
    iconName: 'AlertTriangle',
    description: 'Raipur-Bhilai industrial belt average during November-February.'
  },
  {
    id: 'pm10',
    title: 'PM10 Concentration',
    value: 285,
    unit: 'µg/m³',
    change: '4.7x WHO safe limits',
    isPositive: false,
    iconName: 'Gauge',
    description: 'Coarse particulate matter mostly originating from road dust and open transport.'
  },
  {
    id: 'pm25',
    title: 'PM2.5 Concentration',
    value: 148,
    unit: 'µg/m³',
    change: '9.8x WHO safe limits',
    isPositive: false,
    iconName: 'Wind',
    description: 'Fine particles posing severe respiratory risks, heavily emitted from combustion and crushed minerals.'
  },
  {
    id: 'heavy-vehicles',
    title: 'Daily Heavy Vehicles',
    value: 12400,
    unit: 'Trucks/day',
    change: 'On NH-53 Corridor',
    isPositive: false,
    iconName: 'Truck',
    description: 'Average traffic volume of coal, iron ore, and slag dump trucks traversing the corridor.'
  },
  {
    id: 'dust-emissions',
    title: 'Est. Road Dust Emission',
    value: 48.5,
    unit: 'Tons/day',
    change: 'Fugitive emissions',
    isPositive: false,
    iconName: 'CloudRain',
    description: 'Calculated road dust kicked off and blown away by vehicle wakes per day.'
  },
  {
    id: 'population-affected',
    title: 'Population Affected',
    value: 1.8,
    unit: 'M People',
    change: 'Raipur-Bhilai region',
    isPositive: false,
    iconName: 'Users',
    description: 'Total population directly exposed to high levels of industrial corridor dust.'
  },
  {
    id: 'respiratory-rate',
    title: 'Respiratory Disorders',
    value: 38,
    unit: '%',
    change: 'Increase in 5 years',
    isPositive: false,
    iconName: 'Heart',
    description: 'Rise in asthma, bronchitis, and COPD hospital admissions in the corridor area.'
  }
];

export const MAP_MARKERS: MapMarker[] = [
  {
    id: 'raipur-center',
    name: 'Raipur Urban Center',
    type: 'pollution',
    coordinates: { x: 75, y: 55 },
    details: 'Commercial hub with high density traffic. Accumulates transport dust from eastern bypasses.',
    aqi: 280,
    pm10: 210,
    pm25: 115,
    vehiclesPerDay: 7800
  },
  {
    id: 'bhilai-steel-plant',
    name: 'Bhilai Steel Plant Zone',
    type: 'steel',
    coordinates: { x: 38, y: 48 },
    details: 'One of the largest steel factories. High slag transit, raw material loading, heavy dust generation.',
    aqi: 395,
    pm10: 360,
    pm25: 180,
    vehiclesPerDay: 9500
  },
  {
    id: 'durg-bypass',
    name: 'Durg Logistics Hub',
    type: 'traffic',
    coordinates: { x: 15, y: 50 },
    details: 'Major junction connecting westward freight. Persistent traffic jams and heavy road dust resuspension.',
    aqi: 310,
    pm10: 245,
    pm25: 130,
    vehiclesPerDay: 11000
  },
  {
    id: 'kumhari-industrial-area',
    name: 'Kumhari Casting & Chemical Zone',
    type: 'industrial',
    coordinates: { x: 55, y: 52 },
    details: 'Medium-scale industries and stone crushing units flanking NH-53. High ambient particulate matter.',
    aqi: 360,
    pm10: 310,
    pm25: 162,
    vehiclesPerDay: 8500
  },
  {
    id: 'jamul-cement-mining',
    name: 'Jamul Limestone Mines',
    type: 'mining',
    coordinates: { x: 30, y: 22 },
    details: 'Limestone quarrying and cement manufacturing. Dense movement of heavy dumpers with uncovered mineral beds.',
    aqi: 410,
    pm10: 420,
    pm25: 195,
    vehiclesPerDay: 5400
  },
  {
    id: 'tatibandh-junction',
    name: 'Tatibandh Transit Hotspot',
    type: 'traffic',
    coordinates: { x: 67, y: 53 },
    details: 'Crucial entry point of NH-53. Chronic gridlock, high diesel exhaust, and high concentrations of suspended dust.',
    aqi: 385,
    pm10: 330,
    pm25: 168,
    vehiclesPerDay: 12400
  }
];

export const CHART_DATA: ChartDataPoint[] = [
  { month: 'Jan', aqiBefore: 360, aqiAfter: 125, pm10Before: 310, pm10After: 85, pm25Before: 155, pm25After: 48, vehicleCount: 12100, dustReducedTons: 36.2 },
  { month: 'Feb', aqiBefore: 345, aqiAfter: 118, pm10Before: 295, pm10After: 78, pm25Before: 148, pm25After: 44, vehicleCount: 12400, dustReducedTons: 37.8 },
  { month: 'Mar', aqiBefore: 290, aqiAfter: 95, pm10Before: 240, pm10After: 62, pm25Before: 120, pm25After: 35, vehicleCount: 12200, dustReducedTons: 33.5 },
  { month: 'Apr', aqiBefore: 260, aqiAfter: 88, pm10Before: 215, pm10After: 55, pm25Before: 105, pm25After: 30, vehicleCount: 11800, dustReducedTons: 29.8 },
  { month: 'May', aqiBefore: 240, aqiAfter: 80, pm10Before: 190, pm10After: 50, pm25Before: 90, pm25After: 26, vehicleCount: 11500, dustReducedTons: 27.2 },
  { month: 'Jun', aqiBefore: 180, aqiAfter: 65, pm10Before: 140, pm10After: 38, pm25Before: 70, pm25After: 20, vehicleCount: 10800, dustReducedTons: 22.4 },
  { month: 'Jul', aqiBefore: 120, aqiAfter: 48, pm10Before: 95, pm10After: 25, pm25Before: 45, pm25After: 12, vehicleCount: 9500, dustReducedTons: 15.6 },
  { month: 'Aug', aqiBefore: 115, aqiAfter: 45, pm10Before: 90, pm10After: 22, pm25Before: 42, pm25After: 11, vehicleCount: 9900, dustReducedTons: 16.2 },
  { month: 'Sep', aqiBefore: 160, aqiAfter: 58, pm10Before: 130, pm10After: 32, pm25Before: 65, pm25After: 18, vehicleCount: 11200, dustReducedTons: 21.8 },
  { month: 'Oct', aqiBefore: 280, aqiAfter: 92, pm10Before: 230, pm10After: 60, pm25Before: 118, pm25After: 32, vehicleCount: 12000, dustReducedTons: 31.0 },
  { month: 'Nov', aqiBefore: 335, aqiAfter: 112, pm10Before: 280, pm10After: 72, pm25Before: 140, pm25After: 42, vehicleCount: 12300, dustReducedTons: 35.8 },
  { month: 'Dec', aqiBefore: 375, aqiAfter: 130, pm10Before: 320, pm10After: 90, pm25Before: 162, pm25After: 52, vehicleCount: 12500, dustReducedTons: 39.4 }
];

export const COST_DATA: CostDataRow[] = [
  {
    vehicleCategory: 'Coal dumpers (Triaxle/Multi-axle)',
    existingTrucks: 4800,
    retrofitCost: 180000,
    annualMaintenance: 22000,
    dustReduction: 88,
    fuelSavings: 4.8,
    roiMonths: 14,
    totalCostCr: 8.64
  },
  {
    vehicleCategory: 'Iron ore tippers (Heavy)',
    existingTrucks: 3500,
    retrofitCost: 195000,
    annualMaintenance: 25000,
    dustReduction: 92,
    fuelSavings: 4.2,
    roiMonths: 16,
    totalCostCr: 6.83
  },
  {
    vehicleCategory: 'Industrial slag & cement bulkers',
    existingTrucks: 2600,
    retrofitCost: 165000,
    annualMaintenance: 18000,
    dustReduction: 85,
    fuelSavings: 5.5,
    roiMonths: 12,
    totalCostCr: 4.29
  },
  {
    vehicleCategory: 'Interstate container freight cargo',
    existingTrucks: 1500,
    retrofitCost: 150000,
    annualMaintenance: 15000,
    dustReduction: 80,
    fuelSavings: 6.2,
    roiMonths: 10,
    totalCostCr: 2.25
  }
];

export const TIMELINE_DATA: ScopeItem[] = [
  {
    year: '2026',
    phase: 'Prototyping & Aerodynamic Modeling',
    description: 'Finalize fluid dynamic models and physical scale prototyping.',
    details: [
      'Ansys Fluent simulation of heavy dumper wakes at 60 km/h.',
      'Wind tunnel testing of electrostatic collector at IIT Bhilai.',
      'Development of mechanical mounting fixtures for leading truck makes (Tata, Ashok Leyland).'
    ]
  },
  {
    year: '2027',
    phase: 'Pilot Testing & Field Trials',
    description: 'Launch real-world pilot runs on the Jamul-Bhilai transport route.',
    details: [
      'Equip 50 select iron ore dumpers with AeroShield prototypes.',
      'Deploy mobile light scattering dust monitors to track wake emissions in real time.',
      'Validate PM10/PM2.5 trapping efficiencies under high heat and heavy vibrations.'
    ]
  },
  {
    year: '2028',
    phase: 'Government Policy & Certification',
    description: 'Collaborate with CPCB and Chhattisgarh Environment Conservation Board (CECB).',
    details: [
      'Secure ARAI safety and operational approvals for mechanical retrofit.',
      'Establish state subsidy framework under National Clean Air Programme (NCAP).',
      'Publish official whitepaper on wake dust capture standards.'
    ]
  },
  {
    year: '2029',
    phase: 'Fleet Deployment & Industrial Integration',
    description: 'Mandate installations for primary heavy industrial transport in Raipur.',
    details: [
      'Launch Retrofitting hubs at Tatibandh and Kumhari.',
      'Onboard heavy fleet operators representing top steel and mining houses.',
      'Retrofit target of 6,000+ trucks operating daily on NH-53.'
    ]
  },
  {
    year: '2030',
    phase: 'Smart AI Monitoring & Nationwide Scaling',
    description: 'Enable real-time cloud analytics and scale across primary logistics corridors.',
    details: [
      'Equip devices with IoT telemetry tracking water mist levels, filter loads, and fuel savings.',
      'Integrate with city smart dashboards for spatial air quality modeling.',
      'Expand distribution to industrial belts in Odisha, Jharkhand, and Karnataka.'
    ]
  }
];

export const IMPACT_KPIS = [
  { label: 'CO₂ Emissions Reduction', value: 8.5, unit: 'k Tons/yr', target: 85, color: '#3b82f6', desc: 'Saved via reduced truck drag and optimized aerodynamics.' },
  { label: 'Fugitive Dust Captured', value: 92, unit: '%', target: 92, color: '#10b981', desc: 'Average capture efficiency of PM10 particulate matter in vehicle wakes.' },
  { label: 'Corridor AQI Improvement', value: 65, unit: '%', target: 65, color: '#8b5cf6', desc: 'Projected drop in ambient pollution levels within 500m of highways.' },
  { label: 'Est. Lives Saved / Year', value: 450, unit: '+ lives', target: 75, color: '#ef4444', desc: 'Based on epidemiological models of reduced cardiopulmonary diseases.' },
  { label: 'Tree Carbon Equivalent', value: 380, unit: 'k Trees', target: 95, color: '#059669', desc: 'Lifetime carbon offset equivalent to planting new forest zones.' }
];

export const ENGINEERING_COMPONENTS = [
  {
    id: 'wing',
    name: 'Aerodynamic Wing',
    function: 'Directs wake airflow downwards, creating high pressure above and low pressure inside the capture chamber, stabilizing the turbulent vortex.',
    spec: 'Lightweight carbon fiber profile, adjustable angle of attack (-4° to +8°), wind loads up to 140 km/h.'
  },
  {
    id: 'stabilizer',
    name: 'Wake Stabilizer',
    function: 'Disrupts the low-pressure vortex that causes road dust resuspension, cutting drag and keeping the air stream tightly bound.',
    spec: 'Vortex-shredding micro vanes, reducing vehicle drag coefficient (Cd) by 4.5%.'
  },
  {
    id: 'nozzles',
    name: 'Micro Mist Nozzles',
    function: 'Sprays high-pressure, ultra-fine water mist (10-30µm) which attaches to dust particles, agglomerating them for easier filtration.',
    spec: '120 bar working pressure, anti-clogging ceramic orifices, flow rate of 0.4L/min per nozzle.'
  },
  {
    id: 'collector',
    name: 'Electrostatic Collector',
    function: 'Charges dust particles via a high-voltage corona wire, forcing them to migrate and bind to counter-charged collection plates.',
    spec: '15kV DC low current corona grid, automated plate vibrator mechanism, self-cleaning.'
  },
  {
    id: 'chamber',
    name: 'Dust Capture Chamber',
    function: 'Enclosed compartment under the truck bed where agglomerated wet dust particles and electrostatic sheets deposit.',
    spec: 'Corrosion-resistant galvanized steel, 180L storage capacity, manual clean-out drawer.'
  },
  {
    id: 'clean-air',
    name: 'Clean Air Flow',
    function: 'Exhaust stream containing over 90% fewer PM10 particles, released cleanly back into the environment.',
    spec: 'Velocity matched to highway speeds to prevent secondary turbulence.'
  }
];

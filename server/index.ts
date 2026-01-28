import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Data
const hospitals = [
  {
    id: '1',
    name: 'Apollo Hospitals',
    location: 'Bannerghatta Road, Bangalore',
    distance: 3.2,
    rating: 4.7,
    reviewCount: 1248,
    successRate: 96.5,
    isPremium: true,
    pricing: {
      basePrice: 285000,
      doctorFees: 45000,
      roomCharges: 35000,
      consumables: 28000,
      miscCharges: 12000,
      total: 405000
    },
    cashlessInsurers: ['Star Health', 'HDFC Ergo', 'ICICI Lombard']
  }
  // Add more mock hospitals as needed
];

// Reserved for future use - insurance policy data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const insurancePolicies = [
  {
    id: '1',
    provider: 'Star Health',
    coverageAmount: 500000,
    sublimits: {
      roomRent: 5000,
      surgery: 350000
    }
  }
];

const financingOptions = [
  {
    id: '1',
    provider: 'MediFin Zero-Cost EMI',
    type: 'emi',
    interestRate: 0,
    tenure: [3, 6, 9, 12],
    minAmount: 10000,
    maxAmount: 300000
  }
];

// Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'MediFinance API is running' });
});

app.get('/api/hospitals', (req, res) => {
  const { location, maxDistance } = req.query;
  let filtered = hospitals;
  
  if (location) {
    filtered = filtered.filter(h => h.location.toLowerCase().includes((location as string).toLowerCase()));
  }
  
  if (maxDistance) {
    filtered = filtered.filter(h => h.distance <= Number(maxDistance));
  }
  
  res.json({ data: filtered, count: filtered.length });
});

app.get('/api/hospitals/:id', (req, res) => {
  const hospital = hospitals.find(h => h.id === req.params.id);
  if (!hospital) {
    return res.status(404).json({ error: 'Hospital not found' });
  }
  res.json({ data: hospital });
});

app.post('/api/insurance/analyze', (_req, res) => {
  // Mock data - not using request body
  
  // Simulate AI analysis
  setTimeout(() => {
    res.json({
      analysis: {
        coverageAmount: 500000,
        eligibility: 'approved',
        outOfPocket: 55000,
        covered: 350000,
        sublimits: {
          roomRent: 5000,
          surgery: 350000
        },
        waitingPeriod: 'completed',
        confidenceScore: 87
      }
    });
  }, 2000);
});

app.get('/api/financing', (req, res) => {
  const { amount } = req.query;
  let options = financingOptions;
  
  if (amount) {
    options = options.filter(opt => 
      Number(amount) >= opt.minAmount && Number(amount) <= opt.maxAmount
    );
  }
  
  res.json({ data: options });
});

app.post('/api/cost-estimate', (req, res) => {
  const { hospitalId, roomType, stayDuration, hasInsurance } = req.body;
  
  const hospital = hospitals.find(h => h.id === hospitalId);
  if (!hospital) {
    return res.status(404).json({ error: 'Hospital not found' });
  }
  
  const roomMultipliers: any = {
    general: 1.0,
    semiprivate: 1.3,
    private: 1.6
  };
  
  const basePrice = hospital.pricing.basePrice;
  const multiplier = roomMultipliers[roomType] || 1;
  const totalCost = basePrice * multiplier * (1 + stayDuration * 0.05);
  
  const insuranceCovered = hasInsurance ? totalCost * 0.85 : 0;
  const outOfPocket = totalCost - insuranceCovered;
  
  res.json({
    estimate: {
      totalCost: Math.round(totalCost),
      insuranceCovered: Math.round(insuranceCovered),
      outOfPocket: Math.round(outOfPocket),
      breakdown: [
        { category: 'Surgery', amount: basePrice, covered: hasInsurance },
        { category: 'Doctor Fees', amount: hospital.pricing.doctorFees, covered: hasInsurance },
        { category: 'Room Charges', amount: hospital.pricing.roomCharges * multiplier, covered: hasInsurance },
        { category: 'Consumables', amount: hospital.pricing.consumables, covered: false }
      ],
      confidenceScore: 87
    }
  });
});

app.post('/api/eligibility-check', (req, res) => {
  const { amount, income, age } = req.body;
  
  const eligible = amount >= 10000 && amount <= 500000 && income >= 15000 && age >= 21 && age <= 65;
  
  res.json({
    eligible,
    maxAmount: 300000,
    message: eligible ? 'You are eligible for financing' : 'Requirements not met'
  });
});

app.listen(PORT, () => {
  console.log(`🏥 MediFinance API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

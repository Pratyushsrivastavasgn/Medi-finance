export interface Hospital {
  id: string;
  name: string;
  location: string;
  distance: number;
  rating: number;
  reviewCount: number;
  successRate: number;
  isPremium: boolean;
  pricing: {
    basePrice: number;
    doctorFees: number;
    roomCharges: number;
    consumables: number;
    miscCharges: number;
    total: number;
  };
  availableRooms: {
    general: boolean;
    semiprivate: boolean;
    private: boolean;
  };
  specializations: string[];
  cashlessInsurers: string[];
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  provider: string;
  policyHolder: string;
  coverageAmount: number;
  deductible: number;
  copay: number;
  sublimits: {
    roomRent: number;
    surgery: number;
    diagnostics: number;
  };
  waitingPeriods: {
    initial: number;
    preExisting: number;
  };
  exclusions: string[];
  cashlessHospitals: string[];
  claimType: 'cashless' | 'reimbursement' | 'both';
}

export interface FinancingOption {
  id: string;
  provider: string;
  type: 'emi' | 'loan' | 'bnpl';
  interestRate: number;
  tenure: number[];
  processingFee: number;
  minAmount: number;
  maxAmount: number;
  eligibilityCriteria: {
    minIncome: number;
    minCreditScore: number;
    employmentType: string[];
  };
  features: string[];
  approvalTime: string;
}

export interface TreatmentCostEstimate {
  procedureName: string;
  hospitalId: string;
  baseEstimate: number;
  insuranceCovered: number;
  outOfPocket: number;
  financingRequired: number;
  confidenceScore: number;
  breakdown: {
    category: string;
    amount: number;
    covered: boolean;
  }[];
  riskFactors: string[];
}

export interface SearchFilters {
  procedure: string;
  location: string;
  maxDistance: number;
  priceRange: [number, number];
  roomType: 'general' | 'semiprivate' | 'private';
  cashlessOnly: boolean;
  minRating: number;
}

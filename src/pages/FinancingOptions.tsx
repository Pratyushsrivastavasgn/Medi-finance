import { useState } from 'react';
import { CreditCard, Calculator, CheckCircle, TrendingUp, Shield, Clock, Percent, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FinancingOptions() {
  const [loanAmount, setLoanAmount] = useState(55000);
  const [tenure, setTenure] = useState(12);
  const [showEligibility, setShowEligibility] = useState(false);

  const financingProviders = [
    {
      id: '1',
      name: 'MediFin Zero-Cost EMI',
      type: 'emi',
      interestRate: 0,
      processingFee: 0,
      tenure: [3, 6, 9, 12],
      features: ['No credit score impact', 'Instant approval', 'Zero documentation', 'No hidden charges'],
      badge: 'Recommended',
      badgeColor: 'bg-teal-500',
      approvalTime: 'Instant',
      minAmount: 10000,
      maxAmount: 300000
    },
    {
      id: '2',
      name: 'HDFC Health Loan',
      type: 'loan',
      interestRate: 10.5,
      processingFee: 1.5,
      tenure: [6, 12, 24, 36],
      features: ['Quick disbursal', 'Flexible repayment', 'Pre-approved limits', 'Online process'],
      badge: 'Popular',
      badgeColor: 'bg-blue-500',
      approvalTime: '24 hours',
      minAmount: 50000,
      maxAmount: 1000000
    },
    {
      id: '3',
      name: 'Bajaj Finserv Medical Loan',
      type: 'loan',
      interestRate: 11.99,
      processingFee: 2,
      tenure: [12, 18, 24, 36, 48],
      features: ['Minimal documentation', 'Competitive rates', 'Part payment allowed', 'Paperless process'],
      badge: null,
      badgeColor: '',
      approvalTime: '48 hours',
      minAmount: 30000,
      maxAmount: 500000
    },
    {
      id: '4',
      name: 'LazyPay Medical BNPL',
      type: 'bnpl',
      interestRate: 0,
      processingFee: 0,
      tenure: [1, 2, 3],
      features: ['Pay in 3 parts', 'No cost EMI', 'Instant approval', 'No paperwork'],
      badge: 'Fast',
      badgeColor: 'bg-purple-500',
      approvalTime: '2 minutes',
      minAmount: 5000,
      maxAmount: 100000
    }
  ];

  const calculateEMI = (principal: number, rate: number, months: number) => {
    if (rate === 0) return principal / months;
    const monthlyRate = rate / 12 / 100;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  const selectedProvider = financingProviders[0];
  const emi = calculateEMI(loanAmount, selectedProvider.interestRate, tenure);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;

  const repaymentSchedule = Array.from({ length: tenure }, (_, i) => {
    const month = i + 1;
    const interestPaid = (loanAmount * selectedProvider.interestRate / 12 / 100) * (tenure - i);
    const principalPaid = loanAmount - (loanAmount * (tenure - i - 1) / tenure);
    
    return {
      month: `Month ${month}`,
      emi: Math.round(emi),
      principal: Math.round(principalPaid / tenure),
      interest: Math.round(interestPaid / tenure),
      balance: Math.round(loanAmount - (principalPaid))
    };
  });

  const eligibilityCriteria = [
    { label: 'Age', requirement: '21-65 years', userStatus: 'Eligible', pass: true },
    { label: 'Income', requirement: '₹15,000/month minimum', userStatus: 'Verified', pass: true },
    { label: 'Credit Score', requirement: '650+ (Optional)', userStatus: 'Not Required', pass: true },
    { label: 'Employment', requirement: 'Salaried/Self-employed', userStatus: 'Confirmed', pass: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Financing Options</h1>
          <p className="text-gray-600">Affordable payment plans for your healthcare needs</p>
        </div>

        {/* EMI Calculator Card */}
        <div className="card mb-8 bg-gradient-to-br from-primary-50 to-teal-50 border-primary-200">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-primary-600" />
                EMI Calculator
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount: ₹{loanAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>₹10K</span>
                    <span>₹5L</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tenure: {tenure} months
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="48"
                    step="3"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>3 months</span>
                    <span>48 months</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-primary-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700">Monthly EMI</span>
                    <span className="text-3xl font-bold text-primary-600">₹{Math.round(emi).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-600">Total Interest</div>
                      <div className="font-semibold text-gray-900">₹{Math.round(totalInterest).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Payment</div>
                      <div className="font-semibold text-gray-900">₹{Math.round(totalPayment).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Repayment Schedule Preview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={repaymentSchedule.slice(0, 12)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="emi" stroke="#1890ff" strokeWidth={2} name="EMI Amount" />
                  <Line type="monotone" dataKey="balance" stroke="#ff7875" strokeWidth={2} name="Balance" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Financing Providers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Financing Partners</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {financingProviders.map((provider) => {
              const providerEMI = calculateEMI(loanAmount, provider.interestRate, tenure);
              const inRange = loanAmount >= provider.minAmount && loanAmount <= provider.maxAmount;
              
              return (
                <div key={provider.id} className={`card hover:shadow-lg transition-all ${
                  !inRange ? 'opacity-60' : ''
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 capitalize">{provider.type}</span>
                        {provider.badge && (
                          <span className={`${provider.badgeColor} text-white px-2 py-0.5 rounded text-xs font-medium`}>
                            {provider.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
                    <div>
                      <div className="text-sm text-gray-600 mb-1 flex items-center">
                        <Percent className="h-4 w-4 mr-1" />
                        Interest Rate
                      </div>
                      <div className="font-bold text-gray-900">
                        {provider.interestRate === 0 ? 'Zero Cost' : `${provider.interestRate}% p.a.`}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Approval Time
                      </div>
                      <div className="font-bold text-gray-900">{provider.approvalTime}</div>
                    </div>
                  </div>

                  {inRange ? (
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4">
                      <div className="text-sm text-teal-700 mb-1">Your Monthly EMI</div>
                      <div className="text-2xl font-bold text-teal-900">
                        ₹{Math.round(providerEMI).toLocaleString()}
                      </div>
                      <div className="text-xs text-teal-600 mt-1">
                        for {tenure} months • Total: ₹{Math.round(providerEMI * tenure).toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4">
                      <div className="text-sm text-gray-600">
                        Loan amount must be between ₹{(provider.minAmount / 1000).toFixed(0)}K - ₹{(provider.maxAmount / 1000).toFixed(0)}K
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {provider.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      className="btn-primary flex-1"
                      disabled={!inRange}
                    >
                      Apply Now
                    </button>
                    <button className="btn-secondary flex-1">View Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility Checker */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Eligibility Check</h2>
              <p className="text-gray-600">Pre-qualify without affecting your credit score</p>
            </div>
            <button
              onClick={() => setShowEligibility(!showEligibility)}
              className="btn-primary"
            >
              {showEligibility ? 'Hide Results' : 'Check Eligibility'}
            </button>
          </div>

          {showEligibility && (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900">Congratulations! You're Eligible</h3>
                    <p className="text-sm text-green-700">You qualify for up to ₹3,00,000 in medical financing</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {eligibilityCriteria.map((criteria, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{criteria.label}</div>
                      <div className="text-sm text-gray-600">{criteria.requirement}</div>
                      <div className="text-sm text-green-600 font-medium mt-1">{criteria.userStatus}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Privacy Protected:</strong> This eligibility check does not impact your credit score. 
                    Your information is encrypted and secured.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">100% Secure</h3>
            <p className="text-sm text-gray-600">Bank-grade encryption</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Instant Approval</h3>
            <p className="text-sm text-gray-600">Get funded in minutes</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Percent className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Zero Hidden Fees</h3>
            <p className="text-sm text-gray-600">Complete transparency</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Flexible Terms</h3>
            <p className="text-sm text-gray-600">Choose what works for you</p>
          </div>
        </div>
      </div>
    </div>
  );
}

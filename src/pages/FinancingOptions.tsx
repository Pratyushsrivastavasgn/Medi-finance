import { useState } from 'react';
import { CreditCard, Calculator, CheckCircle, TrendingUp, Shield, Clock, Percent } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FinancingOptions() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(6.5);
  const [showEligibility, setShowEligibility] = useState(false);
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');

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
  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;

  const repaymentSchedule = Array.from({ length: tenure }, (_, i) => {
    const month = i + 1;
    const remainingPrincipal = loanAmount * (1 - (i / tenure));
    const interestForMonth = (remainingPrincipal * interestRate) / 12 / 100;
    const principalForMonth = emi - interestForMonth;
    
    return {
      month: `Month ${month}`,
      year: Math.ceil(month / 12),
      emi: Math.round(emi),
      principal: Math.round(principalForMonth),
      interest: Math.round(interestForMonth),
      balance: Math.round(loanAmount - (principalForMonth * month))
    };
  });

  // Group by year for yearly view
  const yearlySchedule = Array.from({ length: Math.ceil(tenure / 12) }, (_, i) => {
    const yearNum = i + 1;
    const monthsInYear = repaymentSchedule.filter(m => m.year === yearNum);
    return {
      year: `Year ${yearNum}`,
      emi: monthsInYear.reduce((sum, m) => sum + m.emi, 0),
      principal: monthsInYear.reduce((sum, m) => sum + m.principal, 0),
      interest: monthsInYear.reduce((sum, m) => sum + m.interest, 0),
      balance: monthsInYear[monthsInYear.length - 1]?.balance || 0
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

        {/* EMI Calculator Card - Groww Style */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">EMI Calculator</h2>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left side - Inputs */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-base font-medium text-gray-700">Loan amount</label>
                  <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                    <span className="text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-24 bg-transparent text-right font-semibold text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-primary-200 to-primary-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00d09c 0%, #00d09c ${((loanAmount - 10000) / (1000000 - 10000)) * 100}%, #e5e7eb ${((loanAmount - 10000) / (1000000 - 10000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹10K</span>
                  <span>₹10L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-base font-medium text-gray-700">Rate of interest (p.a)</label>
                  <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      step="0.1"
                      className="w-16 bg-transparent text-right font-semibold text-gray-900 focus:outline-none"
                    />
                    <span className="text-gray-500 ml-1">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00d09c 0%, #00d09c ${(interestRate / 25) * 100}%, #e5e7eb ${(interestRate / 25) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>25%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-base font-medium text-gray-700">Loan tenure</label>
                  <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                    <input
                      type="number"
                      value={Math.floor(tenure / 12)}
                      onChange={(e) => setTenure(Number(e.target.value) * 12)}
                      className="w-12 bg-transparent text-right font-semibold text-gray-900 focus:outline-none"
                    />
                    <span className="text-gray-500 ml-1">Yr</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="6"
                  max="360"
                  step="6"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00d09c 0%, #00d09c ${((tenure - 6) / (360 - 6)) * 100}%, #e5e7eb ${((tenure - 6) / (360 - 6)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6m</span>
                  <span>30Yr</span>
                </div>
              </div>
            </div>

            {/* Right side - Results with Pie Chart */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-1">Monthly EMI</div>
                  <div className="text-4xl font-bold text-emerald-600">₹{Math.round(emi).toLocaleString()}</div>
                </div>

                <div className="flex justify-center mb-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: loanAmount, color: '#00d09c' },
                          { name: 'Interest', value: Math.round(totalInterest), color: '#fbbf24' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#00d09c" />
                        <Cell fill="#fbbf24" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Principal amount</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span className="text-sm text-gray-600">Total interest</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{Math.round(totalInterest).toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-emerald-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total amount</span>
                      <span className="text-lg font-bold text-gray-900">₹{Math.round(totalPayment).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Table */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Your Amortization Details</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'yearly' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'monthly' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Period</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Principal (₹)</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Interest (₹)</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total Payment (₹)</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {(viewMode === 'yearly' ? yearlySchedule : repaymentSchedule.slice(0, 12)).map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{viewMode === 'yearly' ? item.year : item.month}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">{item.principal.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">{item.interest.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900">{item.emi.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-600">{item.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    <a
                      href={provider.id === '2' ? 'https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan' :
                            provider.id === '3' ? 'https://www.bajajfinserv.in/personal-loan' :
                            provider.id === '4' ? 'https://www.lazypay.in/' : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-primary flex-1 text-center ${!inRange ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      Apply Now
                    </a>
                    <a 
                      href={provider.id === '2' ? 'https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan' :
                            provider.id === '3' ? 'https://www.bajajfinserv.in/personal-loan' :
                            provider.id === '4' ? 'https://www.lazypay.in/' : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1 text-center"
                    >
                      View Details
                    </a>
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

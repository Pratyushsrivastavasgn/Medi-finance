import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, AlertCircle, CheckCircle, ArrowRight, Building2, Shield, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CostSimulator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    procedure: '',
    hospital: '',
    roomType: 'semiprivate',
    stayDuration: 3,
    hasInsurance: false,
    insuranceProvider: '',
    coverageAmount: 0,
    needsFinancing: false
  });

  const procedures = [
    'Knee Replacement Surgery',
    'Cardiac Bypass Surgery',
    'Cataract Surgery',
    'Appendectomy',
    'Hernia Repair',
    'Cesarean Section',
    'Hip Replacement',
    'Angioplasty'
  ];

  const hospitals = [
    { name: 'Apollo Hospitals', basePrice: 285000 },
    { name: 'Manipal Hospital', basePrice: 265000 },
    { name: 'Fortis Hospital', basePrice: 275000 },
    { name: 'Columbia Asia', basePrice: 225000 },
    { name: 'Narayana Health', basePrice: 195000 }
  ];

  const roomTypes = [
    { value: 'general', label: 'General Ward', multiplier: 1.0 },
    { value: 'semiprivate', label: 'Semi-Private', multiplier: 1.3 },
    { value: 'private', label: 'Private Room', multiplier: 1.6 }
  ];

  const calculateCosts = () => {
    const selectedHospital = hospitals.find(h => h.name === formData.hospital);
    if (!selectedHospital) return null;

    const roomMultiplier = roomTypes.find(r => r.value === formData.roomType)?.multiplier || 1;
    const basePrice = selectedHospital.basePrice;
    const doctorFees = basePrice * 0.15;
    const roomCharges = (basePrice * 0.12 * roomMultiplier) * formData.stayDuration;
    const consumables = basePrice * 0.10;
    const diagnostics = basePrice * 0.08;
    const miscCharges = basePrice * 0.05;
    
    const totalCost = basePrice + doctorFees + roomCharges + consumables + diagnostics + miscCharges;
    
    let insuranceCovered = 0;
    let outOfPocket = totalCost;
    
    if (formData.hasInsurance && formData.coverageAmount > 0) {
      const coveragePercentage = 0.85; // 85% typical coverage
      insuranceCovered = Math.min(totalCost * coveragePercentage, formData.coverageAmount);
      outOfPocket = totalCost - insuranceCovered;
    }

    return {
      breakdown: [
        { category: 'Surgery Base Cost', amount: basePrice, covered: formData.hasInsurance },
        { category: 'Doctor Consultation', amount: doctorFees, covered: formData.hasInsurance },
        { category: 'Room Charges', amount: roomCharges, covered: formData.hasInsurance },
        { category: 'Consumables', amount: consumables, covered: false },
        { category: 'Diagnostics', amount: diagnostics, covered: formData.hasInsurance },
        { category: 'Miscellaneous', amount: miscCharges, covered: formData.hasInsurance }
      ],
      totalCost,
      insuranceCovered,
      outOfPocket,
      confidenceScore: 87
    };
  };

  const results = step === 4 ? calculateCosts() : null;

  const chartData = results?.breakdown.map(item => ({
    name: item.category,
    Amount: Math.round(item.amount / 1000),
    Covered: item.covered ? Math.round(item.amount / 1000) : 0,
    'Out of Pocket': !item.covered ? Math.round(item.amount / 1000) : 0
  }));

  const recommendations = [
    {
      type: 'Cost Saving',
      icon: TrendingUp,
      title: 'Consider Narayana Health',
      description: 'Save up to ₹85,000 with comparable quality',
      savings: 85000
    },
    {
      type: 'Insurance',
      icon: Shield,
      title: 'Upgrade Room Type',
      description: 'Your insurance covers private room with minimal co-pay',
      savings: 0
    },
    {
      type: 'Financing',
      icon: CreditCard,
      title: 'Zero-Cost EMI Available',
      description: 'Convert out-of-pocket to 12-month EMI at 0% interest',
      savings: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pre-Admission Cost Simulator</h1>
          <p className="text-gray-600">Get accurate cost estimates and personalized recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  s <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s < step ? <CheckCircle className="h-6 w-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Treatment</span>
            <span>Hospital</span>
            <span>Insurance</span>
            <span>Results</span>
          </div>
        </div>

        {/* Step 1: Treatment Selection */}
        {step === 1 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Treatment & Stay Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
                <select
                  value={formData.procedure}
                  onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                  className="input-field"
                >
                  <option value="">Choose a procedure...</option>
                  {procedures.map(proc => (
                    <option key={proc} value={proc}>{proc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {roomTypes.map(room => (
                    <button
                      key={room.value}
                      onClick={() => setFormData({ ...formData, roomType: room.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.roomType === room.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{room.label}</div>
                      <div className="text-sm text-gray-600">
                        {room.multiplier === 1 ? 'Standard' : `+${((room.multiplier - 1) * 100).toFixed(0)}%`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Stay Duration: {formData.stayDuration} days
                </label>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={formData.stayDuration}
                  onChange={(e) => setFormData({ ...formData, stayDuration: Number(e.target.value) })}
                  className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 day</span>
                  <span>14 days</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.procedure}
                className="btn-primary w-full"
              >
                Next: Choose Hospital <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Hospital Selection */}
        {step === 2 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Hospital</h2>
            
            <div className="space-y-4 mb-6">
              {hospitals.map(hospital => (
                <button
                  key={hospital.name}
                  onClick={() => setFormData({ ...formData, hospital: hospital.name })}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    formData.hospital === hospital.name
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {hospital.name}
                        <a 
                          href={hospital.name.includes('Apollo') ? 'https://www.apollohospitals.com/' : 
                                hospital.name.includes('Manipal') ? 'https://www.manipalhospitals.com/' : 
                                hospital.name.includes('Fortis') ? 'https://www.fortishealthcare.com/' : 
                                hospital.name.includes('Columbia') ? 'https://www.columbiaasia.com/' : 
                                hospital.name.includes('Narayana') ? 'https://www.narayanahealth.org/' : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-2 text-xs text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          (Visit Website)
                        </a>
                      </div>
                      <div className="text-sm text-gray-600">Base Price: ₹{(hospital.basePrice / 1000).toFixed(0)}K</div>
                    </div>
                    <Building2 className="h-8 w-8 text-primary-600" />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.hospital}
                className="btn-primary flex-1"
              >
                Next: Insurance Details <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Insurance Details */}
        {step === 3 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance & Financing</h2>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasInsurance}
                    onChange={(e) => setFormData({ ...formData, hasInsurance: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="text-gray-900 font-medium">I have health insurance</span>
                </label>
              </div>

              {formData.hasInsurance && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                    <select
                      value={formData.insuranceProvider}
                      onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select provider...</option>
                      <option value="star">Star Health</option>
                      <option value="hdfc">HDFC Ergo</option>
                      <option value="icici">ICICI Lombard</option>
                      <option value="bajaj">Bajaj Allianz</option>
                      <option value="care">Care Health</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount</label>
                    <input
                      type="number"
                      value={formData.coverageAmount}
                      onChange={(e) => setFormData({ ...formData, coverageAmount: Number(e.target.value) })}
                      className="input-field"
                      placeholder="e.g., 500000"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsFinancing}
                    onChange={(e) => setFormData({ ...formData, needsFinancing: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="text-gray-900 font-medium">I need financing options</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-primary flex-1"
                >
                  Calculate Costs <Calculator className="ml-2 h-5 w-5 inline" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && results && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="card bg-gradient-to-br from-primary-600 to-teal-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Cost Estimate Summary</h2>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {results.confidenceScore}% Confidence
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-blue-100 text-sm mb-1">Total Treatment Cost</div>
                  <div className="text-3xl font-bold">₹{(results.totalCost / 1000).toFixed(0)}K</div>
                </div>
                {formData.hasInsurance && (
                  <div>
                    <div className="text-blue-100 text-sm mb-1">Insurance Covers</div>
                    <div className="text-3xl font-bold">₹{(results.insuranceCovered / 1000).toFixed(0)}K</div>
                  </div>
                )}
                <div>
                  <div className="text-blue-100 text-sm mb-1">Your Out-of-Pocket</div>
                  <div className="text-3xl font-bold">₹{(results.outOfPocket / 1000).toFixed(0)}K</div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Chart */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Cost Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} />
                  <YAxis label={{ value: '₹ Thousands', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: any) => `₹${value}K`} />
                  <Legend />
                  <Bar dataKey="Covered" stackId="a" fill="#52c41a" />
                  <Bar dataKey="Out of Pocket" stackId="a" fill="#ff7875" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Items */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cost Line Items</h2>
              <div className="space-y-3">
                {results.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {item.covered ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      )}
                      <span className="font-medium text-gray-900">{item.category}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{(item.amount / 1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Smart Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <rec.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-blue-600 font-medium uppercase mb-1">{rec.type}</div>
                      <h3 className="font-bold text-gray-900 mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-700">{rec.description}</p>
                      {rec.savings > 0 && (
                        <div className="text-sm font-semibold text-green-600 mt-2">
                          Potential Savings: ₹{(rec.savings / 1000).toFixed(0)}K
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="btn-secondary">
                Start Over
              </button>
              <button 
                onClick={() => navigate('/summary', { state: { results, formData } })}
                className="btn-primary flex-1"
              >
                Generate Full Report <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

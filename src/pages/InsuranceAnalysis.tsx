import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Info, Shield, DollarSign, Clock, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function InsuranceAnalysis() {
  const [policyUploaded, setPolicyUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPolicyUploaded(true);
      setAnalyzing(false);
      setAnalysisComplete(true);
    }
  };

  const mockPolicyData = {
    policyNumber: 'SH-2024-789456',
    provider: 'Star Health Insurance',
    policyHolder: 'John Doe',
    coverageAmount: 500000,
    premium: 15000,
    validUntil: '2025-12-31',
    type: 'Individual Health Insurance'
  };

  const coverageBreakdown = [
    { name: 'Surgery Covered', value: 350000, color: '#52c41a' },
    { name: 'Out of Pocket', value: 55000, color: '#faad14' },
    { name: 'Room Sub-limit', value: 45000, color: '#1890ff' },
    { name: 'Consumables', value: 50000, color: '#ff7875' }
  ];

  const eligibilityChecks = [
    { label: 'Policy Active Status', status: 'pass', message: 'Policy is active and valid' },
    { label: 'Waiting Period', status: 'pass', message: 'No waiting period applicable' },
    { label: 'Pre-existing Conditions', status: 'warning', message: '2 years waiting period completed' },
    { label: 'Sub-limits Check', status: 'warning', message: 'Room rent capped at ₹5,000/day' }
  ];

  const coverageDetails = [
    {
      category: 'Hospital Charges',
      covered: true,
      amount: '₹2,85,000',
      details: 'Covered under surgery sub-limit'
    },
    {
      category: 'Doctor Consultation',
      covered: true,
      amount: '₹45,000',
      details: 'Fully covered'
    },
    {
      category: 'Room Rent (Private)',
      covered: false,
      amount: '₹35,000',
      details: 'Sub-limit: ₹5,000/day. Excess ₹10,000'
    },
    {
      category: 'Consumables',
      covered: false,
      amount: '₹28,000',
      details: 'Not covered - Out of pocket'
    },
    {
      category: 'Post-operative Care',
      covered: true,
      amount: '₹12,000',
      details: 'Covered for 7 days'
    }
  ];

  const claimGuidance = [
    {
      type: 'Cashless',
      recommended: true,
      hospitals: 15,
      process: 'Pre-authorization required 48hrs before admission',
      turnaround: '24-48 hours'
    },
    {
      type: 'Reimbursement',
      recommended: false,
      hospitals: 0,
      process: 'Submit bills within 30 days post-discharge',
      turnaround: '15-30 days'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Coverage Analysis</h1>
          <p className="text-gray-600">Upload your policy to understand exact coverage and out-of-pocket costs</p>
        </div>

        {/* Upload Section */}
        {!analysisComplete && (
          <div className="card mb-8">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Upload Insurance Policy</h2>
              <p className="text-gray-600 mb-6">PDF, JPEG, or PNG • Max 10MB</p>
              
              <label className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 cursor-pointer transition-colors">
                <Upload className="h-5 w-5 mr-2" />
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </label>

              {analyzing && (
                <div className="mt-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">AI analyzing your policy...</p>
                </div>
              )}

              <div className="mt-8 grid md:grid-cols-3 gap-4 text-left">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Plain Language</h3>
                  <p className="text-sm text-gray-600">Complex terms explained simply</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <Shield className="h-6 w-6 text-teal-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Coverage Gaps</h3>
                  <p className="text-sm text-gray-600">Identify what's not covered</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Cost Prediction</h3>
                  <p className="text-sm text-gray-600">Know exact out-of-pocket amount</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisComplete && (
          <>
            {/* Policy Summary */}
            <div className="card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Policy Summary</h2>
                  <p className="text-sm text-gray-600">AI-analyzed in 2.3 seconds</p>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Analysis Complete
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Provider</div>
                  <div className="font-semibold text-gray-900">{mockPolicyData.provider}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Policy Number</div>
                  <div className="font-semibold text-gray-900">{mockPolicyData.policyNumber}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Coverage Amount</div>
                  <div className="font-semibold text-gray-900">₹{mockPolicyData.coverageAmount.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Valid Until</div>
                  <div className="font-semibold text-gray-900">{mockPolicyData.validUntil}</div>
                </div>
              </div>
            </div>

            {/* Eligibility Checks */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Verification</h2>
              <div className="space-y-3">
                {eligibilityChecks.map((check, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {check.status === 'pass' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{check.label}</div>
                      <div className="text-sm text-gray-600">{check.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Chart */}
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cost Coverage Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={coverageBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {coverageBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Total Treatment Cost</span>
                    <span className="font-bold text-gray-900">₹4,05,000</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Insurance Covers</span>
                    <span className="font-bold text-green-600">₹3,50,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-700 font-semibold">Your Out-of-Pocket</span>
                    <span className="font-bold text-lg text-orange-600">₹55,000</span>
                  </div>
                </div>
              </div>

              {/* Coverage Details */}
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Line-by-Line Coverage</h2>
                <div className="space-y-3">
                  {coverageDetails.map((item, idx) => (
                    <div key={idx} className="border-l-4 pl-3 py-2" style={{ borderColor: item.covered ? '#52c41a' : '#ff7875' }}>
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-medium text-gray-900">{item.category}</span>
                        <span className="font-semibold">{item.amount}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        {item.covered ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className="text-gray-600">{item.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Claim Guidance */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Claim Process Guidance</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {claimGuidance.map((claim, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-2 ${
                    claim.recommended ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{claim.type} Claim</h3>
                      {claim.recommended && (
                        <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-700">
                        <Shield className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{claim.hospitals} hospitals available</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Turnaround: {claim.turnaround}</span>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <Info className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span>{claim.process}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Alerts */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Important Considerations</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Room rent sub-limit may cause proportional deductions on other charges</li>
                    <li>• Consumables are not covered - budget additional ₹28,000</li>
                    <li>• Pre-authorization must be initiated 48 hours before admission</li>
                    <li>• Network hospital list available - choose cashless facility to avoid upfront payment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="btn-primary">Proceed to Financing Options</button>
              <button className="btn-secondary">Download Full Report</button>
              <button 
                onClick={() => {
                  setAnalysisComplete(false);
                  setPolicyUploaded(false);
                }}
                className="btn-secondary"
              >
                Analyze Another Policy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

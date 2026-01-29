import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Share2, CheckCircle, Shield, CreditCard, FileText, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function SummaryReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, formData } = location.state || {};

  if (!results || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Report Data Available</h2>
          <p className="text-gray-600 mb-6">Please complete the cost simulator first</p>
          <button onClick={() => navigate('/simulator')} className="btn-primary">
            Go to Simulator
          </button>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById('summary-report');
    if (!reportElement) return;

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: reportElement.scrollWidth,
        windowHeight: reportElement.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`MediFinance-Report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button onClick={handleDownloadPDF} className="btn-primary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Report Container */}
        <div id="summary-report" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Report Header */}
          <div className="bg-gradient-to-r from-primary-600 to-teal-600 text-white p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Pre-Admission Cost Report</h1>
                <p className="text-blue-100">Generated on {currentDate}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-xs text-blue-100 mb-1">Confidence Score</div>
                <div className="text-2xl font-bold">{results.confidenceScore}%</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div>
                <div className="text-blue-100 text-sm mb-1">Total Cost</div>
                <div className="text-2xl font-bold">₹{results.totalCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-blue-100 text-sm mb-1">Insurance Covers</div>
                <div className="text-2xl font-bold">₹{results.insuranceCovered.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-blue-100 text-sm mb-1">Out-of-Pocket</div>
                <div className="text-2xl font-bold">₹{results.outOfPocket.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Report Body */}
          <div className="p-8 space-y-8">
            {/* Patient Details */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary-600" />
                Treatment Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Procedure</div>
                  <div className="font-semibold text-gray-900">{formData.procedure}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Room Type</div>
                  <div className="font-semibold text-gray-900 capitalize">{formData.roomType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Stay Duration</div>
                  <div className="font-semibold text-gray-900">{formData.stayDuration} days</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Date</div>
                  <div className="font-semibold text-gray-900">{currentDate}</div>
                </div>
              </div>
            </section>

            {/* Hospital */}
            <section>
              {/* <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Hospital className="h-5 w-5 mr-2 text-primary-600" />
                Selected Hospital
              </h2> */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{formData.hospital}</h3>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-semibold text-gray-900 ml-2">4.6/5</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-semibold text-gray-900 ml-2">94.8%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-semibold text-gray-900 ml-2">5.8 km</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Cost Breakdown */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Itemized Cost Breakdown</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Item</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Coverage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.breakdown.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                        <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                          ₹{item.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.covered ? (
                            <CheckCircle className="h-5 w-5 text-green-600 inline" />
                          ) : (
                            <span className="text-xs text-gray-500">Out of Pocket</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-primary-50 font-bold">
                      <td className="px-6 py-4 text-sm text-gray-900">Total Estimated Cost</td>
                      <td className="px-6 py-4 text-sm text-right text-primary-700">
                        ₹{results.totalCost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Insurance Summary */}
            {formData.hasInsurance && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary-600" />
                  Insurance Coverage
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Provider</div>
                      <div className="font-semibold text-gray-900 capitalize">{formData.insuranceProvider}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Coverage Amount</div>
                      <div className="font-semibold text-gray-900">₹{formData.coverageAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Covered by Insurance</div>
                      <div className="font-semibold text-green-700 text-lg">₹{results.insuranceCovered.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Your Share</div>
                      <div className="font-semibold text-orange-600 text-lg">₹{results.outOfPocket.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Financing */}
            {formData.needsFinancing && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
                  Financing Options
                </h2>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    Based on your out-of-pocket amount of <strong>₹{results.outOfPocket.toLocaleString()}</strong>, 
                    here are your financing options:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">Zero-Cost EMI (12 months)</div>
                        <div className="text-sm text-gray-600">No interest, no hidden charges</div>
                      </div>
                      <div className="text-lg font-bold text-primary-600">
                        ₹{Math.round(results.outOfPocket / 12).toLocaleString()}/mo
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">Medical Loan (24 months)</div>
                        <div className="text-sm text-gray-600">10.5% p.a. interest rate</div>
                      </div>
                      <div className="text-lg font-bold text-primary-600">
                        ₹{Math.round((results.outOfPocket * 1.105) / 24).toLocaleString()}/mo
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Important Notes */}
            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Important Considerations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• This is an estimate based on current data. Actual costs may vary.</li>
                <li>• Insurance coverage is subject to policy terms and conditions.</li>
                <li>• Additional costs may apply for complications or extended stays.</li>
                <li>• Pre-authorization from insurance company is mandatory for cashless claims.</li>
                <li>• Validity of this estimate: 30 days from generation date.</li>
              </ul>
            </section>

            {/* Footer */}
            <section className="text-center pt-8 border-t">
              <p className="text-gray-600 text-sm mb-4">
                This report was generated by MediFinance Platform
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={() => navigate('/compare')} className="btn-secondary">
                  Compare More Hospitals
                </button>
                <button onClick={() => navigate('/financing')} className="btn-primary">
                  Apply for Financing
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

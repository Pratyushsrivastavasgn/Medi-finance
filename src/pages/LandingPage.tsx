import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Shield, 
  CreditCard, 
  Calculator, 
  CheckCircle,
  ArrowRight,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function LandingPage() {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Hidden Costs',
      description: 'Unexpected bills after treatment with no transparency on actual costs'
    },
    {
      icon: FileText,
      title: 'Insurance Confusion',
      description: 'Complex policy terms, unclear coverage, and claim rejection fears'
    },
    {
      icon: DollarSign,
      title: 'Financing Gap',
      description: 'Limited access to affordable payment options when you need care most'
    }
  ];

  const solutions = [
    {
      icon: DollarSign,
      title: 'Treatment Cost Transparency',
      description: 'Compare real hospital pricing, including hidden costs, before admission',
      link: '/compare',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Insurance Intelligence',
      description: 'AI-powered policy analysis shows exact coverage and out-of-pocket costs',
      link: '/insurance',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: CreditCard,
      title: 'Smart Financing',
      description: 'Instant EMI options and medical loans with transparent terms',
      link: '/financing',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calculator,
      title: 'Pre-Admission Simulator',
      description: 'Get accurate cost predictions and personalized recommendations',
      link: '/simulator',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { value: '500+', label: 'Partner Hospitals' },
    { value: '₹100Cr+', label: 'Financing Enabled' },
    { value: '50K+', label: 'Patients Helped' },
    { value: '4.8/5', label: 'User Rating' }
  ];

  const features = [
    'Real-time hospital pricing data',
    'Plain-language policy interpretation',
    'Zero-credit-check financing pre-approval',
    'Cashless vs reimbursement guidance',
    'Sub-limit and waiting period alerts',
    'Confidence scores on all estimates'
  ];

  return (
    <div className="min-h-screen">     {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src="/images/logo.png" alt="MediFinance Logo" className="h-24 w-24 object-contain drop-shadow-2xl" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              MediFinance
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-teal-100">
              Health & Wealth, Aligned
            </p>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Know Your Treatment Costs Before Hospital Admission
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/simulator" className="bg-white text-primary-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Start Cost Simulator <ArrowRight className="inline ml-2" />
              </Link>
              <Link to="/compare" className="bg-primary-800/50 backdrop-blur-sm hover:bg-primary-800/70 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all">
                Compare Hospital Costs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Healthcare Cost Problem</h2>
            <p className="text-xl text-gray-600">85% of patients face unexpected medical bills</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, idx) => (
              <div key={idx} className="card text-center">
                <problem.icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Solution: Complete Financial Clarity
            </h2>
            <p className="text-xl text-gray-600">
              Four powerful tools working together for your peace of mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, idx) => (
              <Link 
                key={idx} 
                to={solution.link}
                className="group card hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary-200"
              >
                <div className={`bg-gradient-to-r ${solution.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <solution.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <span className="text-primary-600 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Trust & Transparency Built-In
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Select Procedure', desc: 'Choose your treatment type' },
              { step: '2', title: 'Compare Options', desc: 'View hospital costs & insurance coverage' },
              { step: '3', title: 'Check Financing', desc: 'Get instant EMI options' },
              { step: '4', title: 'Book with Confidence', desc: 'Know exact costs before admission' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-gradient-to-br from-primary-600 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your Healthcare Costs?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 50,000+ patients who've saved ₹100Cr+ on healthcare expenses
          </p>
          <Link 
            to="/simulator" 
            className="bg-white text-primary-700 hover:bg-gray-50 font-semibold px-10 py-5 rounded-xl text-lg transition-all duration-200 inline-flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start Your Cost Simulation
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}

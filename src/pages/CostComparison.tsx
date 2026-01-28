import { useState } from 'react';
import { Search, MapPin, Filter, Star, TrendingUp, DollarSign, Award, Navigation } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Hospital } from '../types';

export default function CostComparison() {
  const mockHospitals: Hospital[] = [
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
      availableRooms: {
        general: true,
        semiprivate: true,
        private: true
      },
      specializations: ['Orthopedics', 'Cardiology', 'Neurology'],
      cashlessInsurers: ['Star Health', 'HDFC Ergo', 'ICICI Lombard']
    },
    {
      id: '2',
      name: 'Manipal Hospital',
      location: 'HAL Airport Road, Bangalore',
      distance: 5.8,
      rating: 4.6,
      reviewCount: 982,
      successRate: 94.8,
      isPremium: true,
      pricing: {
        basePrice: 265000,
        doctorFees: 40000,
        roomCharges: 32000,
        consumables: 25000,
        miscCharges: 10000,
        total: 372000
      },
      availableRooms: {
        general: true,
        semiprivate: true,
        private: true
      },
      specializations: ['Orthopedics', 'Gastroenterology', 'Oncology'],
      cashlessInsurers: ['Star Health', 'Bajaj Allianz', 'Max Bupa']
    },
    {
      id: '3',
      name: 'Columbia Asia Hospital',
      location: 'Sarjapur Road, Bangalore',
      distance: 7.5,
      rating: 4.4,
      reviewCount: 756,
      successRate: 92.3,
      isPremium: false,
      pricing: {
        basePrice: 225000,
        doctorFees: 35000,
        roomCharges: 25000,
        consumables: 22000,
        miscCharges: 8000,
        total: 315000
      },
      availableRooms: {
        general: true,
        semiprivate: true,
        private: false
      },
      specializations: ['Orthopedics', 'General Surgery'],
      cashlessInsurers: ['HDFC Ergo', 'Care Health']
    },
    {
      id: '4',
      name: 'Fortis Hospital',
      location: 'Cunningham Road, Bangalore',
      distance: 4.2,
      rating: 4.5,
      reviewCount: 891,
      successRate: 93.7,
      isPremium: true,
      pricing: {
        basePrice: 275000,
        doctorFees: 42000,
        roomCharges: 30000,
        consumables: 26000,
        miscCharges: 11000,
        total: 384000
      },
      availableRooms: {
        general: true,
        semiprivate: true,
        private: true
      },
      specializations: ['Orthopedics', 'Cardiology'],
      cashlessInsurers: ['Star Health', 'ICICI Lombard', 'Religare']
    },
    {
      id: '5',
      name: 'Narayana Health City',
      location: 'Bommasandra, Bangalore',
      distance: 12.3,
      rating: 4.3,
      reviewCount: 1567,
      successRate: 91.5,
      isPremium: false,
      pricing: {
        basePrice: 195000,
        doctorFees: 30000,
        roomCharges: 20000,
        consumables: 20000,
        miscCharges: 7000,
        total: 272000
      },
      availableRooms: {
        general: true,
        semiprivate: true,
        private: false
      },
      specializations: ['Orthopedics', 'Cardiac Surgery', 'Oncology'],
      cashlessInsurers: ['Bajaj Allianz', 'Care Health', 'National Insurance']
    }
  ];

  const [hospitals] = useState<Hospital[]>(mockHospitals);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(mockHospitals);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState('Knee Replacement Surgery');
  const [location, setLocation] = useState('Bangalore');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');

  const procedures = [
    'Knee Replacement Surgery',
    'Cardiac Bypass Surgery',
    'Cataract Surgery',
    'Appendectomy',
    'Hernia Repair',
    'Cesarean Section'
  ];

  const handleSearch = () => {
    let filtered = [...hospitals];

    if (searchTerm) {
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricing.total - b.pricing.total;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        default:
          return 0;
      }
    });

    setFilteredHospitals(filtered);
  };

  const chartData = filteredHospitals.map(h => ({
    name: h.name.split(' ')[0],
    'Total Cost': h.pricing.total / 1000,
    'Base Price': h.pricing.basePrice / 1000,
    'Doctor Fees': h.pricing.doctorFees / 1000,
    'Room & Others': (h.pricing.roomCharges + h.pricing.consumables + h.pricing.miscCharges) / 1000
  }));

  const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Cost Comparison</h1>
          <p className="text-gray-600">Transparent pricing across hospitals in your area</p>
        </div>

        {/* Search & Filter Section */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
              <select 
                value={selectedProcedure}
                onChange={(e) => setSelectedProcedure(e.target.value)}
                className="input-field"
              >
                {procedures.map(proc => (
                  <option key={proc} value={proc}>{proc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Hospital</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Hospital name..."
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <button
              onClick={() => { setSortBy('price'); handleSearch(); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'price' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-1" />
              Price
            </button>
            <button
              onClick={() => { setSortBy('rating'); handleSearch(); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'rating' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className="h-4 w-4 inline mr-1" />
              Rating
            </button>
            <button
              onClick={() => { setSortBy('distance'); handleSearch(); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'distance' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Navigation className="h-4 w-4 inline mr-1" />
              Distance
            </button>
          </div>
        </div>

        {/* Cost Comparison Chart */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cost Breakdown Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Cost (₹ Thousands)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `₹${value}K`} />
              <Legend />
              <Bar dataKey="Base Price" stackId="a" fill="#1890ff" />
              <Bar dataKey="Doctor Fees" stackId="a" fill="#52c41a" />
              <Bar dataKey="Room & Others" stackId="a" fill="#faad14" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hospital Cards */}
        <div className="space-y-6">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{hospital.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hospital.location}</span>
                        <span className="mx-2">•</span>
                        <span>{hospital.distance} km away</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-semibold">{hospital.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({hospital.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center text-teal-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{hospital.successRate}% success rate</span>
                        </div>
                        {hospital.isPremium && (
                          <div className="flex items-center bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                            <Award className="h-3 w-3 mr-1" />
                            Premium
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Base Price</div>
                      <div className="font-semibold text-gray-900">₹{(hospital.pricing.basePrice / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Doctor Fees</div>
                      <div className="font-semibold text-gray-900">₹{(hospital.pricing.doctorFees / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Room Charges</div>
                      <div className="font-semibold text-gray-900">₹{(hospital.pricing.roomCharges / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Consumables</div>
                      <div className="font-semibold text-gray-900">₹{(hospital.pricing.consumables / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <div className="text-xs text-primary-600 mb-1">Total Est.</div>
                      <div className="font-bold text-primary-700 text-lg">₹{(hospital.pricing.total / 1000).toFixed(0)}K</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-gray-500">Cashless:</span>
                    {hospital.cashlessInsurers.slice(0, 3).map(insurer => (
                      <span key={insurer} className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs font-medium">
                        {insurer}
                      </span>
                    ))}
                    {hospital.cashlessInsurers.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        +{hospital.cashlessInsurers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-2">
                  <button className="btn-primary whitespace-nowrap">Select Hospital</button>
                  <button className="btn-secondary whitespace-nowrap text-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="card text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

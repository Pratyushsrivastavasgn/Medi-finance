import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/images/logo.png" alt="MediFinance Logo" className="h-8 w-8 object-contain" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">MediFinance</span>
                <span className="text-xs text-gray-400 -mt-1">Health & Wealth, Aligned</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Empowering patients with transparent healthcare financing decisions.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/compare" className="hover:text-primary-400 transition-colors">Cost Comparison</Link></li>
              <li><Link to="/insurance" className="hover:text-primary-400 transition-colors">Insurance Analysis</Link></li>
              <li><Link to="/financing" className="hover:text-primary-400 transition-colors">Financing Options</Link></li>
              <li><Link to="/simulator" className="hover:text-primary-400 transition-colors">Cost Simulator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Ministry of Health</a></li>
              <li><a href="https://www.irdai.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">IRDAI Guidelines</a></li>
              <li><a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">National Health Portal</a></li>
              <li><a href="https://pmjay.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Ayushman Bharat</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@medifinance.health</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91-1800-MEDI-FIN</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; 2026 MediFinance. All rights reserved. | Built for healthcare equity.</p>
        </div>
      </div>
    </footer>
  );
}

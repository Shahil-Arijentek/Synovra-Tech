import { useState } from 'react';
import ProofInNumbers from '../components/ProofInNumbers';
import ProofInNumbersGSAP from '../components/ProofInNumbersGSAP';

const ProofInNumbersDemo = () => {
  const [activeVersion, setActiveVersion] = useState<'css' | 'gsap'>('gsap');

  return (
    <div className="bg-black min-h-screen">
      {/* Version Selector */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-xl font-bold">Proof in Numbers - Demo</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveVersion('css')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeVersion === 'css'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                CSS Version
              </button>
              <button
                onClick={() => setActiveVersion('gsap')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeVersion === 'gsap'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                GSAP Version ⭐
              </button>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Scroll down to see the scroll-lock in action
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to the Demo
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Scroll down to experience the scroll-lock animation
          </p>
          <div className="flex justify-center">
            <svg
              className="w-8 h-8 text-orange-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Component */}
      {activeVersion === 'css' ? <ProofInNumbers /> : <ProofInNumbersGSAP />}

      {/* Footer Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gray-900 to-black">
        <div className="text-center px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Animation Complete! 🎉
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            You can now scroll freely
          </p>
          <div className="bg-gray-800 rounded-xl p-8 max-w-2xl mx-auto text-left">
            <h3 className="text-2xl font-bold text-white mb-4">
              {activeVersion === 'css' ? '📝 CSS Version' : '⚡ GSAP Version'}
            </h3>
            {activeVersion === 'css' ? (
              <ul className="text-gray-300 space-y-2">
                <li>✅ Simple implementation</li>
                <li>✅ No additional libraries</li>
                <li>✅ Easy to understand</li>
                <li>✅ Good for prototyping</li>
                <li className="mt-4 text-orange-500">
                  💡 Try the GSAP version for smoother scrolling!
                </li>
              </ul>
            ) : (
              <ul className="text-gray-300 space-y-2">
                <li>✅ Ultra-smooth pinning</li>
                <li>✅ Premium user experience</li>
                <li>✅ Better mobile support</li>
                <li>✅ No scroll jumps</li>
                <li className="mt-4 text-green-500">
                  ⭐ Recommended for production!
                </li>
              </ul>
            )}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all"
          >
            Scroll to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProofInNumbersDemo;

export default function RevivalEngineered() {
  const features = [
    { 
      icon: <img src="/RevivalIcon/RevivalIcon1.svg" alt="Consistent Quality" className="w-[18px] h-[18px]" />,
      title: 'Consistent Quality',
      description: 'Every revived battery meets a 95%+ performance benchmark, verified before leaving the bench.'
    },
    { 
      icon: <img src="/RevivalIcon/RevivalIcon2.svg" alt="Traceable Process" className="w-[18px] h-[18px]" />,
      title: 'Traceable Process',
      description: 'Each unit is serial linked to its revival data for compliance, resale, and warranty validation.'
    },
    { 
      icon: <img src="/RevivalIcon/RevivalIcon3.svg" alt="Process Tailored to Battery Chemistry" className="w-[18px] h-[18px]" />,
      title: 'Process Tailored to Battery Chemistry',
      description: 'Revival protocols are optimized for different types and chemistries to ensure maximum recovery and reliability.'
    },
    { 
      icon: <img src="/RevivalIcon/RevivalIcon4.svg" alt="Rapid Turnaround" className="w-[18px] h-[18px]" />,
      title: 'Rapid Turnaround',
      description: 'Revival cycles are completed in hours, minimizing downtime and maximizing returns.'
    },
  ]

  return (
    <section className="bg-black py-20 px-6 text-white">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left side - Battery Image */}
        <div className="w-full md:w-[45%] flex items-center justify-center">
          <img 
            src="/RevivalIcon/RevivalBattery.png" 
            alt="Revival Battery" 
            className="w-full h-auto object-contain max-w-[600px]"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center max-w-[650px]">
          {/* Title */}
          <h2 
            className="mb-5 text-white font-bold tracking-tight"
            style={{
              fontFamily: 'Arial',
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: '1.15',
            }}
          >
            Revival, Engineered for Repeatable Results
          </h2>
          
          {/* Paragraph */}
          <p 
            className="mb-8 text-white/70"
            style={{
              fontFamily: 'Arial',
              fontWeight: 400,
              fontSize: '17px',
              lineHeight: '1.65',
            }}
          >
            From heavily sulphated plates to high performance cells — Synovra restores performance to 95%+ in hours. Every unit is processed with the same precision, every time.
          </p>
          
          {/* Features List */}
          <div className="flex flex-col gap-5 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icon Container */}
                <div 
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 107, 26, 0.1)',
                    marginTop: '2px'
                  }}
                >
                  <div className="w-[18px] h-[18px]">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <p 
                    className="text-white"
                    style={{
                      fontFamily: 'Arial',
                      fontSize: '15px',
                      lineHeight: '23px',
                    }}
                  >
                    <span className="font-bold">{feature.title}</span>
                    <span className="font-normal text-white/60">{` - ${feature.description}`}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              className="rounded-[4px] px-8 py-4 cursor-pointer transition-all hover:bg-[#ff6b1a]/90 hover:shadow-[0_0_30px_rgba(255,107,26,0.6)] whitespace-nowrap text-white font-bold"
              style={{
                backgroundColor: '#ff6b1a',
                fontFamily: 'Arial',
                fontSize: '16px',
                border: 'none'
              }}
            >
              Request Demo
            </button>
            <button 
              className="rounded-[4px] px-8 py-4 cursor-pointer transition-all duration-300 whitespace-nowrap bg-white/10 text-white border border-white/20 hover:bg-white/20 font-normal"
              style={{
                fontFamily: 'Arial',
                fontSize: '16px',
              }}
            >
              Explore Technology
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
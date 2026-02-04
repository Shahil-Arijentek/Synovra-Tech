import { useState, useEffect } from 'react'

export default function GetStarted() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    role: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    // Ensure smooth rendering
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/
    return phoneRegex.test(phone)
  }

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.companyName) {
      alert('Please fill in all required fields (Name, Email, Company)')
      return
    }

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      alert('Please enter a valid phone number')
      return
    }

    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName),
      companyName: sanitizeInput(formData.companyName),
      role: sanitizeInput(formData.role),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      message: sanitizeInput(formData.message),
    }

    // TODO: Connect to backend API
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(sanitizedData) })
    
    alert(`Form submitted successfully!\n\nData ready to send:\n${JSON.stringify(sanitizedData, null, 2)}`)
  }

  return (
    <div className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden overflow-y-auto pb-0 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/beforeyourecycle.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1396px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-28 md:pb-20 lg:py-32">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto px-4">
            Start a conversation with Synovra to explore battery revival, lifecycle management, or strategic partnerships.
          </p>
        </div>

        {/* Form Container */}
        <div className="flex flex-col items-start w-full min-h-[632px] md:h-auto bg-black/80 border border-[rgba(255,255,255,0.05)] rounded-[14px] pt-[24px] sm:pt-[33px] px-[20px] sm:px-[33px] pb-[24px] sm:pb-px">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] sm:gap-[24px] w-full">
            {/* Row 1: Full Name and Company Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[24px]">
              <div className="flex flex-col gap-[6px] sm:gap-[8px]">
                <label htmlFor="fullName" className="font-['Arial',sans-serif] text-[13px] sm:text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="flex items-center self-stretch bg-black/60 border border-[rgba(255,255,255,0.16)] rounded-[8px] sm:rounded-[10px] h-[45px] sm:h-[50px] px-[14px] sm:px-[16px] py-[10px] sm:py-[12px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#ff6b1a] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-[6px] sm:gap-[8px]">
                <label htmlFor="companyName" className="font-['Arial',sans-serif] text-[13px] sm:text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="flex items-center self-stretch bg-black/60 border border-[rgba(255,255,255,0.16)] rounded-[8px] sm:rounded-[10px] h-[45px] sm:h-[50px] px-[14px] sm:px-[16px] py-[10px] sm:py-[12px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#ff6b1a] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Role/Designation */}
            <div className="flex flex-col gap-[6px] sm:gap-[8px]">
              <label htmlFor="role" className="font-['Arial',sans-serif] text-[13px] sm:text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                Role / Designation *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter your role"
                className="flex items-center self-stretch bg-black/60 border border-[rgba(255,255,255,0.16)] rounded-[8px] sm:rounded-[10px] h-[45px] sm:h-[50px] px-[14px] sm:px-[16px] py-[10px] sm:py-[12px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#ff6b1a] transition-colors"
              />
            </div>

            {/* Row 3: Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[24px]">
              <div className="flex flex-col gap-[6px] sm:gap-[8px]">
                <label htmlFor="email" className="font-['Arial',sans-serif] text-[13px] sm:text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="flex items-center self-stretch bg-black/60 border border-[rgba(255,255,255,0.16)] rounded-[8px] sm:rounded-[10px] h-[45px] sm:h-[50px] px-[14px] sm:px-[16px] py-[10px] sm:py-[12px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#ff6b1a] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-[6px] sm:gap-[8px]">
                <label htmlFor="phone" className="font-['Arial',sans-serif] text-[13px] sm:text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="flex items-center self-stretch bg-black/60 border border-[rgba(255,255,255,0.16)] rounded-[8px] sm:rounded-[10px] h-[45px] sm:h-[50px] px-[14px] sm:px-[16px] py-[10px] sm:py-[12px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#ff6b1a] transition-colors"
                />
              </div>
            </div>

            {/* Row 4: Message */}
            <div className="flex flex-col gap-[6px] sm:gap-[8px]">
              <label htmlFor="message" className="font-['Arial',sans-serif] text-[13px] sm:text-[14px] leading-[20px] text-[rgba(255,255,255,0.7)]">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your battery revival needs..."
                rows={5}
                className="bg-black/60 border border-[rgba(255,255,255,0.16)] rounded-[8px] sm:rounded-[10px] h-[120px] sm:h-[146px] px-[14px] sm:px-[16px] py-[10px] sm:py-[12px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#ff6b1a] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#ff6b1a] hover:bg-[#ff6b1a]/90 rounded-[4px] h-[50px] sm:h-[56px] font-['Arial',sans-serif] text-[15px] sm:text-[16px] leading-[24px] text-white text-center transition-all duration-300 will-change-[box-shadow] shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)] w-full"
            >
              Get Started
            </button>
          </form>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12 max-w-[1100px] mx-auto">
          {/* Email Card */}
          <div className="bg-black/80 border border-[rgba(255,255,255,0.05)] rounded-[14px] p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[130px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white/60 text-xs sm:text-sm mb-2 font-['Arial',sans-serif]">Email</p>
            <a href="mailto:yjdoshi@synovratech.com" className="text-white text-xs sm:text-sm font-['Arial',sans-serif] hover:text-[#ff6b1a] transition-colors">
              yjdoshi@synovratech.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-black/80 border border-[rgba(255,255,255,0.05)] rounded-[14px] p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[130px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-white/60 text-xs sm:text-sm mb-2 font-['Arial',sans-serif]">Phone</p>
            <a href="tel:+19254779882" className="text-white text-xs sm:text-sm font-['Arial',sans-serif] hover:text-[#ff6b1a] transition-colors">
              +1 (925) 477-9882
            </a>
          </div>

          {/* Address Card */}
          <div className="bg-black/80 border border-[rgba(255,255,255,0.05)] rounded-[14px] p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[130px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-white/60 text-xs sm:text-sm mb-2 font-['Arial',sans-serif]">Address</p>
            <p className="text-white text-xs sm:text-sm font-['Arial',sans-serif] leading-relaxed">
              2010 Crow Canyon Place, Suite 100<br />
              San Ramon, CA 94583
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

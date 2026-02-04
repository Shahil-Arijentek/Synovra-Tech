export default function FullPageLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[#ff6b1a]/20"></div>
        <div 
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff6b1a] animate-spin"
          style={{
            animationDuration: '1s'
          }}
        ></div>
      </div>
    </div>
  )
}
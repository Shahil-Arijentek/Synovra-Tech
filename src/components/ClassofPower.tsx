export default function ClassofPower() {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-start bg-black overflow-hidden"
      style={{
        padding: '64px 24px 80px',
        minHeight: '100vh'
      }}
    >
      <div
        className="flex w-full max-w-[1200px] flex-col items-center"
        style={{ gap: '16px' }}
      >
        <h2
          className="text-center"
          style={{
            fontFamily: 'Arial',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '56px',
            letterSpacing: '-0.8px',
            color: '#ffffff',
            margin: 0
          }}
        >
          A New Class of Power
        </h2>
        <p
          className="text-center"
          style={{
            fontFamily: 'Arial',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0
          }}
        >
          Chemically restored. Technically validated. Warranty-backed.
        </p>
      </div>

      <div
        className="relative w-full flex items-center justify-center"
        style={{ marginTop: '10px' }}
      >
        <img
          src="/car battery.png"
          alt="Car Battery"
          className="block h-auto"
          style={{
            width: 'min(1024px, 92vw)',
            objectFit: 'contain'
          }}
        />
      </div>
    </section>
  )
}
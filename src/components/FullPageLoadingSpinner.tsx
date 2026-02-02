import LoadingSpinner from './LoadingSpinner'

export default function FullPageLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <LoadingSpinner />
    </div>
  )
}

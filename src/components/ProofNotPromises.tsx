// export default function ProofNotPromises() {
//   const tickerData = ['Cycle #278', '12.6V', 'Lead Recovery 95%', 'Carbon Credit: $42.13', 'Waste Prevented 22kg']

//   return (
//     <section className="bg-black py-8 px-8 overflow-hidden font-sans text-white border-y border-white/5">
//       <div className="max-w-[1200px] mx-auto">
//         <div className="relative h-12 mb-6 overflow-hidden bg-white/5 flex items-center rounded-lg">
//           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
//           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
//           <div className="flex animate-scroll whitespace-nowrap items-center">
//             {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
//               <div key={i} className="flex items-center px-6">
//                 <span className="text-white/70 font-medium mr-4">{item}</span>
//                 <div className="w-2 h-2 bg-[#ff6b1a] rounded-full" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="flex flex-col items-center justify-center gap-4 px-4">
//           <p 
//             className="text-[18px] text-[#4A5565] text-center font-normal leading-[28px]"
//             style={{ fontFamily: 'Arial' }}
//           >
//              Measured outcomes. Verified performance. Extended life.
//           </p>
//           <button 
//             className="bg-[#ff6b1a] h-[58px] rounded-[4px] px-10 text-[#FFF] font-normal text-[18px] leading-[28px] text-center border-none cursor-pointer transition-all hover:bg-[#ff6b1a]/90 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)] whitespace-nowrap"
//             style={{ fontFamily: 'Arial' }}
//           >
//             Request Custom Report
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-33.33%); }
//         }
//         .animate-scroll {
//           animation: scroll 20s linear infinite;
//         }
//       `}</style>
//     </section>
//   )
// }

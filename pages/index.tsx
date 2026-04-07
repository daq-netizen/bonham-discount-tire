import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import DaqWorksLogo from '../components/DaqWorksLogo'

const services = [
  { emoji: '🛞', title: 'Tires & Wheels', desc: 'New & used tires, custom wheels, mounting, balancing, rotation, flat repair, and alignment.' },
  { emoji: '🔧', title: 'Engine & Performance', desc: 'Engine replacement, rebuilds, tune-ups, timing belts, spark plugs, and fuel system service.' },
  { emoji: '🛢️', title: 'Oil & Fluid Service', desc: 'Oil changes from $24.99. Transmission fluid, coolant flushes, power steering, and brake fluid.' },
  { emoji: '🛑', title: 'Brakes & Safety', desc: 'Pads, rotors, calipers, brake lines, and complete brake system overhauls.' },
  { emoji: '❄️', title: 'A/C & Heating', desc: 'Compressor replacement, recharge, heater cores, blend doors, and full climate system repair.' },
  { emoji: '🌡️', title: 'Cooling System', desc: 'Radiators, water pumps, thermostats, hoses, and overheating diagnosis.' },
  { emoji: '⚙️', title: 'Transmission', desc: 'Fluid service, filter replacement, solenoids, and complete transmission replacement.' },
  { emoji: '🔩', title: 'Suspension & Steering', desc: 'Shocks, struts, ball joints, tie rods, control arms, and lift kits for trucks and Jeeps.' },
  { emoji: '💨', title: 'Exhaust & Emissions', desc: 'Mufflers, catalytic converters, exhaust manifolds, and full exhaust system fabrication.' },
  { emoji: '🔋', title: 'Electrical & Starting', desc: 'Batteries, alternators, starters, wiring repair, and full electrical diagnostics.' },
  { emoji: '🔍', title: 'Diagnostics & Inspection', desc: 'Check engine lights, computer scanning, pre-purchase inspections, and state inspections.' },
  { emoji: '🚙', title: 'Trucks & Off-Road', desc: 'Lift kits, leveling, custom wheels, off-road tires, and heavy-duty upgrades.' },
]

const reviews = [
  { name: 'James R.', stars: 5, text: 'Best tire shop in Bonham, hands down. Fair prices and they got me in and out in under an hour. Highly recommend!' },
  { name: 'Maria G.', stars: 5, text: 'Took my truck in for an alignment and new tires. The staff was super friendly and the work was done right. Will definitely be back.' },
  { name: 'David W.', stars: 5, text: 'Great prices on used tires. They had exactly what I needed and mounted them while I waited. Honest people.' },
  { name: 'Sarah T.', stars: 5, text: 'My A/C went out in the middle of July. They diagnosed it same day and had it blowing cold by the afternoon. Lifesavers!' },
  { name: 'Robert L.', stars: 4, text: 'Good selection of tires and fair pricing. They were upfront about everything and didn\'t try to upsell me. Solid shop.' },
  { name: 'Ashley M.', stars: 5, text: 'I\'ve been coming here for years. They always take care of my family\'s vehicles. Trustworthy and affordable.' },
]

const hours = [
  { day: 'Monday – Friday', time: '8:30 AM – 5:30 PM' },
  { day: 'Saturday', time: '8:30 AM – 5:00 PM' },
  { day: 'Sunday', time: 'Closed', closed: true },
]

const trustItems = ['4.8 ★ Google Rating', '68 Reviews', 'Foreign & Domestic', 'Bonham, TX']

const MAPS_URL = 'https://maps.google.com/?q=1603+N+Center+St+Bonham+TX+75418'

export default function Home() {
  const [activeReview, setActiveReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Bonham Discount Tire and Auto | Bonham, TX</title>
        <meta
          name="description"
          content="Bonham's trusted tire and auto shop. New & used tires, oil changes, brakes, alignments, A/C service and custom wheels. Foreign & domestic. Call (903) 583-0083."
        />
      </Head>

      {/* ── STICKY NAV ──────────────────────────────────── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 md:px-6 md:py-3" style={{ backgroundColor: '#1a3a6b' }}>
        <div className="flex items-center gap-2 md:gap-3">
          <Image src="/images/logo.png" height={40} width={92} alt="Bonham Discount Tire and Auto" className="md:hidden" />
          <Image src="/images/logo.png" height={52} width={120} alt="Bonham Discount Tire and Auto" className="hidden md:block" />
          <span className="hidden text-lg font-bold tracking-wide text-white md:inline md:text-xl">Bonham Discount Tire and Auto</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="tel:9035830083"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-black md:gap-2 md:px-6 md:py-2.5 md:text-base"
            style={{ backgroundColor: '#f5c518' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 md:h-5 md:w-5">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Call Now - (903) 583-0083</span>
            <span className="md:hidden">Call Now</span>
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border-2 border-white px-4 py-2 text-xs font-bold text-white md:gap-2 md:px-6 md:py-2.5 md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 md:h-5 md:w-5">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Get Directions</span>
          </a>
        </div>
      </nav>

      {/* ── HERO WITH SERVICES OVERLAY ──────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-3 py-12 sm:px-4 md:py-28"
        style={{
          backgroundImage: "url('/images/full-building.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        {/* Headline */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow sm:text-4xl md:text-6xl">
            Bonham&#39;s Trusted Tire &amp; Auto Shop
          </h1>
          <p className="mt-2 text-base sm:mt-3 sm:text-xl" style={{ color: '#f5c518' }}>
            Your One-Stop Shop · Foreign &amp; Domestic · Bonham, TX
          </p>
        </div>

        {/* Services overlay grid */}
        <div className="relative z-10 mx-auto mt-8 grid max-w-6xl grid-cols-3 gap-2 sm:mt-14 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-lg bg-white/10 px-2 py-3 text-center backdrop-blur-sm transition-colors hover:bg-white/20 sm:rounded-xl sm:px-3 sm:py-4"
            >
              <div className="mb-1 text-2xl sm:mb-2 sm:text-3xl">{s.emoji}</div>
              <h3 className="text-xs font-bold text-white sm:text-sm">{s.title}</h3>
              <p className="mt-1 hidden text-xs leading-snug text-gray-300 sm:block">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────── */}
      <section className="flex flex-wrap justify-center gap-3 px-2 py-3 sm:gap-6 sm:py-4" style={{ backgroundColor: '#1a3a6b' }}>
        {trustItems.map((item, i) => (
          <span key={i} className="text-xs font-semibold sm:text-sm" style={{ color: '#f5c518' }}>
            {i > 0 && <span className="mr-3 hidden sm:mr-6 sm:inline" style={{ color: '#f5c518' }}>|</span>}
            {item}
          </span>
        ))}
      </section>

      {/* ── PHOTO STRIP ─────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row">
        <img src="/images/bronco-tires.png" alt="Bronco with new tires" className="h-48 w-full object-cover sm:h-64 sm:w-1/3" />
        <img src="/images/vintage-ford.png" alt="Vintage Ford" className="h-48 w-full object-cover sm:h-64 sm:w-1/3" />
        <img src="/images/summer-bays.png" alt="Summer service bays" className="h-48 w-full object-cover sm:h-64 sm:w-1/3" />
      </section>

      {/* ── CUSTOMER REVIEWS ────────────────────────────── */}
      <section className="px-4 py-10 sm:py-16" style={{ backgroundColor: '#f9fafb' }}>
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl" style={{ color: '#1a3a6b' }}>
          What Our Customers Say
        </h2>
        <p className="mx-auto mb-8 text-center text-sm text-gray-500 sm:mb-10">
          4.8 ★ on Google · 68 Reviews
        </p>

        {/* Review card */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white px-5 py-6 shadow-lg sm:px-8 sm:py-8">
            <div className="mb-2 text-xl sm:mb-3 sm:text-2xl" style={{ color: '#f5c518' }}>
              {'★'.repeat(reviews[activeReview].stars)}
              {'☆'.repeat(5 - reviews[activeReview].stars)}
            </div>
            <p className="mb-3 text-base leading-relaxed text-gray-700 sm:mb-4 sm:text-lg">
              &#34;{reviews[activeReview].text}&#34;
            </p>
            <p className="text-sm font-bold text-gray-900 sm:text-base">— {reviews[activeReview].name}</p>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReview(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === activeReview ? 'scale-110' : 'bg-gray-300'
                }`}
                style={i === activeReview ? { backgroundColor: '#1a3a6b' } : undefined}
                aria-label={`Show review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCING ───────────────────────────────────── */}
      <section className="px-4 py-12 text-center sm:py-20" style={{ backgroundColor: '#111827' }}>
        <h2 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-4xl">No Credit Needed</h2>
        <p className="mx-auto mb-6 max-w-2xl text-base text-gray-300 sm:mb-8 sm:text-lg">
          We work with Acima and Snap Finance — get approved today regardless of credit history.
        </p>
        <a
          href="tel:9035830083"
          className="inline-block rounded-full px-8 py-3 text-base font-bold text-black sm:px-10 sm:py-4 sm:text-lg"
          style={{ backgroundColor: '#f5c518' }}
        >
          Call to Apply
        </a>
      </section>

      {/* ── HOURS & LOCATION ────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-10 sm:py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left — Hours & Contact */}
          <div>
            <h2 className="mb-6 text-2xl font-bold" style={{ color: '#1a3a6b' }}>Hours &amp; Contact</h2>
            <table className="w-full text-sm">
              <tbody>
                {hours.map((h) => (
                  <tr key={h.day} className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">{h.day}</td>
                    <td className={`py-3 text-right ${h.closed ? 'text-red-500' : 'text-gray-700'}`}>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 space-y-3 text-sm">
              <p>📍 1603 N Center St, Bonham, TX 75418</p>
              <p>
                📞{' '}
                <a href="tel:9035830083" className="font-semibold" style={{ color: '#1a3a6b' }}>
                  (903) 583-0083
                </a>
              </p>
              <p>
                ✉️{' '}
                <a href="mailto:bonhamdiscount@gmail.com" style={{ color: '#1a3a6b' }}>
                  bonhamdiscount@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Right — Map */}
          <div>
            <h2 className="mb-6 text-2xl font-bold" style={{ color: '#1a3a6b' }}>Find Us</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.1!2d-96.1773!3d33.5943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c8e1b2b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2s1603+N+Center+St%2C+Bonham%2C+TX+75418!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bonham Discount Tire and Auto location"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#1a3a6b' }} className="text-white">
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-gray-400">© 2025 Bonham Discount Tire and Auto. All rights reserved.</p>
          <div className="mt-5 flex justify-center">
            <a href="https://daqworks.app" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.85, transform: 'scale(1.8)', transformOrigin: 'center' }}>
              <DaqWorksLogo variant="powered-by" theme="dark" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import DaqWorksLogo from '../components/DaqWorksLogo'

const services = [
  { emoji: '🔧', title: 'New & Used Tires', desc: 'Budget-friendly to premium brands. New and used options always in stock.' },
  { emoji: '⚙️', title: 'Wheel Alignment', desc: 'Precision alignment to extend tire life and improve handling.' },
  { emoji: '🛢️', title: 'Oil Change', desc: 'Starting at $24.99. Synthetic blend, full synthetic, and diesel options.' },
  { emoji: '🛑', title: 'Brakes', desc: 'Full brake inspection, pad replacement, and rotor service.' },
  { emoji: '❄️', title: 'A/C Service', desc: 'Diagnosis and repair to keep you cool all summer long.' },
  { emoji: '🚗', title: 'Custom Wheels', desc: 'Custom wheel packages and lifted truck builds.' },
  { emoji: '🔋', title: 'Batteries', desc: 'Testing, replacement, and installation for all makes and models.' },
  { emoji: '💨', title: 'Exhaust & Muffler', desc: 'Full exhaust system repair, muffler replacement, and catalytic converters.' },
  { emoji: '🔩', title: 'Suspension & Steering', desc: 'Shocks, struts, ball joints, and tie rods to restore your ride.' },
  { emoji: '🛞', title: 'Tire Repair & Rotation', desc: 'Flat fixes, plugs, patches, and scheduled rotations to maximize tire life.' },
  { emoji: '🚙', title: 'Lift Kits & Leveling', desc: 'Truck and Jeep lift kits installed by experienced technicians.' },
  { emoji: '🔍', title: 'Diagnostics', desc: 'Check engine lights, electrical issues, and full vehicle inspections.' },
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
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-6" style={{ backgroundColor: '#1a3a6b' }}>
        <Image src="/images/logo.png" height={52} width={120} alt="Bonham Discount Tire and Auto" />
        <div className="flex items-center gap-3">
          <a href="tel:9035830083" className="hidden text-lg font-bold md:inline" style={{ color: '#f5c518' }}>
            (903) 583-0083
          </a>
          <a
            href="tel:9035830083"
            className="rounded-full px-5 py-2 text-sm font-bold text-black md:px-6 md:text-base"
            style={{ backgroundColor: '#f5c518' }}
          >
            Call Now
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border-2 border-white px-5 py-2 text-sm font-bold text-white sm:inline-block md:px-6 md:text-base"
          >
            Get Directions
          </a>
        </div>
      </nav>

      {/* ── HERO WITH SERVICES OVERLAY ──────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-4 py-20 md:py-28"
        style={{
          backgroundImage: "url('/images/full-building.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        {/* Headline */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow md:text-6xl">
            Bonham&#39;s Trusted Tire &amp; Auto Shop
          </h1>
          <p className="mt-3 text-xl" style={{ color: '#f5c518' }}>
            Your One-Stop Shop · Foreign &amp; Domestic · Bonham, TX
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="tel:9035830083"
              className="rounded-full px-8 py-4 text-lg font-bold text-black"
              style={{ backgroundColor: '#f5c518' }}
            >
              Call Now
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-4 text-lg text-white"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Services overlay grid */}
        <div className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl bg-white/10 px-3 py-4 text-center backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <div className="mb-2 text-3xl">{s.emoji}</div>
              <h3 className="text-sm font-bold text-white">{s.title}</h3>
              <p className="mt-1 text-xs leading-snug text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────── */}
      <section className="flex flex-wrap justify-center gap-6 py-4" style={{ backgroundColor: '#1a3a6b' }}>
        {trustItems.map((item, i) => (
          <span key={i} className="text-sm font-semibold" style={{ color: '#f5c518' }}>
            {i > 0 && <span className="mr-6 hidden sm:inline" style={{ color: '#f5c518' }}>|</span>}
            {item}
          </span>
        ))}
      </section>

      {/* ── SERVICES GRID (detailed) ────────────────────── */}
      <section className="bg-white px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold" style={{ color: '#1a3a6b' }}>
          Everything Your Vehicle Needs
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          From tires and brakes to A/C and lift kits — we handle it all under one roof so you don&#39;t have to drive all over town.
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="mb-3 text-4xl">{s.emoji}</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO STRIP ─────────────────────────────────── */}
      <section className="flex">
        <img src="/images/bronco-tires.png" alt="Bronco with new tires" className="h-64 w-1/3 object-cover" />
        <img src="/images/vintage-ford.png" alt="Vintage Ford" className="h-64 w-1/3 object-cover" />
        <img src="/images/summer-bays.png" alt="Summer service bays" className="h-64 w-1/3 object-cover" />
      </section>

      {/* ── CUSTOMER REVIEWS ────────────────────────────── */}
      <section className="px-4 py-16" style={{ backgroundColor: '#f9fafb' }}>
        <h2 className="mb-2 text-center text-3xl font-bold" style={{ color: '#1a3a6b' }}>
          What Our Customers Say
        </h2>
        <p className="mx-auto mb-10 text-center text-sm text-gray-500">
          4.8 ★ on Google · 68 Reviews
        </p>

        {/* Review card */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white px-8 py-8 shadow-lg">
            <div className="mb-3 text-2xl" style={{ color: '#f5c518' }}>
              {'★'.repeat(reviews[activeReview].stars)}
              {'☆'.repeat(5 - reviews[activeReview].stars)}
            </div>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              &#34;{reviews[activeReview].text}&#34;
            </p>
            <p className="font-bold text-gray-900">— {reviews[activeReview].name}</p>
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
      <section className="px-4 py-20 text-center" style={{ backgroundColor: '#111827' }}>
        <h2 className="mb-4 text-4xl font-bold text-white">No Credit Needed</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
          We work with Acima and Snap Finance — get approved today regardless of credit history.
        </p>
        <a
          href="tel:9035830083"
          className="inline-block rounded-full px-10 py-4 text-lg font-bold text-black"
          style={{ backgroundColor: '#f5c518' }}
        >
          Call to Apply
        </a>
      </section>

      {/* ── HOURS & LOCATION ────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-16">
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
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-4 py-12 md:flex-row md:justify-between">
          {/* Left */}
          <div>
            <Image src="/images/logo.png" height={64} width={150} alt="Bonham Discount Tire and Auto" />
            <p className="mt-3 max-w-xs text-sm text-gray-300">
              Bonham&#39;s trusted tire and auto shop. Foreign &amp; domestic. Serving Bonham, TX and surrounding areas.
            </p>
          </div>

          {/* Right — two columns */}
          <div className="flex gap-8">
            <div>
              <h3 className="mb-3 font-bold">Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>New &amp; Used Tires</li>
                <li>Wheel Alignment</li>
                <li>Oil Change</li>
                <li>Brakes</li>
                <li>A/C Service</li>
                <li>Custom Wheels</li>
                <li>Batteries</li>
                <li>Exhaust &amp; Muffler</li>
                <li>Suspension</li>
                <li>Lift Kits</li>
                <li>Diagnostics</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>1603 N Center St</li>
                <li>Bonham, TX 75418</li>
                <li>(903) 583-0083</li>
                <li>bonhamdiscount@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-800 px-4 py-6 text-center">
          <p className="text-sm text-gray-400">© 2025 Bonham Discount Tire and Auto. All rights reserved.</p>
          <div className="mt-4 flex justify-center">
            <a href="https://daqworks.app" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8 }}>
              <DaqWorksLogo variant="powered-by" theme="dark" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

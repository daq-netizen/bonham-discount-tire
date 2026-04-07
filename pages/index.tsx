import Head from 'next/head'
import Image from 'next/image'
import DaqWorksLogo from '../components/DaqWorksLogo'

const services = [
  { emoji: '🔧', title: 'New & Used Tires', desc: 'Budget-friendly to premium brands. New and used options in stock.' },
  { emoji: '⚙️', title: 'Wheel Alignment', desc: 'Precision alignment to extend tire life and improve handling.' },
  { emoji: '🛢️', title: 'Oil Change', desc: 'Starting at $24.99. Synthetic blend, full synthetic, and diesel options.' },
  { emoji: '🛑', title: 'Brakes', desc: 'Full brake inspection, pad replacement, and rotor service.' },
  { emoji: '❄️', title: 'A/C Service', desc: 'Diagnosis and repair to keep you cool all summer long.' },
  { emoji: '🚗', title: 'Custom Wheels', desc: 'Custom wheel packages and lifted truck builds.' },
]

const hours = [
  { day: 'Monday – Friday', time: '8:30 AM – 5:30 PM' },
  { day: 'Saturday', time: '8:30 AM – 5:00 PM' },
  { day: 'Sunday', time: 'Closed', closed: true },
]

const trustItems = ['4.8 ★ Google Rating', '68 Reviews', 'Foreign & Domestic', 'Bonham, TX']

const MAPS_URL = 'https://maps.google.com/?q=1603+N+Center+St+Bonham+TX+75418'

export default function Home() {
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
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3" style={{ backgroundColor: '#1a3a6b' }}>
        <Image src="/images/logo.png" height={52} width={120} alt="Bonham Discount Tire and Auto" />
        <a href="tel:9035830083" className="text-lg font-bold" style={{ color: '#f5c518' }}>
          (903) 583-0083
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/images/full-building.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow md:text-6xl">
            Bonham&#39;s Trusted Tire &amp; Auto Shop
          </h1>
          <p className="mt-4 text-xl" style={{ color: '#f5c518' }}>
            Foreign &amp; Domestic · Bonham, TX
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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

      {/* ── SERVICES GRID ───────────────────────────────── */}
      <section className="bg-white px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold" style={{ color: '#1a3a6b' }}>
          Everything Your Vehicle Needs
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3">
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

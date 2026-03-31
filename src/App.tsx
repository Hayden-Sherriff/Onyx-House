import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  Waves, Mountain, Sun, Wifi, Car, Flame, UtensilsCrossed,
  Wind, Baby, ShieldCheck, ChevronDown, ChevronUp, Menu, X,
  Star, MapPin, Users, BedDouble, Bath, Eye, TreePine, Grape,
  ExternalLink, ArrowRight
} from 'lucide-react'

const AIRBNB_URL = 'https://www.airbnb.co.nz/rooms/959606233353863939'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Bedrooms', href: '#bedrooms' },
  { label: 'Location', href: '#location' },
  { label: 'FAQ', href: '#faq' },
]

const GALLERY_IMAGES = [
  { src: '/images/hero.jpg', alt: 'Onyx House floor-to-ceiling windows with ocean views', span: 'col-span-2 row-span-2' },
  { src: '/images/dining.jpg', alt: 'Open-plan dining area with panoramic views', span: '' },
  { src: '/images/living.jpg', alt: 'Modern living space with dark timber accents', span: '' },
  { src: '/images/bedroom1.jpg', alt: 'Master bedroom with king bed', span: 'col-span-2' },
  { src: '/images/bathroom.jpg', alt: 'Designer bathroom with marble finishes', span: '' },
  { src: '/images/fireplace.jpg', alt: 'Outdoor wood burner fireplace', span: '' },
  { src: '/images/view.jpg', alt: 'Breathtaking Wainui Beach sunset views', span: 'col-span-2' },
  { src: '/images/bathtub.jpg', alt: 'Luxury imported bathtub', span: '' },
  { src: '/images/beach.jpg', alt: 'Wainui Beach from the property', span: '' },
  { src: '/images/kitchen.jpg', alt: 'Gourmet kitchen with dual ovens', span: '' },
  { src: '/images/terrace.jpg', alt: 'Outdoor terrace and entertaining area', span: '' },
  { src: '/images/aerial.jpg', alt: 'Aerial view of Onyx House and surroundings', span: 'col-span-2' },
]

const AMENITIES = [
  { icon: <Waves className="w-6 h-6" />, category: 'Scenic Views', items: ['Bay View', 'Beach View', 'Mountain View', 'Sea View', 'Valley View'] },
  { icon: <UtensilsCrossed className="w-6 h-6" />, category: 'Gourmet Kitchen', items: ['Dual Ovens & Cooktops', 'Butlers Pantry & Bar', 'Refrigerator', 'Giant Counter Space'] },
  { icon: <Flame className="w-6 h-6" />, category: 'Outdoor Living', items: ['Fire Pit', 'Wood Burner Fireplace', 'BBQ Grill & Swing Grill', 'Outdoor Dining Area'] },
  { icon: <Wifi className="w-6 h-6" />, category: 'Connectivity', items: ['High-Speed WiFi', 'Smart TV'] },
  { icon: <Wind className="w-6 h-6" />, category: 'Comfort', items: ['Air Conditioning', 'Washing Machine', 'Outdoor Shower'] },
  { icon: <Car className="w-6 h-6" />, category: 'Parking & Access', items: ['Free Parking on Premises', 'Beach Access'] },
  { icon: <Baby className="w-6 h-6" />, category: 'Family', items: ['Highchair Available'] },
  { icon: <ShieldCheck className="w-6 h-6" />, category: 'Safety', items: ['Smoke Alarm', 'Security Cameras (Exterior)', 'Carbon Monoxide Alarm'] },
]

const BEDROOMS = [
  {
    name: 'Master Suite',
    image: '/images/bedroom1.jpg',
    bed: 'King Bed',
    features: ['Walk-in wardrobe', 'Double shower', 'Private bathtub'],
  },
  {
    name: 'Guest Suite 1',
    image: '/images/bedroom2.jpg',
    bed: 'Queen Bed',
    features: ['Private ensuite', 'Ocean views'],
  },
  {
    name: 'Guest Suite 2',
    image: '/images/bedroom3.jpg',
    bed: 'Queen Bed',
    features: ['Shared bathroom', 'XXL bathtub'],
  },
  {
    name: 'Bunk Room',
    image: '/images/bunkroom.jpg',
    bed: '2 Queens, 2 King Singles, 1 Pullout',
    features: ['Sleeps up to 7', 'Perfect for families'],
  },
]

const NEARBY = [
  {
    icon: <Waves className="w-8 h-8" />,
    name: 'Wainui Beach',
    distance: 'Short stroll',
    description: 'A pristine stretch of East Coast paradise just steps from the property. Golden sands stretch for kilometres, with safe swimming areas patrolled by lifeguards in summer and world-famous surf breaks that attract riders from across the globe. Cycle the sealed 6km beach track into town, or simply stroll along the shore as the first rays of sunrise paint the Pacific.',
    image: '/images/loc-wainui.jpg',
  },
  {
    icon: <Sun className="w-8 h-8" />,
    name: 'Okitu Pines Surf Break',
    distance: 'At your doorstep',
    description: 'One of Gisborne\'s most consistent and revered surf breaks, right at your doorstep. The Pines offers powerful beach breaks over sand-bottom that range from waist-high peelers to double-overhead barrels depending on the swell. The car park doubles as a prime spectator spot — grab a coffee from the Okitu Store and watch the action.',
    image: '/images/loc-surf.jpg',
  },
  {
    icon: <TreePine className="w-8 h-8" />,
    name: 'Stockroute & Makarori',
    distance: '5 min drive',
    description: 'A stunning coastal walk over Makorori Headland connects Wainui and Makorori beaches, offering sweeping panoramic views of the Pacific Ocean, Māhia Peninsula, and Te Kurī-a-Pāoa (Young Nick\'s Head). The 30-minute return walk passes through native bush and over historic Māori land — perfect for a sunset stroll or morning birdwatching.',
    image: '/images/loc-coastal.jpg',
  },
  {
    icon: <Grape className="w-8 h-8" />,
    name: 'Gisborne Wineries',
    distance: 'Short drive',
    description: 'Known as the Chardonnay Capital of New Zealand, Gisborne\'s sun-drenched vineyards produce exceptional wines. Visit cellar doors like Matawhero (crafting wines since 1975), Bushmere Estate, and Bridge Estate. Don\'t miss the annual Chardonnay Affair festival. With fertile alluvial soils and a warm maritime climate, the region also excels in Pinot Gris and Gewürztraminer.',
    image: '/images/loc-winery.jpg',
  },
  {
    icon: <Mountain className="w-8 h-8" />,
    name: 'Rere Falls & Rockslide',
    distance: '45 min drive',
    description: 'A must-do day trip along the scenic Wharekopae River valley. Rere Falls is a picturesque wide-curtain waterfall with a natural swimming hole at its base — ideal for a picnic. Just around the bend, the famous Rere Rockslide is a 60-metre natural waterslide of smooth rock — grab a boogie board and ride the rushing water into the pool below. Free entry, open year-round.',
    image: '/images/loc-falls.jpg',
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    name: 'Gisborne City',
    distance: '10 min drive',
    description: 'The first city in the world to see the sunrise. Gisborne (Tairāwhiti) is steeped in Māori heritage — it\'s where the Horouta and Te Ikaroa-a-Rauru waka first landed. Explore the Tairāwhiti Museum, dine at the vibrant Inner Harbour, browse the Saturday farmers\' market, or climb Kaiti Hill for panoramic views. A relaxed, authentic New Zealand town with incredible food and culture.',
    image: '/images/loc-gisborne.jpg',
  },
]

const FAQS = [
  {
    q: 'What is the minimum stay?',
    a: 'The minimum stay is typically 2 nights. During peak season and holidays, a longer minimum may apply. Please check availability on our booking page for specific dates.',
  },
  {
    q: 'How many guests can the property accommodate?',
    a: 'Onyx House comfortably accommodates up to 14 guests across 4 bedrooms with 8 beds and 3.5 bathrooms.',
  },
  {
    q: 'Is the property suitable for children?',
    a: 'Yes! The property is family-friendly with a highchair available. The bunk room is perfect for kids, and the beach is just a short stroll away. Please supervise children at all times near the terrace and outdoor areas.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, free parking is available on the premises with ample space for multiple vehicles.',
  },
  {
    q: 'What time is check-in and check-out?',
    a: 'Standard check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in or late check-out may be arranged subject to availability.',
  },
  {
    q: 'Are pets allowed?',
    a: 'Please enquire directly through our booking page regarding pet policies, as this may vary by season.',
  },
  {
    q: 'Is there WiFi available?',
    a: 'Yes, high-speed WiFi is available throughout the property for all guests.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Our cancellation policy is managed through Airbnb. Please refer to the listing for the most up-to-date cancellation terms.',
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className={`font-serif text-2xl tracking-widest font-semibold transition-colors duration-500 ${
            isScrolled ? 'text-stone-900' : 'text-white'
          }`}>
            ONYX HOUSE
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 hover:opacity-70 ${
                  isScrolled ? 'text-stone-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 text-sm tracking-wider uppercase border transition-all duration-300 hover:bg-stone-900 hover:text-white ${
                isScrolled ? 'border-stone-900 text-stone-900' : 'border-white text-white'
              }`}
            >
              Book Now
            </a>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden transition-colors ${isScrolled ? 'text-stone-900' : 'text-white'}`}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-stone-200">
          <div className="px-6 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block text-sm tracking-wider uppercase text-stone-700 hover:text-stone-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-5 py-3 text-sm tracking-wider uppercase border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Onyx House - Luxury coastal retreat overlooking Wainui Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-light">
          Wainui Beach &middot; Gisborne &middot; New Zealand
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-8">
          ONYX HOUSE
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          A luxurious coastal retreat where nature&apos;s beauty and modern luxury seamlessly converge
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-stone-900 text-sm tracking-widest uppercase hover:bg-stone-100 transition-colors"
          >
            Reserve Your Stay
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-white/60 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            Discover More
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  )
}

function About() {
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Welcome to</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light mb-8 leading-tight">
              Your Dream<br />Coastal Escape
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Nestled atop a lush hillside overlooking the pristine shores of Wainui Beach,
                Onyx House is a brand new, high-end luxury home offering a once-in-a-lifetime
                vacation experience that will leave you utterly rejuvenated.
              </p>
              <p>
                This architectural masterpiece boasts an open-concept design that blends the
                elegance of contemporary aesthetics with the warmth of natural elements. The
                spacious living area features floor-to-ceiling windows that frame the captivating
                panorama of Wainui Beach, the endless horizon of the Pacific Ocean, and the
                verdant coastal landscape.
              </p>
              <p>
                Bask in the golden sunlight as it spills into the living space, creating an
                ambiance of serenity and tranquility. Spend your evenings relaxing on the
                designer lounge suite sipping a Gisborne Chardonnay as the sun dips below
                the horizon, painting the sky with hues of pink and gold.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/exterior.jpg"
              alt="Onyx House exterior architecture"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-stone-900 text-white p-6 md:p-8">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-serif font-semibold">5.0</span>
              </div>
              <p className="text-sm text-white/70">25 Reviews</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-stone-200">
          {[
            { icon: <Users className="w-6 h-6" />, value: '14', label: 'Guests' },
            { icon: <BedDouble className="w-6 h-6" />, value: '4', label: 'Bedrooms' },
            { icon: <Bath className="w-6 h-6" />, value: '3.5', label: 'Bathrooms' },
            { icon: <Eye className="w-6 h-6" />, value: '5', label: 'Star Views' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-stone-600 mb-3">
                {stat.icon}
              </div>
              <p className="font-serif text-3xl text-stone-900 mb-1">{stat.value}</p>
              <p className="text-sm text-stone-500 tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const { ref, isInView } = useInView()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-24 md:py-32 bg-stone-50">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Gallery</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light">
            A Visual Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => setSelectedImage(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: '200px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={GALLERY_IMAGES[selectedImage].src}
            alt={GALLERY_IMAGES[selectedImage].alt}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}

function Amenities() {
  const { ref, isInView } = useInView()

  return (
    <section id="amenities" className="py-24 md:py-32 bg-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Amenities</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light mb-6">
            Every Detail Considered
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            No detail has been spared in creating an unparalleled oasis of comfort and convenience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.category}
              className="group p-6 border border-stone-200 hover:border-stone-400 transition-colors duration-300"
            >
              <div className="text-stone-400 group-hover:text-stone-700 transition-colors mb-4">
                {amenity.icon}
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-3">{amenity.category}</h3>
              <ul className="space-y-1.5">
                {amenity.items.map((item) => (
                  <li key={item} className="text-sm text-stone-500">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Bedrooms() {
  const { ref, isInView } = useInView()

  return (
    <section id="bedrooms" className="py-24 md:py-32 bg-stone-900 text-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Rest & Retreat</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Elegantly Appointed Bedrooms
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Wake up to the soothing sounds of native birds and the invigorating sea breeze
            wafting through your windows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {BEDROOMS.map((room) => (
            <div key={room.name} className="group relative overflow-hidden">
              <img
                src={room.image}
                alt={room.name}
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl mb-1">{room.name}</h3>
                <p className="text-white/70 text-sm mb-3">{room.bed}</p>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-stone-400 leading-relaxed max-w-3xl mx-auto">
            The 3.5 bathrooms are meticulously designed for relaxation and pampering &mdash;
            crafted to the highest standard with designer tapware, marble tiles, custom vanities,
            and the biggest imported bathtub available.
          </p>
        </div>
      </div>
    </section>
  )
}

function Location() {
  const { ref, isInView } = useInView()

  return (
    <section id="location" className="py-24 md:py-32 bg-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Location</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light mb-6">
            Explore the Surroundings
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Perched above Wainui Beach on New Zealand&apos;s stunning East Coast, Onyx House
            is your gateway to world-class surf, award-winning wineries, coastal trails,
            and the first sunrise in the world.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEARBY.map((place) => (
            <div
              key={place.name}
              className="group relative overflow-hidden bg-stone-50 transition-all duration-500 cursor-pointer"
            >
              {/* Hover image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90">
                    {place.icon}
                    <span className="text-xs tracking-widest uppercase font-medium">{place.distance}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-3">{place.name}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{place.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-stone-100 p-8 md:p-12 text-center">
          <p className="font-serif text-2xl text-stone-900 mb-4">
            First City to See the Sun
          </p>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Gisborne holds the unique distinction of being one of the first cities in the world
            to see the sunrise each day. From the sacred peak of Maunga Hikurangi to the golden
            shores of Wainui Beach, this is a region where Māori heritage, world-class wine,
            and raw natural beauty come together in a truly extraordinary way.
          </p>
        </div>
      </div>
    </section>
  )
}

function BookingCTA() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="absolute inset-0">
        <img
          src="/images/sunset.jpg"
          alt="Sunset views from Onyx House"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-6">Book Your Getaway</p>
        <h2 className="font-serif text-4xl md:text-6xl font-light mb-8 leading-tight">
          Your Idyllic Paradise<br />Awaits
        </h2>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Whether you&apos;re seeking a romantic escape, a family gathering, or a rejuvenating
          solo retreat, Onyx House promises an unforgettable experience. Come and discover
          a world of unparalleled beauty and relaxation.
        </p>
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 bg-white text-stone-900 text-sm tracking-widest uppercase hover:bg-stone-100 transition-colors"
        >
          Reserve on Airbnb
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="text-white/50 text-xs mt-6 tracking-wide">
          Due to high demand, early booking is recommended to secure your dates.
        </p>
      </div>
    </section>
  )
}

function FAQ() {
  const { ref, isInView } = useInView()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 md:py-32 bg-stone-50">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">FAQ</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light">
            Common Questions
          </h2>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-stone-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors pr-4">
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                )}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
              }`}>
                <p className="text-stone-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl tracking-wider mb-4">ONYX HOUSE</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              A luxurious coastal retreat perched above Wainui Beach, Gisborne, New Zealand.
            </p>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase text-stone-400 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-stone-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase text-stone-400 mb-4">Book Your Stay</h4>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              Onyx House is exclusively available through Airbnb. Click below to check availability and make a reservation.
            </p>
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-stone-300 transition-colors"
            >
              View on Airbnb <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Onyx House. All rights reserved.
          </p>
          <p className="text-xs text-stone-500">
            Wainui Beach, Gisborne, New Zealand
          </p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Amenities />
      <Bedrooms />
      <Location />
      <BookingCTA />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App

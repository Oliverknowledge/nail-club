"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BookingSection } from "@/components/BookingSection";

const ease = [0.22, 1, 0.36, 1] as const;
const categories = ["All", "BIAB", "Acrylics", "Nail Art", "Natural"] as const;

type GalleryCategory = (typeof categories)[number];

type GalleryItem = {
  id: string;
  name: string;
  category: Exclude<GalleryCategory, "All">;
  tag: string;
  image: string;
  focus: string;
};

type ServiceOption = {
  name: string;
  price: number;
  from?: boolean;
  removal?: boolean;
};

type ServiceCard = {
  id: string;
  title: string;
  benefit: string;
  highlights: string[];
  image: string;
  focus: string;
  options: ServiceOption[];
  featured?: boolean;
};

const trustStats = [
  { value: "4.5★", label: "Star Rated" },
  { value: "50+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
];

const proofPoints = [
  "Rated 4.5 stars by 50+ clients",
  "Based in Epping, Essex",
  "Walk-ins welcome · appointments preferred",
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/essexnailclub/",
    icon: (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@essexnailclub",
    icon: (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M14.2 5c1 1.4 2.4 2.3 4 2.5v2.1a8.15 8.15 0 0 1-4-1.2v5.3a5.35 5.35 0 1 1-5.4-5.3c.3 0 .6 0 .9.1v2.2a2.95 2.95 0 1 0 2.1 2.8V5h2.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Fresha",
    href: "https://www.fresha.com/lvp/essex-nail-club-high-street-VEnY92",
    icon: (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 8h7M9 12h5M9 8v8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    initials: "SE",
    name: "Sophie E.",
    quote:
      "My BIAB nails lasted four weeks without a single chip. The attention to detail is unreal.",
  },
  {
    initials: "LC",
    name: "Lauren C.",
    quote:
      "Booked for acrylic extensions and I'm absolutely obsessed. Relaxed vibe, flawless finish, zero rushing.",
  },
  {
    initials: "MR",
    name: "Mia R.",
    quote:
      "Finally found a nail artist who listens. The final design came out even better than my reference photos.",
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: "bridal",
    name: "Bridal Blush",
    category: "Nail Art",
    tag: "Featured Look",
    image: "/images/placeholders/gallery-1.jpg",
    focus: "50% 52%",
  },
  {
    id: "biab-gloss",
    name: "Clean Gloss BIAB",
    category: "BIAB",
    tag: "BIAB",
    image: "/images/placeholders/gallery-2.jpg",
    focus: "52% 30%",
  },
  {
    id: "almond",
    name: "Soft Almond Acrylics",
    category: "Acrylics",
    tag: "Acrylics",
    image: "/images/placeholders/gallery-3.jpg",
    focus: "65% 42%",
  },
  {
    id: "chrome",
    name: "Rose Chrome Art",
    category: "Nail Art",
    tag: "Nail Art",
    image: "/images/placeholders/gallery-4.jpg",
    focus: "52% 44%",
  },
  {
    id: "natural",
    name: "Natural Nude Finish",
    category: "Natural",
    tag: "Natural",
    image: "/images/placeholders/gallery-5.jpg",
    focus: "52% 48%",
  },
  {
    id: "milky",
    name: "Milky Short Set",
    category: "BIAB",
    tag: "BIAB",
    image: "/images/placeholders/gallery-6.jpg",
    focus: "42% 48%",
  },
];

const primaryServiceCards: ServiceCard[] = [
  {
    id: "natural-biab",
    title: "Natural BIAB",
    benefit: "Strong, glossy nails that hold up beautifully.",
    highlights: [
      "Lasts 3-4 weeks",
      "Strengthens natural nails",
      "Low-maintenance regrowth",
      "Gel colour included",
    ],
    image: "/images/placeholders/gallery-2.jpg",
    focus: "52% 28%",
    featured: true,
    options: [
      { name: "BIAB Overlay", price: 35, from: true },
      { name: "BIAB Infill", price: 30, from: true },
      { name: "BIAB Removal", price: 10, removal: true },
      { name: "Dip Powder Overlay", price: 42, from: true },
      { name: "Dip Powder New Set", price: 47, from: true },
      { name: "Dip Powder Removal", price: 12, removal: true },
    ],
  },
  {
    id: "acrylic-extensions",
    title: "Acrylic Extensions",
    benefit: "Length and shape with long-lasting strength.",
    highlights: [
      "Lasts 3-4 weeks",
      "Custom shape and length",
      "Strong daily wear",
      "Gel colour included",
    ],
    image: "/images/placeholders/gallery-3.jpg",
    focus: "65% 42%",
    options: [
      { name: "Acrylic New Set", price: 50, from: true },
      { name: "Acrylic Infills", price: 40, from: true },
      { name: "Acrylic Overlay", price: 45, from: true },
      { name: "Acrylic Removal", price: 15, removal: true },
    ],
  },
  {
    id: "soft-gel-tips",
    title: "Soft Gel Tips",
    benefit: "Lightweight full-cover tips with a clean finish.",
    highlights: [
      "Lightweight full-cover feel",
      "Custom length and shape",
      "Natural looking finish",
      "Glossy colour included",
    ],
    image: "/images/placeholders/gallery-1.jpg",
    focus: "50% 56%",
    options: [
      { name: "Soft Gel Tips New Set", price: 55, from: true },
      { name: "Soft Gel Tips Extra Long Set", price: 65 },
      { name: "Soft Gel Tips Removal", price: 15, removal: true },
    ],
  },
  {
    id: "gel-polish-care",
    title: "Gel Polish & Care",
    benefit: "Quick refresh for hands or feet with lasting shine.",
    highlights: [
      "Perfect quick refresh",
      "Hands or feet options",
      "Long-lasting glossy finish",
      "Great for maintenance",
    ],
    image: "/images/placeholders/gallery-5.jpg",
    focus: "52% 48%",
    options: [
      { name: "Gel Polish Hands", price: 25 },
      { name: "Gel Polish Feet", price: 25 },
      { name: "Gel Manicure", price: 32 },
      { name: "Gel Pedicure", price: 36 },
      { name: "Gel Mani & Pedi", price: 60 },
      { name: "Gel Removal", price: 10, removal: true },
      { name: "Kids Gel Hands", price: 20 },
      { name: "Kids Gel Feet", price: 20 },
    ],
  },
];

const addOnOptions: ServiceOption[] = [
  { name: "Nail Art", price: 5, from: true },
  { name: "Nail Repair", price: 10 },
  { name: "Toe Extensions", price: 12, from: true },
];

function getFromAmount(options: ServiceOption[]) {
  const nonRemoval = options.filter((option) => !option.removal);
  return Math.min(...nonRemoval.map((option) => option.price));
}

function getFromPrice(options: ServiceOption[]) {
  return `£${getFromAmount(options)}`;
}

function getFromTagPrice(options: ServiceOption[]) {
  return `from £${getFromAmount(options)}`;
}

function formatOptionPrice(option: ServiceOption) {
  return `${option.from ? "from " : ""}£${option.price}`;
}

const reasons = [
  {
    title: "Premium Products Only",
    body: "We use trusted salon-grade systems for stronger retention, cleaner finishes, and healthier nails long term.",
  },
  {
    title: "Long-Lasting Results",
    body: "Our prep and application process is designed for wear time, so clients return for refills, not repairs.",
  },
  {
    title: "Relaxed, Friendly Appointments",
    body: "No rushed energy. You get time, care and craftsmanship in a calm, welcoming environment.",
  },
  {
    title: "Styles for Every Mood",
    body: "Minimal and clean or bold and artistic, we match your vibe while keeping quality consistent.",
  },
];

const primaryCta =
  "inline-flex items-center justify-center rounded-sm bg-deep px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-cream transition hover:-translate-y-0.5 hover:bg-mauve";
const ghostCta =
  "inline-flex items-center justify-center border-b border-border pb-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted transition hover:border-mauve hover:text-mauve";
const bookingUrl =
  "https://book.squareup.com/appointments/ndtofgbocxjbf9/location/LACCK0ZJFVNDM/services";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  label,
  title,
  intro,
  light = false,
  compactMobile = false,
  titleClassName = "",
  introClassName = "",
  wrapperClassName = "mb-14",
}: {
  label: string;
  title: string;
  intro?: string;
  light?: boolean;
  compactMobile?: boolean;
  titleClassName?: string;
  introClassName?: string;
  wrapperClassName?: string;
}) {
  const labelColor = light ? "text-rose" : "text-mauve";
  const titleColor = light ? "text-cream" : "text-deep";
  const introColor = light ? "text-cream/60" : "text-muted";

  return (
    <Reveal className={wrapperClassName}>
      <p className={`mb-3 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] ${labelColor}`}>
        <span className={`h-px w-8 ${light ? "bg-rose" : "bg-mauve"}`} />
        {label}
      </p>
      <h2
        className={`font-display text-[clamp(2rem,3.5vw,3.05rem)] leading-tight ${titleColor} ${titleClassName}`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 max-w-2xl text-[0.92rem] leading-8 ${introColor} ${
            compactMobile ? "hidden sm:block" : ""
          } ${introClassName}`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("All");
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showAddOnOptions, setShowAddOnOptions] = useState(false);
  const [pauseServiceCarousel, setPauseServiceCarousel] = useState(false);
  const visibleGallery = useMemo(
    () => (activeTab === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeTab)),
    [activeTab],
  );
  const activeService = primaryServiceCards[activeServiceIndex];

  useEffect(() => {
    if (pauseServiceCarousel || expandedService) return;
    const intervalId = setInterval(() => {
      setActiveServiceIndex((current) => (current + 1) % primaryServiceCards.length);
    }, 6200);
    return () => clearInterval(intervalId);
  }, [pauseServiceCarousel, expandedService]);

  const goToService = (index: number) => {
    setActiveServiceIndex((index + primaryServiceCards.length) % primaryServiceCards.length);
    setExpandedService(null);
  };

  const goToNextService = () => {
    goToService(activeServiceIndex + 1);
  };

  const goToPreviousService = () => {
    goToService(activeServiceIndex - 1);
  };

  const year = new Date().getFullYear();

  return (
    <div className="bg-cream">
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-cream/90 backdrop-blur-md"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a
            href="#hero"
            className="font-display text-[1.25rem] uppercase tracking-[0.14em] text-deep transition hover:text-mauve"
          >
            Essex Nail Club
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            <a className="text-[0.72rem] uppercase tracking-[0.16em] text-muted transition hover:text-mauve" href="#gallery">
              Gallery
            </a>
            <a
              className="text-[0.72rem] uppercase tracking-[0.16em] text-muted transition hover:text-mauve"
              href="#services"
            >
              Services
            </a>
            <a className="text-[0.72rem] uppercase tracking-[0.16em] text-muted transition hover:text-mauve" href="#why">
              About
            </a>
            <a
              href={bookingUrl}
              className="rounded-sm bg-deep px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-cream transition hover:bg-mauve"
            >
              Book Now
            </a>
          </nav>

          <a
            href={bookingUrl}
            className="md:hidden rounded-sm bg-deep px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-cream"
          >
            Book
          </a>
        </div>
      </motion.header>

      <main className="pt-16 sm:pt-18">
        <section
          id="hero"
          className="grid min-h-[calc(100svh-10.25rem)] lg:min-h-[calc(100svh-8.25rem)] lg:grid-cols-2"
        >
          <div className="relative flex items-center bg-gradient-to-br from-cream to-blush px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-10 xl:px-20 xl:py-12">
            <div className="mx-auto w-full max-w-2xl">
              <Reveal>
                <p className="mb-6 flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.28em] text-mauve">
                  <span className="h-px w-10 bg-mauve" />
                  Essex Nail Club · Epping
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="font-display text-[clamp(2.35rem,5.2vw,4.35rem)] leading-[1.05] text-deep">
                  Nails that last.
                  <br />
                  <em className="italic text-mauve">Results that speak.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-[0.88rem] leading-7 text-muted sm:hidden">
                  Premium BIAB, acrylics and nail art in Epping, built to last.
                </p>
                <p className="mt-5 hidden max-w-md text-[0.92rem] leading-7 text-muted sm:block">
                  Premium BIAB, acrylic extensions and bespoke nail art in the heart of Epping. Built for retention,
                  comfort and compliments.
                </p>
              </Reveal>

              <Reveal className="mt-8 flex flex-wrap items-center gap-5" delay={0.16}>
                <a href={bookingUrl} className={primaryCta}>
                  Book Your Appointment
                </a>
                <a href={bookingUrl} className={ghostCta}>
                  See Available Slots
                </a>
              </Reveal>

              <Reveal className="mt-8 grid max-w-md grid-cols-3 gap-3 sm:gap-7" delay={0.22}>
                {trustStats.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-[1.75rem] leading-none text-deep sm:text-[1.9rem]">{item.value}</p>
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-muted">{item.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          <div className="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-9">
            <Image
              src="/images/placeholders/hero.jpg"
              alt="Elegant manicured nails in a salon setting"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#86635d]/65 via-[#8d6a64]/40 to-[#9a7b74]/55" />

            <motion.div
              className="absolute -left-12 -top-12 h-44 w-44 rounded-full border border-white/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-14 -right-14 h-52 w-52 rounded-full border border-white/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            <div className="mx-auto flex h-full w-full max-w-xl items-center lg:items-end">
              <Reveal className="w-full rounded-sm border border-white/28 bg-white/12 p-5 backdrop-blur-sm sm:p-6">
                <p className="text-[0.63rem] uppercase tracking-[0.2em] text-white/80">Signature detail</p>
                <h3 className="mt-2.5 font-display text-[1.75rem] leading-tight text-white sm:text-[1.95rem]">
                  Flawless finish. Zero compromise.
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-sm bg-white/12 p-3.5">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/70">Average wear</p>
                    <p className="mt-1.5 font-display text-[1.65rem] text-white sm:text-[1.85rem]">4-6 Weeks</p>
                  </div>
                  <div className="rounded-sm bg-white/12 p-3.5">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/70">Most booked</p>
                    <p className="mt-1.5 font-display text-[1.65rem] text-white sm:text-[1.85rem]">Natural BIAB</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-deep px-5 py-4.5 sm:px-8 sm:py-5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
            <span className="text-[0.95rem] tracking-[0.18em] text-gold">★★★★★</span>
            {proofPoints.map((point, index) => (
              <div key={point} className="flex items-center gap-5">
                <p className="text-[0.67rem] uppercase tracking-[0.18em] text-cream/70">{point}</p>
                {index < proofPoints.length - 1 ? <span className="hidden h-5 w-px bg-white/20 lg:inline-block" /> : null}
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="bg-blush px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader label="Client Love" title="What Our Clients Say" />
            <motion.div
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {testimonials.map((testimonial) => (
                <motion.article
                  key={testimonial.name}
                  className="relative rounded-sm bg-white p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <span className="pointer-events-none absolute left-6 top-2 font-display text-7xl leading-none text-blush">
                    &quot;
                  </span>
                  <p className="relative z-10 text-[0.9rem] leading-8 text-text italic">{testimonial.quote}</p>
                  <div className="mt-7 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blush to-rose text-[0.72rem] font-medium text-white">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-[0.84rem] font-medium text-deep">{testimonial.name}</p>
                      <p className="text-[0.66rem] tracking-[0.22em] text-gold">★★★★★</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="bg-cream px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              label="Our Work"
              title="The Nail Club Gallery"
              intro="From everyday BIAB to statement art sets, this is the quality clients return for month after month."
              compactMobile
            />
            <Reveal className="-mt-8 mb-7 sm:hidden">
              <p className="max-w-xl text-[0.82rem] leading-6 text-muted">Tap a style and browse our latest sets.</p>
            </Reveal>

            <Reveal className="mb-8 flex flex-wrap gap-1 border-b border-border pb-2">
              {categories.map((category) => {
                const isActive = category === activeTab;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveTab(category)}
                    className={`rounded-sm px-3 py-2.5 text-[0.66rem] uppercase tracking-[0.16em] transition sm:px-5 sm:text-[0.7rem] ${
                      isActive
                        ? "border-b-2 border-mauve text-deep"
                        : "border-b-2 border-transparent text-muted hover:text-mauve"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </Reveal>

            <motion.div
              layout
              className="grid auto-rows-[200px] grid-cols-1 gap-3 sm:auto-rows-[220px] sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[195px] lg:auto-rows-[220px]"
            >
              <AnimatePresence mode="popLayout">
                {visibleGallery.map((item, index) => {
                  const featuredClass = index === 0 && visibleGallery.length > 2 ? "md:col-span-2 md:row-span-2" : "";

                  return (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 14, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.985 }}
                      transition={{ duration: 0.35, ease }}
                      className={`group relative min-h-[200px] overflow-hidden rounded-sm ${featuredClass}`}
                    >
                      <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.45, ease }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                          style={{ objectPosition: item.focus }}
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5" />
                      <div className="absolute inset-0 border border-white/10 opacity-0 transition group-hover:opacity-100" />
                      <motion.div
                        className="absolute left-4 top-4 hidden h-10 w-10 rounded-full border border-white/30 sm:block"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                      />
                      <div className="relative flex h-full items-end p-4">
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/80">{item.tag}</p>
                          <p className="mt-1 hidden font-display text-xl text-white sm:block">{item.name}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

       <section id="services" className="bg-deep px-5 py-24 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-7xl">
    <SectionHeader
      label="Choose Your Set"
      title="Simple options. Fast booking."
      intro="Pick your set, check options only if you need them, then book in one tap."
      light
      wrapperClassName="mb-10"
      titleClassName="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.14]"
      introClassName="mt-3 max-w-xl text-[0.86rem] leading-6 text-cream/55"
    />

    {/* ── Service Tabs ── */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className="mb-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
    >
      {primaryServiceCards.map((service, index) => {
        const isActive = index === activeServiceIndex;
        return (
          <button
            key={`${service.id}-selector`}
            type="button"
            onClick={() => goToService(index)}
            className={`rounded-full border px-4 py-3 text-left transition ${
              isActive
                ? "border-rose/55 bg-rose text-deep shadow-[0_10px_25px_rgba(212,169,161,0.28)]"
                : "border-white/10 bg-white/5 text-cream/70 hover:border-rose/30 hover:text-cream"
            }`}
          >
            <p className="font-display text-[1rem] leading-tight">{service.title}</p>
            <p className={`mt-0.5 text-[0.61rem] uppercase tracking-[0.15em] ${isActive ? "text-deep/70" : "text-rose"}`}>
              {getFromTagPrice(service.options)}
            </p>
          </button>
        );
      })}
    </motion.div>

    {/* ── Service Panel ── */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      onMouseEnter={() => setPauseServiceCarousel(true)}
      onMouseLeave={() => setPauseServiceCarousel(false)}
      className="relative overflow-hidden rounded-sm border border-white/10 bg-white/5"
    >
      {activeService.featured ? (
        <span className="absolute right-5 top-0 z-10 rounded-b-sm bg-mauve px-3 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-white">
          Most Popular
        </span>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.article
          key={activeService.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: "spring", stiffness: 210, damping: 22 }}
          className="grid items-stretch lg:grid-cols-[1fr_1.6fr]"
        >
          {/* ── Image — contained, left column ── */}
          <div className="relative h-56 overflow-hidden lg:h-auto lg:min-h-[300px] lg:max-h-[380px]">
            <Image
              src={activeService.image}
              alt={activeService.title}
              width={700}
              height={500}
              className="h-full w-full object-cover"
              style={{ objectPosition: activeService.focus }}
              sizes="(min-width: 1024px) 35vw, 100vw"
            />
            {/* Right-edge fade into panel */}
            <div className="absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-r from-transparent to-[#1e1614]/80 lg:block" />
            {/* Bottom fade on mobile */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-deep/60 to-transparent lg:hidden" />
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col justify-between gap-5 p-6 sm:p-7 lg:p-8">

            {/* Name + tagline + features */}
            <div>
              <p className="mb-1.5 text-[0.58rem] uppercase tracking-[0.22em] text-rose/70">
                {activeService.title}
              </p>
              <h3 className="font-display text-[1.5rem] leading-snug text-cream">
                {activeService.benefit}
              </h3>

              <ul className="mt-4 grid gap-y-1.5 sm:grid-cols-2 sm:gap-x-6">
                {activeService.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-[0.76rem] font-light text-cream/60">
                    <span className="text-rose/80">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-end justify-between gap-5">

                {/* Price */}
                <div>
                  <p className="text-[0.56rem] uppercase tracking-[0.18em] text-muted">From</p>
                  <p className="font-display text-[2rem] leading-none text-cream">
                    {getFromPrice(activeService.options)}
                  </p>
                  <p className="mt-1.5 text-[0.67rem] italic text-cream/50">Rated 4.5★ by 50+ clients</p>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-end gap-1.5">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    href={bookingUrl}
                    className="inline-flex items-center justify-center rounded-sm border border-mauve bg-mauve px-8 py-3.5 text-[0.64rem] uppercase tracking-[0.24em] text-white transition hover:border-rose hover:bg-rose"
                  >
                    Book This
                  </motion.a>
                  <p className="text-[0.56rem] tracking-[0.05em] text-cream/40">
                    No deposit required · Instant confirmation
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedService((current) =>
                        current === activeService.id ? null : activeService.id,
                      )
                    }
                    className="text-[0.58rem] uppercase tracking-[0.16em] text-rose transition hover:text-white"
                  >
                    {expandedService === activeService.id ? "Hide options" : "View options"}
                  </button>
                </div>

              </div>

              {/* Expandable options */}
              <AnimatePresence initial={false}>
                {expandedService === activeService.id ? (
                  <motion.div
                    key={`${activeService.id}-options`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease }}
                    className="mt-4 overflow-hidden border-t border-white/10"
                  >
                    <ul className="mt-4 space-y-2 pb-1">
                      {activeService.options.map((option) => (
                        <li
                          key={option.name}
                          className="flex items-center justify-between gap-3 text-[0.74rem] text-cream/70"
                        >
                          <span>{option.name}</span>
                          <span className="shrink-0 text-rose">{formatOptionPrice(option)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

          </div>
        </motion.article>
      </AnimatePresence>

      {/* ── Carousel controls — bottom of panel ── */}
      <div className="flex items-center justify-between border-t border-white/8 px-6 py-3 sm:px-7 lg:px-8">
        <div className="flex items-center gap-2">
          {primaryServiceCards.map((service, index) => (
            <button
              key={`${service.id}-dot`}
              type="button"
              onClick={() => goToService(index)}
              aria-label={`Show ${service.title}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeServiceIndex ? "w-7 bg-rose" : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousService}
            className="h-8 w-8 rounded-full border border-white/15 text-cream/70 transition hover:border-rose/45 hover:text-rose"
            aria-label="Previous service"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goToNextService}
            className="h-8 w-8 rounded-full border border-white/15 text-cream/70 transition hover:border-rose/45 hover:text-rose"
            aria-label="Next service"
          >
            →
          </button>
        </div>
      </div>

    </motion.div>

    {/* ── Extras ── */}
    <div className="mt-6 border-t border-white/10 pt-5">
      <p className="text-center text-[0.68rem] uppercase tracking-[0.18em] text-cream/55">
        + Nail art, repairs & extras available
      </p>
      <div className="mt-1.5 text-center">
        <button
          type="button"
          onClick={() => setShowAddOnOptions((current) => !current)}
          className="text-[0.58rem] uppercase tracking-[0.16em] text-rose transition hover:text-white"
        >
          {showAddOnOptions ? "Hide extras" : "View extras"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showAddOnOptions ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="mx-auto mt-3 max-w-xl overflow-hidden"
          >
            <ul className="space-y-2 rounded-sm border border-white/10 bg-white/5 p-4">
              {addOnOptions.map((option) => (
                <li
                  key={option.name}
                  className="flex items-center justify-between gap-3 text-[0.72rem] text-cream/72"
                >
                  <span>{option.name}</span>
                  <span className="shrink-0 text-rose">{formatOptionPrice(option)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>

  </div>
</section>
        <section id="why" className="bg-blush px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative min-h-[360px] overflow-hidden rounded-sm sm:min-h-[500px]">
              <Image
                src="/images/placeholders/why.jpg"
                alt="Close-up of neutral toned manicure with rings"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4f312d]/30 via-transparent to-[#8b6862]/35" />
              <div className="absolute -right-9 -top-9 h-28 w-28 rounded-full border border-white/35" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[0.64rem] uppercase tracking-[0.16em] text-white/72">Precision that lasts for weeks</p>
              </div>
            </Reveal>

            <div>
              <SectionHeader
                label="Why Essex Nail Club"
                title="The Standard You Deserve"
                intro="Every appointment is built around precision, retention and genuine client care."
              />

              <div className="space-y-7">
                {reasons.map((reason, index) => (
                  <Reveal key={reason.title} delay={index * 0.07}>
                    <article className="flex gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0">
                      <span className="font-display text-[2.1rem] leading-none text-mauve/45">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.25rem] text-deep">{reason.title}</h3>
                        <p className="mt-1.5 text-[0.86rem] leading-7 text-muted">{reason.body}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BookingSection />
      </main>

      <footer className="bg-deep px-5 pb-10 pt-18 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 pb-12 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="font-display text-[1.14rem] uppercase tracking-[0.12em] text-cream">Essex Nail Club</p>
              <p className="mt-4 max-w-xs text-[0.82rem] leading-7 text-cream/60">
                Premium nail services in Epping, Essex. Beautiful nails designed for retention and confidence.
              </p>
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-[0.7rem] text-cream/70 transition hover:border-rose hover:text-rose"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[0.65rem] uppercase tracking-[0.22em] text-cream">Services</p>
              <ul className="space-y-2.5 text-[0.82rem] text-cream/60">
                <li>
                  <a className="transition hover:text-rose" href="#services">
                    Natural BIAB
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-rose" href="#services">
                    Acrylic Extensions
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-rose" href="#services">
                    Soft Gel Tips
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-rose" href="#services">
                    Gel Polish & Care
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-rose" href="#gallery">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[0.65rem] uppercase tracking-[0.22em] text-cream">Visit Us</p>
              <ul className="space-y-2.5 text-[0.82rem] text-cream/60">
                <li>232 High St, Epping</li>
                <li>CM16 4AU, United Kingdom</li>
                <li>
                  <a className="transition hover:text-rose" href="tel:+442037935582">
                    +44 20 3793 5582
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-rose" href="mailto:essexnailclub@gmail.com">
                    essexnailclub@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[0.65rem] uppercase tracking-[0.22em] text-cream">Hours</p>
              <ul className="space-y-2.5 text-[0.82rem] text-cream/60">
                <li>Mon - Fri: 9am - 7pm</li>
                <li>Saturday: 9am - 6pm</li>
                <li>Sunday: 10am - 4pm</li>
                <li className="pt-1 text-rose">Walk-ins Welcome</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-[0.72rem] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Essex Nail Club. All rights reserved.</p>
            <p>232 High St · Epping CM16 4AU · United Kingdom</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

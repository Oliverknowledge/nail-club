"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
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

type Service = {
  name: string;
  tagline: string;
  description: string;
  perks: string[];
  price: string;
  featured?: boolean;
  icon: "biab" | "acrylic" | "art";
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

const services: Service[] = [
  {
    name: "Natural BIAB",
    tagline: "Builder In A Bottle, upgraded",
    description:
      "Strong, flexible and polished for everyday wear. Ideal if you want durable nails without heavy extensions.",
    perks: [
      "Up to 4-6 weeks wear",
      "Strengthens natural nails",
      "Full color range available",
      "Add nail art from £5",
    ],
    price: "£35",
    featured: true,
    icon: "biab",
  },
  {
    name: "Acrylic Extensions",
    tagline: "Length, shape and strength",
    description:
      "Custom sculpted acrylic extensions designed around your preferred length and shape, finished with a flawless top coat.",
    perks: [
      "Custom shape and length",
      "Infill appointments available",
      "Gel polish finish included",
      "Nail art add-ons available",
    ],
    price: "£50",
    icon: "acrylic",
  },
  {
    name: "Luxury Nail Art",
    tagline: "Bespoke wearable art",
    description:
      "From minimal florals to statement sets, every design is tailored to your inspiration and occasion.",
    perks: [
      "Bespoke design consultation",
      "Gel, chrome and foil finishes",
      "Seasonal and event designs",
      "Bring your inspo photos",
    ],
    price: "£55",
    icon: "art",
  },
];

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
const bookingUrl = "https://essex-nail-club.square.site/";

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
}: {
  label: string;
  title: string;
  intro?: string;
  light?: boolean;
  compactMobile?: boolean;
}) {
  const labelColor = light ? "text-rose" : "text-mauve";
  const titleColor = light ? "text-cream" : "text-deep";
  const introColor = light ? "text-cream/60" : "text-muted";

  return (
    <Reveal className="mb-14">
      <p className={`mb-3 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] ${labelColor}`}>
        <span className={`h-px w-8 ${light ? "bg-rose" : "bg-mauve"}`} />
        {label}
      </p>
      <h2 className={`font-display text-[clamp(2rem,3.5vw,3.05rem)] leading-tight ${titleColor}`}>{title}</h2>
      {intro ? (
        <p className={`mt-4 max-w-2xl text-[0.92rem] leading-8 ${introColor} ${compactMobile ? "hidden sm:block" : ""}`}>
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  if (icon === "biab") {
    return (
      <svg className="h-10 w-10 opacity-55" viewBox="0 0 40 40" fill="none" aria-hidden>
        <ellipse cx="20" cy="25" rx="8" ry="11" stroke="rgba(212,169,161,0.72)" strokeWidth="1.5" />
        <path d="M12 25 Q12 14 20 12 Q28 14 28 25" stroke="rgba(212,169,161,0.45)" strokeWidth="1.1" />
      </svg>
    );
  }

  if (icon === "acrylic") {
    return (
      <svg className="h-10 w-10 opacity-55" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="14" y="10" width="12" height="22" rx="6" stroke="rgba(212,169,161,0.65)" strokeWidth="1.5" />
        <path d="M14 20 Q10 20 10 26 Q10 32 14 32" stroke="rgba(212,169,161,0.42)" strokeWidth="1.1" />
        <path d="M26 20 Q30 20 30 26 Q30 32 26 32" stroke="rgba(212,169,161,0.42)" strokeWidth="1.1" />
      </svg>
    );
  }

  return (
    <svg className="h-10 w-10 opacity-55" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 8 L22 16 L30 16 L24 21 L26 29 L20 24 L14 29 L16 21 L10 16 L18 16 Z"
        stroke="rgba(212,169,161,0.65)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("All");
  const visibleGallery = useMemo(
    () => (activeTab === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeTab)),
    [activeTab],
  );
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
                <a href="#services" className={ghostCta}>
                  View Services
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
              label="Signature Services"
              title="Choose Your Look"
              intro="Three high-performing treatments designed for beautiful nails and reliable retention."
              light
            />

            <motion.div
              className="grid gap-5 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {services.map((service) => (
                <motion.article
                  key={service.name}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`relative border p-8 sm:p-9 ${
                    service.featured
                      ? "border-rose/35 bg-rose/12"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  {service.featured ? (
                    <span className="absolute right-7 top-0 rounded-b-sm bg-mauve px-3 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-white">
                      Most Popular
                    </span>
                  ) : null}

                  <ServiceIcon icon={service.icon} />

                  <h3 className="mt-5 font-display text-[1.6rem] text-cream">{service.name}</h3>
                  <p className="mt-1 text-[0.74rem] uppercase tracking-[0.08em] text-rose">{service.tagline}</p>
                  <p className="mt-5 text-[0.86rem] leading-7 text-cream/65">{service.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {service.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-3 text-[0.79rem] text-cream/70">
                        <span className="text-mauve">—</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[0.58rem] uppercase tracking-[0.14em] text-muted">From</p>
                      <p className="font-display text-[2rem] leading-none text-cream">{service.price}</p>
                    </div>
                    <a
                      href={bookingUrl}
                      className={`rounded-sm border px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.18em] transition ${
                        service.featured
                          ? "border-mauve bg-mauve text-white hover:border-rose hover:bg-rose"
                          : "border-rose/40 text-rose hover:border-mauve hover:bg-mauve hover:text-white"
                      }`}
                    >
                      Book Now
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
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
                {["IG", "FB", "TK"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-[0.7rem] text-cream/70 transition hover:border-rose hover:text-rose"
                  >
                    {social}
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
                    Luxury Nail Art
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
                <li>Epping, Essex</li>
                <li>CM16, United Kingdom</li>
                <li>
                  <a className="transition hover:text-rose" href="tel:+44000000000">
                    +44 (0) 000 000 0000
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-rose" href="mailto:hello@essexnailclub.co.uk">
                    hello@essexnailclub.co.uk
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
            <p>Epping · Essex · United Kingdom</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { useState, type ReactNode } from "react";

type Step = {
  label: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    label: "Choose your style",
    icon: <NailIcon />,
  },
  {
    label: "Pick your date",
    icon: <CalendarIcon />,
  },
  {
    label: "Confirm and arrive",
    icon: <CheckIcon />,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;
const springTransition: Transition = { type: "spring", stiffness: 260, damping: 20, mass: 0.8 };
const bookingUrl =
  "https://book.squareup.com/appointments/ndtofgbocxjbf9/location/LACCK0ZJFVNDM/services";

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
};

const stepsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 18,
      mass: 0.75,
    },
  },
};

function NailIcon() {
  return (
    <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4.5C8.2 4.5 6.5 7 6.5 10.8V15a5.5 5.5 0 1011 0v-4.2C17.5 7 15.8 4.5 12 4.5z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.2 10.3c0-1.6 1.2-2.9 2.8-2.9s2.8 1.3 2.8 2.9" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="6.5" width="15" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v3M16 4.5v3M4.5 10h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12.2l2 2 4-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepItem({
  label,
  icon,
  isLast,
  index,
}: {
  label: string;
  icon: ReactNode;
  isLast: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div variants={stepVariants} className="relative flex flex-col items-center text-center">
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -2, 0],
              }
        }
        transition={{
          duration: 3.2 + index * 0.35,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2.4 + index * 0.25,
        }}
      >
        <motion.button
          type="button"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          className="relative flex h-[4.45rem] w-[4.45rem] items-center justify-center rounded-full border border-rose/35 bg-white/70 text-mauve shadow-[0_12px_26px_rgba(106,75,69,0.14)] backdrop-blur-sm sm:h-20 sm:w-20"
          aria-label={label}
        >
          <motion.span
            className="pointer-events-none absolute inset-1 rounded-full bg-rose/15"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.16, 0.3, 0.16],
                    scale: [1, 1.06, 1],
                  }
            }
            transition={{
              duration: 3.6 + index * 0.25,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full border border-rose/45"
            animate={
              hovered
                ? {
                    opacity: 1,
                    scale: 1.08,
                    boxShadow: "0 0 0 7px rgba(212,169,161,0.17)",
                  }
                : {
                    opacity: 0.55,
                    scale: 1,
                    boxShadow: "0 0 0 0 rgba(212,169,161,0.0)",
                  }
            }
            transition={{ duration: 0.35, ease: smoothEase }}
          />
          <motion.span
            className="relative z-10"
            animate={hovered ? { scale: 1.07, color: "#8f655d" } : { scale: 1, color: "#b8857a" }}
            transition={springTransition}
          >
            {icon}
          </motion.span>
        </motion.button>
      </motion.div>

      <p className="mt-3 max-w-[10.5rem] text-[0.66rem] uppercase tracking-[0.14em] text-muted sm:text-[0.68rem]">{label}</p>

      {!isLast ? (
        <>
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.55, delay: 0.08 + index * 0.08, ease: smoothEase }}
            className="absolute left-1/2 top-[4.8rem] h-8 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-rose/50 to-transparent sm:hidden"
          />
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.55, delay: 0.08 + index * 0.08, ease: smoothEase }}
            className="absolute left-[calc(100%+0.45rem)] top-[2.2rem] hidden h-px w-9 origin-left bg-gradient-to-r from-rose/50 to-transparent sm:block md:w-12 lg:w-16"
          />
        </>
      ) : null}
    </motion.div>
  );
}

function BookingButton() {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => {
        window.location.href = bookingUrl;
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 44px rgba(47,34,30,0.34)" }}
      whileTap={{ scale: 0.95 }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.012, 1],
              boxShadow: [
                "0 10px 22px rgba(47,34,30,0.18)",
                "0 16px 32px rgba(47,34,30,0.24)",
                "0 10px 22px rgba(47,34,30,0.18)",
              ],
            }
      }
      transition={
        reduceMotion
          ? springTransition
          : {
              duration: 1.8,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3.8,
            }
      }
      className="group relative inline-flex min-w-[17.5rem] items-center justify-center overflow-hidden rounded-sm px-8 py-4 text-[0.74rem] uppercase tracking-[0.18em] text-cream"
    >
      <motion.span className="absolute inset-0 bg-gradient-to-r from-deep to-[#3c302d]" />
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-[#3c302d] to-[#5f4742]"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, ease: smoothEase }}
      />
      <motion.span
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={reduceMotion ? undefined : { x: ["-140%", "340%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 1.05,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5.2,
              }
        }
      />
      <span className="relative z-10 flex items-center gap-2.5">
        Book Your Appointment
        <motion.span
          aria-hidden
          animate={hovered ? { x: 5 } : reduceMotion ? { x: 0 } : { x: [0, 1.4, 0] }}
          transition={
            hovered
              ? { type: "spring", stiffness: 340, damping: 20 }
              : {
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2.8,
                }
          }
          className="text-[0.95rem]"
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

export function BookingSection() {
  return (
    <section id="booking" className="relative overflow-hidden bg-cream px-5 py-24 text-center sm:px-8 lg:px-12">
      <span className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 font-display text-[24vw] leading-none tracking-[0.1em] text-rose/10">
        BOOK
      </span>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.p
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="mb-4 inline-flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.28em] text-mauve"
        >
          <span className="h-px w-8 bg-mauve" />
          Ready?
        </motion.p>

        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight text-deep"
        >
          Book Your Appointment
        </motion.h2>

        <motion.p
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="mx-auto mt-4 max-w-2xl text-[0.92rem] leading-8 text-muted"
        >
          It takes less than two minutes. Pick your service, lock in your time and we handle the rest.
        </motion.p>

        <motion.p
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-rose"
        >
          Limited prime-time slots each week
        </motion.p>

        <motion.div
          variants={stepsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3 sm:gap-4 lg:gap-8"
        >
          {steps.map((step, index) => (
            <StepItem key={step.label} label={step.label} icon={step.icon} isLast={index === steps.length - 1} index={index} />
          ))}
        </motion.div>

        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <BookingButton />
          <a
            href={bookingUrl}
            className="inline-flex items-center justify-center border-b border-border pb-1 text-[0.72rem] uppercase tracking-[0.16em] text-muted transition hover:border-mauve hover:text-mauve"
          >
            View on Square
          </a>
        </motion.div>
      </div>
    </section>
  );
}

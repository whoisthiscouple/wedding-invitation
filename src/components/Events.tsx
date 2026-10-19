import { motion } from "framer-motion";
import Divider from "./Divider";

interface EventItem {
  name: string;
  time: string;
  label: string;
  description: string;
  details?: string[];
  script?: string;
  footnote?: string;
  venue?: string;
  venueUrl?: string;
  accent: string;
}

const events: EventItem[] = [
  {
    name: "Bridal Shower",
    time: "4:00 PM",
    label: "3 DECEMBER",
    description: "An evening filled with laughter, games, music, and all the love as we celebrate the bride-to-be.",
    details: ["Theme: Sunshine and Spritz"],
    script: "For a very special few ✨",
    footnote: "Our bridesmaids will reach out with where to be and what to wear. 💌",
    venue: "18.19 Cafe",
    venueUrl: "https://maps.app.goo.gl/n1HtXQ8fAhjMSs1o6",
    accent: "from-maroon-light/40 to-gold/10",
  },
  {
    name: "Wedding Dinner",
    time: "7:30 PM",
    label: "4 DECEMBER",
    description: "An evening of celebration — good food, warm conversations, laughter, and memories to cherish for years to come.",
    venue: "Royal Dine - Marigold Banquet Hall",
    venueUrl: "https://maps.app.goo.gl/wgYTZNaFMAM4KJS56",
    accent: "from-gold/40 to-emerald/10",
  },
];

export default function Events() {
  return (
    <section id="events" className="relative bg-emerald py-24 md:py-32">
      <div className="linen-texture absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Divider label="THE CELEBRATIONS" light />
          <h2 className="font-display mt-6 text-4xl text-warmwhite md:text-5xl">Moments to Cherish</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-lg text-warmwhite/70 md:text-xl">
            Two occasions, one celebration. A shower of love and an evening to treasure.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-warmwhite overflow-hidden"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${event.accent}`} />
              <div className="p-8">
                <span className="font-label text-[0.55rem] tracking-[0.35em] text-gold">{event.label}</span>
                <h3 className="font-display mt-2 text-2xl text-charcoal md:text-3xl">{event.name}</h3>
                <div className="my-4 h-px w-12 bg-gold/40" />
                {event.script && (
                  <p className="font-script text-2xl leading-tight text-gold-dark">{event.script}</p>
                )}
                <p className="font-body text-base text-charcoal-light/80">{event.description}</p>
                {event.details && (
                  <div className="mt-4 space-y-1 border-t border-gold/15 pt-4">
                    {event.details.map((d) => (
                      <p key={d} className="font-label text-[0.55rem] tracking-[0.2em] text-charcoal-light/70">
                        {d.toUpperCase()}
                      </p>
                    ))}
                  </div>
                )}
                {event.footnote && (
                  <p className="font-label mt-4 border-t border-gold/15 pt-4 text-[0.6rem] leading-relaxed tracking-[0.12em] text-charcoal-light/60">
                    {event.footnote}
                  </p>
                )}
                {event.venue && (
                  <div className="mt-4 border-t border-gold/15 pt-4">
                    <span className="font-label text-[0.5rem] tracking-[0.3em] text-gold">VENUE</span>
                    {event.venueUrl ? (
                      <a
                        href={event.venueUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-body mt-1 block text-base text-charcoal underline decoration-gold/40 underline-offset-4 transition-colors hover:text-emerald"
                      >
                        {event.venue}
                      </a>
                    ) : (
                      <p className="font-body mt-1 text-base text-charcoal">{event.venue}</p>
                    )}
                  </div>
                )}
                <div className="mt-6 flex items-center gap-2 text-gold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-label text-[0.6rem] tracking-[0.25em]">{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

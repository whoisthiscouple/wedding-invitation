import { motion } from "framer-motion";
import Divider from "./Divider";

const venueName = "Royal Dine - Marigold Banquet Hall";
const addressLines = [
  "Opp. Madhav Atria, Nr. Bagban Kratos Circle",
  "Green City Road, Gaurav Path Road",
  "Pal Gam, Surat, Gujarat 394510",
];
const mapsLink = "https://maps.app.goo.gl/wgYTZNaFMAM4KJS56";
const mapEmbed = "https://www.google.com/maps?cid=8038964498943690728&z=17&output=embed";

export default function Venue() {
  return (
    <section id="venue" className="relative py-24 md:py-32" style={{ backgroundColor: "#0A3F34" }}>
      <div className="linen-texture absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Divider label="THE VENUE" light />
          <h2 className="font-display mt-6 text-4xl text-warmwhite md:text-5xl">Where It All Happens</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mt-14"
        >
          <div className="relative bg-warmwhite px-6 py-10 shadow-xl md:px-14 md:py-14">
            <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="font-label text-xs tracking-[0.4em] text-gold">WEDDING DINNER</span>
                <h3 className="font-display mt-2 text-3xl text-charcoal md:text-4xl">{venueName}</h3>
                <p className="font-body mt-3 text-lg leading-relaxed text-charcoal-light/80">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-label rounded-full bg-emerald px-6 py-3 text-[0.6rem] tracking-[0.3em] text-warmwhite shadow-md transition-transform hover:scale-105"
                  >
                    VIEW ON MAP
                  </a>
                </div>
              </div>

              <div className="relative h-72 overflow-hidden border-4 border-warmwhite shadow-lg md:h-96">
                <iframe
                  title="Venue map"
                  src={mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { MapPin, Users, CalendarDays, ArrowDown } from "lucide-react";
import Countdown from "./Countdown";

function Hero() {
  const scrollToItinerary = () => {
    document
      .getElementById("itinerary")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.div
          className="hero-location"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MapPin size={16} />
          VARANASI • INDIA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          BANARAS
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A Journey With Friends
        </motion.p>

        <motion.div
          className="hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

        <motion.div
          className="hero-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div>
            <CalendarDays size={18} />
            <span>01 — 04 OCT 2026</span>
          </div>

          <div>
            <Users size={18} />
            <span>13 TRAVELLERS</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-price"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span>₹8,500</span>
          <small> / PERSON</small>
        </motion.div>

        <Countdown />

        <motion.button
          className="explore-button"
          onClick={scrollToItinerary}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          EXPLORE JOURNEY
          <ArrowDown size={18} />
        </motion.button>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}

export default Hero;
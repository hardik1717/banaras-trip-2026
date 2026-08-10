import { motion } from "framer-motion";
import { itinerary } from "../data/itinerary";
import LocationCard from "../components/LocationCard";

function Itinerary() {
  return (
    <section className="itinerary-section" id="itinerary">
      <div className="itinerary-header">
        <span>THE JOURNEY</span>

        <h2>4 Days of Spiritual India</h2>

        <p>Ayodhya • Prayagraj • Varanasi • Sarnath</p>
      </div>

      <div className="itinerary-container">
        {itinerary.map((day) => (
          <motion.div
            className="day-block"
            key={day.day}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="day-heading">
              <div className="day-number">
                {String(day.day).padStart(2, "0")}
              </div>

              <div>
                <span>{day.date}</span>

                <h3>{day.title}</h3>

                <p>{day.subtitle}</p>
              </div>
            </div>

            <div className="location-list">
              {day.locations.map((location, index) => (
                <LocationCard
                  key={location.name}
                  location={location}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Itinerary;


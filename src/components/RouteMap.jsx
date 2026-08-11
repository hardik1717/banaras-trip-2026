import { motion } from "framer-motion";
import { Train, MapPin } from "lucide-react";

const route = [
  {
    city: "Mumbai",
    subtitle: "Departure",
    x: 8,
    y: 72,
  },
  {
    city: "Ayodhya",
    subtitle: "Arrival",
    x: 62,
    y: 18,
  },
  {
    city: "Prayagraj",
    subtitle: "Day 2",
    x: 48,
    y: 43,
  },
  {
    city: "Varanasi",
    subtitle: "Main Stay",
    x: 78,
    y: 45,
  },
  {
    city: "Sarnath",
    subtitle: "Day 4",
    x: 84,
    y: 28,
  },
];

function RouteMap() {
  return (
    <section className="route-section" id="route">
      <div className="route-container">

        <div className="route-header">
          <span className="section-label">THE ROUTE</span>

          <h2>
            From Mumbai
            <br />
            to Banaras
          </h2>

          <p>
            One journey. Multiple destinations.
          </p>
        </div>

        <div className="route-map">

          {/* Decorative background */}

          <div className="map-grid" />

          <div className="map-label map-label-1">
            INDIA
          </div>

          <div className="map-label map-label-2">
            UTTAR PRADESH
          </div>

          {/* Route SVG */}

          <svg
            className="route-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 8 72
                 C 22 65, 40 48, 62 18
                 C 57 30, 52 37, 48 43
                 C 60 44, 69 45, 78 45
                 C 81 40, 82 34, 84 28"
              fill="none"
              stroke="rgba(180, 145, 85, 0.3)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />

            <motion.path
              d="M 8 72
                 C 22 65, 40 48, 62 18
                 C 57 30, 52 37, 48 43
                 C 60 44, 69 45, 78 45
                 C 81 40, 82 34, 84 28"
              fill="none"
              stroke="#b49255"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
            />

          </svg>

          {/* Moving train */}

          <motion.div
            className="moving-train"
            initial={{
              left: "8%",
              top: "72%",
              opacity: 0,
            }}
            whileInView={{
              left: "62%",
              top: "18%",
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 1,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Train size={17} />
          </motion.div>

          {/* Locations */}

          {route.map((location, index) => (
            <motion.div
              className="route-stop"
              key={location.city}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.5 + index * 0.45,
                duration: 0.5,
              }}
            >
              <div className="route-pin">
                <MapPin size={15} />
              </div>

              <div className="route-stop-text">
                <strong>{location.city}</strong>
                <span>{location.subtitle}</span>
              </div>
            </motion.div>
          ))}

          {/* Journey label */}

          <div className="route-journey-label">
            <Train size={16} />
            <span>MUMBAI → AYODHYA</span>
          </div>

        </div>

        {/* Route summary */}

        <div className="route-summary">

          <div>
            <span>START</span>
            <strong>Mumbai</strong>
          </div>

          <div className="route-arrow">→</div>

          <div>
            <span>DESTINATION</span>
            <strong>Varanasi</strong>
          </div>

          <div className="route-arrow">→</div>

          <div>
            <span>FINAL STOP</span>
            <strong>Sarnath</strong>
          </div>

        </div>

      </div>
    </section>
  );
}

export default RouteMap;
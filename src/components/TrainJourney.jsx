import { motion } from "framer-motion";
import {
  Train,
  MapPin,
  Clock3,
  Users,
  ArrowRight,
} from "lucide-react";

import { goingJourney } from "../data/trainJourney";
import { returnJourney } from "../data/returnJourney";

function JourneyCard({ journey }) {
  const isReturn = journey.type === "RETURN";

  return (
    <motion.div
      className="train-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}

      <div className="train-title">
        <div>
          <span className="train-label">
            {isReturn ? "RETURN JOURNEY" : "GOING JOURNEY"}
          </span>

          <h3>{journey.trainName}</h3>

          <p>Train No. {journey.trainNumber}</p>
        </div>

        <div className="train-icon">
          <Train size={30} />
        </div>
      </div>

      {/* Route */}

      <div className="train-route">

        <div className="station">
          <div className="station-dot" />

          <span className="station-code">
            {journey.from.shortName}
          </span>

          <h4>{journey.from.station}</h4>

          <p>{journey.from.city}</p>

          <strong>{journey.departure.time}</strong>

          <small>{journey.departure.date}</small>
        </div>

        <div className="route-line">

          <motion.div
            className="moving-train"
            initial={{
              left: isReturn ? "90%" : "0%",
            }}
            whileInView={{
              left: isReturn ? "0%" : "90%",
            }}
            viewport={{ once: true }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <Train size={28} />
          </motion.div>

          <div className="line" />

          <span className="distance">
            {journey.distance}
          </span>

        </div>

        <div className="station arrival">

          <div className="station-dot" />

          <span className="station-code">
            {journey.to.shortName}
          </span>

          <h4>{journey.to.station}</h4>

          <p>{journey.to.city}</p>

          <strong>{journey.arrival.time}</strong>

          <small>{journey.arrival.date}</small>

        </div>

      </div>

      {/* Journey information */}

      <div className="journey-info">

        <div>
          <Clock3 size={18} />

          <span>
            <small>Journey</small>
            {isReturn ? "Return" : "Going"}
          </span>
        </div>

        <div>
          <Train size={18} />

          <span>
            <small>Class</small>
            {journey.class}
          </span>
        </div>

        <div>
          <MapPin size={18} />

          <span>
            <small>Distance</small>
            {journey.distance}
          </span>
        </div>

      </div>

      {/* Passengers */}

      <div className="passenger-section">

        <div className="passenger-heading">

          <div>
            <Users size={20} />

            <h3>Train Passengers</h3>
          </div>

          <span>
            {journey.passengers.length} passengers
          </span>

        </div>

        <div className="passenger-list">

          {journey.passengers.map((passenger, index) => (

            <motion.div
              className="passenger-row"
              key={`${journey.type}-${passenger.name}`}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.04,
              }}
            >

              <span className="passenger-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="passenger-name">
                {passenger.name}
              </span>

              <div className="passenger-ticket">

                <span
                  className={`ticket-status ${
                    passenger.status === "CONFIRMED"
                      ? "confirmed"
                      : "waiting"
                  }`}
                >
                  {passenger.status}
                </span>

                {isReturn &&
                  passenger.coach &&
                  passenger.berth && (
                    <small>
                      {passenger.coach} • {passenger.berth}
                    </small>
                  )}

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </motion.div>
  );
}

function TrainJourney() {
  return (
    <section className="train-journey" id="train-journey">

      <div className="train-header">

        <span className="section-label">
          THE TRAIN JOURNEY
        </span>

        <h2>🚆 Mumbai ↔ Varanasi</h2>

        <p>
          Two trains. One unforgettable journey.
        </p>

      </div>

      {/* GOING */}

      <div className="journey-block">

        <div className="journey-direction">
          <span>01</span>
          <div>
            <strong>Mumbai → Ayodhya</strong>
            <small>30 September – 1 October</small>
          </div>
        </div>

        <JourneyCard journey={goingJourney} />

      </div>

      {/* Connector */}

      <div className="journey-connector">
        <ArrowRight size={20} />
        <span>Explore • Experience • Return</span>
        <ArrowRight size={20} />
      </div>

      {/* RETURN */}

      <div className="journey-block">

        <div className="journey-direction">
          <span>02</span>
          <div>
            <strong>Varanasi → Mumbai</strong>
            <small>4 October – 6 October</small>
          </div>
        </div>

        <JourneyCard journey={returnJourney} />

      </div>

    </section>
  );
}

export default TrainJourney;
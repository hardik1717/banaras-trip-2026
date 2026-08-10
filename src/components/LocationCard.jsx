import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

function LocationCard({ location, index }) {
  return (
    <motion.div
      className="location-card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
    >
      {/* Location Image */}
      <div className="location-image-wrapper">
        <img
          src={location.image}
          alt={location.name}
          className="location-image"
          loading="lazy"
        />
      </div>

      {/* Location Information */}
      <div className="location-card-content">
        <div className="location-icon">
          <MapPin size={18} />
        </div>

        <div className="location-content">
          <span className="location-category">
            {location.category}
          </span>

          <h4>{location.name}</h4>

          <p>{location.description}</p>

          <a
            href={location.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-button"
          >
            <MapPin size={14} />
            OPEN IN GOOGLE MAPS
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default LocationCard;


"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const OFFICES = [
  { city: "New Delhi",  lat: 28.6139, lng: 77.2090, delay: 0.0  },
  { city: "Noida",      lat: 28.5355, lng: 77.3910, delay: 0.4  },
  { city: "Gurgaon",   lat: 28.4595, lng: 77.0266, delay: 0.8  },
  { city: "Mumbai",     lat: 19.0760, lng: 72.8777, delay: 1.2  },
  { city: "Ahmedabad",  lat: 23.0225, lng: 72.5714, delay: 1.6  },
  { city: "Chennai",    lat: 13.0827, lng: 80.2707, delay: 2.0  },
  { city: "Kolkata",    lat: 22.5726, lng: 88.3639, delay: 2.4  },
];

function makeIcon(city: string, delay: number) {
  return L.divIcon({
    className: "mf-pin",
    html: `
      <div class="mf-pin-inner">
        <div class="mf-dot-wrap">
          <div class="mf-ring" style="animation-delay:${delay}s"></div>
          <div class="mf-ring mf-ring-outer" style="animation-delay:${delay + 0.5}s"></div>
          <div class="mf-dot"></div>
        </div>
        <span class="mf-label">${city}</span>
      </div>
    `,
    iconSize: [1, 1],
    iconAnchor: [0, 0],
    popupAnchor: [0, -22],
  });
}

const INDIA_BOUNDS: L.LatLngBoundsExpression = [[5.0, 62.0], [38.0, 100.0]];

export default function IndiaMapLeaflet() {
  return (
    <>
      <style>{`
        /* ── marker reset ── */
        .mf-pin,
        .india-map .leaflet-marker-icon { overflow: visible !important; }

        .mf-pin-inner {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        /* dot + ring wrapper */
        .mf-dot-wrap {
          position: relative;
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .mf-dot {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #C8282A;
          border: 2.5px solid rgba(255,255,255,0.95);
          box-shadow:
            0 0 0 1px rgba(200,40,42,0.4),
            0 0 12px rgba(200,40,42,0.8),
            0 0 24px rgba(200,40,42,0.35);
          z-index: 3;
        }

        .mf-ring {
          position: absolute;
          top: 50%; left: 50%;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(200, 40, 42, 0.22);
          transform: translate(-50%, -50%) scale(0.4);
          opacity: 0;
          animation: mf-pulse 2.6s ease-out infinite;
        }
        .mf-ring-outer {
          width: 50px; height: 50px;
          background: rgba(200, 40, 42, 0.10);
        }

        @keyframes mf-pulse {
          0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 0.85; }
          60%  { opacity: 0.2; }
          100% { transform: translate(-50%,-50%) scale(3.2); opacity: 0; }
        }

        .mf-label {
          margin-top: 7px;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          text-shadow:
            0 1px 6px rgba(0,0,0,1),
            0 0 12px rgba(0,0,0,0.9),
            0 0 3px rgba(0,0,0,0.8);
          white-space: nowrap;
          font-family: ui-sans-serif, system-ui, sans-serif;
          line-height: 1;
        }

        /* ── map background ── */
        .india-map .leaflet-container {
          background: #111110;
          border-radius: 1.25rem;
          font-family: inherit;
        }

        /* ── popups ── */
        .india-map .leaflet-popup-content-wrapper {
          background: rgba(16, 13, 10, 0.93);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(200,40,42,0.40);
          border-radius: 0.7rem;
          box-shadow:
            0 8px 32px rgba(0,0,0,0.6),
            0 0 0 1px rgba(200,40,42,0.12),
            inset 0 1px 0 rgba(255,255,255,0.06);
          padding: 0;
        }
        .india-map .leaflet-popup-content {
          margin: 0.55rem 1rem;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .india-map .leaflet-popup-tip-container { display: none; }
        .india-map .leaflet-popup-close-button {
          color: rgba(255,255,255,0.28) !important;
          font-size: 15px !important;
          top: 3px !important;
          right: 6px !important;
        }
        .india-map .leaflet-popup-close-button:hover {
          color: rgba(200,40,42,0.9) !important;
        }

        /* ── zoom controls ── */
        .india-map .leaflet-control-zoom {
          border: none !important;
          border-radius: 10px !important;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,40,42,0.2) !important;
        }
        .india-map .leaflet-control-zoom a {
          background: rgba(18,14,10,0.90) !important;
          backdrop-filter: blur(12px) !important;
          border-color: rgba(200,40,42,0.18) !important;
          color: rgba(255,255,255,0.65) !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 18px !important;
          font-weight: 300 !important;
          transition: all 0.15s ease !important;
        }
        .india-map .leaflet-control-zoom a:hover {
          background: rgba(200,40,42,0.22) !important;
          color: rgba(255,255,255,0.95) !important;
          border-color: rgba(200,40,42,0.45) !important;
        }
        .india-map .leaflet-control-zoom-in  { border-radius: 0 !important; border-bottom: 1px solid rgba(200,40,42,0.18) !important; }
        .india-map .leaflet-control-zoom-out { border-radius: 0 !important; }

        /* ── attribution ── */
        .india-map .leaflet-attribution-flag { display: none !important; }
        .india-map .leaflet-control-attribution {
          background: rgba(8,6,4,0.72) !important;
          font-size: 0.56rem;
          color: rgba(255,255,255,0.22);
          backdrop-filter: blur(8px);
          border-radius: 6px 0 0 0;
          padding: 2px 7px;
          border: none !important;
        }
        .india-map .leaflet-control-attribution a {
          color: rgba(255,255,255,0.32) !important;
        }

        /* ── subtle vignette overlay ── */
        .india-map {
          position: relative;
        }
        .india-map::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1.25rem;
          background: radial-gradient(
            ellipse at center,
            transparent 55%,
            rgba(8,6,4,0.45) 100%
          );
          pointer-events: none;
          z-index: 400;
        }
      `}</style>

      <div className="india-map" style={{ height: "100%", width: "100%" }}>
        <MapContainer
          center={[22.0, 79.5]}
          zoom={5}
          style={{ height: "100%", width: "100%", borderRadius: "1.25rem" }}
          scrollWheelZoom={false}
          maxBounds={INDIA_BOUNDS}
          maxBoundsViscosity={0.85}
          minZoom={4}
          maxZoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          {OFFICES.map(({ city, lat, lng, delay }) => (
            <Marker
              key={city}
              position={[lat, lng]}
              icon={makeIcon(city, delay)}
            >
              <Popup>
                <span>{city}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

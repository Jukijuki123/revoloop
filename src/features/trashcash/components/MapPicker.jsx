import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import { useEffect, useState, useCallback, useMemo } from "react";
import L from "leaflet";
import {
  MapPin,
  Landmark,
  Footprints,
  Bike,
  Car,
  X,
  ChevronLeft,
  RefreshCw,
  Navigation
} from "lucide-react";

import { bankSampah } from "../data/bankSampah";

// ========================================
// Constants — di luar komponen agar tidak
// di-recreate setiap render
// ========================================

const DEFAULT_ICON = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const NEAREST_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const USER_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const WALK_SPEED  = 5;
const MOTOR_SPEED = 40;
const CAR_SPEED   = 35;

// ========================================
// Pure helper functions — di luar komponen
// ========================================

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistance(a, b) {
  const R    = 6371;
  const dLat = deg2rad(b.lat - a.lat);
  const dLng = deg2rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(a.lat)) *
    Math.cos(deg2rad(b.lat)) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function formatTime(hours) {
  const minutes = Math.round(hours * 60);
  if (minutes < 60) return `${minutes} menit`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}j ${m}m`;
}

// ========================================
// Sub-komponen kecil agar MapPicker ringkas
// ========================================

function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 bg-green-50">
      <div className="w-10 h-10 border-4 border-primary-dark border-t-transparent rounded-full animate-spin" />
      <p className="text-primary-dark font-medium">Mengambil lokasi kamu...</p>
    </div>
  );
}

function ErrorScreen({ message }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-green-50 px-8 text-center">
      <MapPin className="w-12 h-12 text-red-500" />
      <p className="text-red-500">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="flex gap-2 bg-primary-dark text-center text-white text-sm px-3 py-2 rounded-lg hover:bg-secondary hover:border-secondary transition"
      >
        <RefreshCw className="w-4 h-4" />
        Coba Lagi
      </button>
    </div>
  );
}

function ETAItem({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-100 rounded-xl py-2 px-1 flex justify-center items-center gap-2">
      <Icon className="w-4 h-4 text-primary-dark" />
      <span className="text-xs font-medium text-gray-600">{value}</span>
    </div>
  );
}

// ========================================
// Komponen utama
// ========================================

export default function MapPicker({ onSelect }) {

  const [userLocation, setUserLocation] = useState(null);
  const [nearestBank,  setNearestBank]  = useState(null);
  const [distanceKm,   setDistanceKm]   = useState(0);
  const [etaWalk,      setEtaWalk]      = useState("");
  const [etaMotor,     setEtaMotor]     = useState("");
  const [etaCar,       setEtaCar]       = useState("");
  const [routeCoords,  setRouteCoords]  = useState([]);
  const [locationError,setLocationError]= useState("");
  const [isLoading,    setIsLoading]    = useState(true);
  const [showBadge,    setShowBadge]    = useState(true);

  // ✅ useCallback — fetchRoute tidak di-recreate setiap render
  const fetchRoute = useCallback(async (from, to) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
      const res  = await fetch(url);
      const data = await res.json();
      if (data.routes?.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteCoords(coords);
      }
    } catch (err) {
      console.error("Gagal mengambil rute:", err);
    }
  }, []);

  useEffect(() => {
    if (bankSampah.length === 0) {
      setLocationError("Data bank sampah tidak tersedia.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        const nearest = bankSampah.reduce((prev, curr) =>
          getDistance(user, curr) < getDistance(user, prev) ? curr : prev,
          bankSampah[0]
        );

        const dist = getDistance(user, nearest);

        setUserLocation(user);
        setNearestBank(nearest);
        setDistanceKm(dist);
        setEtaWalk(formatTime(dist / WALK_SPEED));
        setEtaMotor(formatTime(dist / MOTOR_SPEED));
        setEtaCar(formatTime(dist / CAR_SPEED));
        setIsLoading(false);

        fetchRoute(user, nearest);
      },
      (err) => {
        const msg =
          err.code === err.PERMISSION_DENIED ? "Izin lokasi ditolak. Aktifkan GPS kamu lalu muat ulang halaman." :
          err.code === err.TIMEOUT           ? "Waktu permintaan lokasi habis. Periksa koneksi kamu dan coba lagi." :
                                                "Gagal mendapatkan lokasi. Pastikan GPS aktif.";
        setLocationError(msg);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [fetchRoute]);

  // ✅ useMemo — mapCenter tidak berubah referensi tiap render
  const mapCenter = useMemo(() =>
    userLocation ? [userLocation.lat, userLocation.lng] : null,
    [userLocation]
  );

  if (isLoading)    return <LoadingScreen />;
  if (locationError) return <ErrorScreen message={locationError} />;

  return (
    <div className="relative h-screen w-full flex flex-col">

      {/* Header */}
      <header className="bg-primary-dark text-white px-5 py-4 flex items-center gap-3 z-50 relative">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="cursor-pointer"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Pilih Lokasi Bank Sampah</h1>
      </header>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer center={mapCenter} zoom={15} className="h-full w-full">
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker user */}
          <Marker position={mapCenter} icon={USER_ICON}>
            <Popup>
              <div className="flex items-center gap-1.5 font-medium text-gray-700">
                <MapPin className="w-4 h-4 text-red-500" />
                Lokasi Kamu
              </div>
            </Popup>
          </Marker>

          {/* Marker semua bank sampah */}
          {bankSampah.map((bank) => (
            <Marker
              key={bank.id}
              position={[bank.lat, bank.lng]}
              icon={bank.id === nearestBank?.id ? NEAREST_ICON : DEFAULT_ICON}
            >
              <Popup>
                <div className="space-y-2 min-w-[140px]">
                  {bank.id === nearestBank?.id && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                      <Navigation className="w-3 h-3" />
                      Terdekat
                    </span>
                  )}
                  <div className="flex items-start">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{bank.nama}</p>
                      <p className="text-xs text-gray-500">{bank.kota}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelect(bank)}
                    className="w-full bg-primary-dark  text-center text-white text-sm px-3 py-2 rounded-lg hover:bg-secondary hover:border-secondary transition"
                  >
                    Pilih Lokasi Ini
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Rute asli dari OSRM */}
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: "#0E5800", weight: 4, dashArray: "1" }}
            />
          )}
        </MapContainer>

        {/* Floating badge bank terdekat */}
        {nearestBank && showBadge && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40 w-[90%] max-w-sm">

            {/* Tombol tutup */}
            <button
              type="button"
              onClick={() => setShowBadge(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Info bank */}
            <div className="flex items-start gap-2 pr-5">
              <Landmark className="w-5 h-5 text-primary-dark mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-primary-dark text-base leading-tight">
                  Bank Sampah Terdekat
                </p>
                <p className="text-gray-700 text-sm mt-0.5">{nearestBank.nama}</p>
                <p className="text-xs text-gray-400">{nearestBank.kota}</p>
              </div>
            </div>

            {/* Jarak */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-600">
              <Navigation className="w-3.5 h-3.5 text-primary" />
              Jarak: <b className="text-primary-dark ml-0.5">{distanceKm.toFixed(2)} km</b>
            </div>

            {/* ETA */}
            <div className="mt-2 grid grid-cols-3 gap-2">
              <ETAItem icon={Footprints} label="Jalan" value={etaWalk}  />
              <ETAItem icon={Bike} label="Motor" value={etaMotor} />
              <ETAItem icon={Car} label="Mobil" value={etaCar}   />
            </div>

            {/* Tombol pilih */}
            <button
              onClick={() => onSelect(nearestBank)}
              className="mt-3 w-full bg-primary-dark  text-center text-white font-semibold text-sm px-3 py-2 rounded-lg hover:bg-secondary hover:border-secondary transition"
            >
              Pilih Lokasi Terdekat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
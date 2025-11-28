"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo } from "react";

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: "/file.svg", // Using a placeholder for now, ideally use a custom pin
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "custom-marker-icon"
});

interface MapProps {
    properties: any[];
    highlightedId: string | null;
}

// Mock coordinates for Metropolis (New York-ish)
const CENTER: [number, number] = [40.7128, -74.0060];

const COORDINATES: Record<string, [number, number]> = {
    "1": [40.7128, -74.0060], // Downtown
    "2": [40.7064, -74.0094], // Financial District
    "3": [40.7209, -74.0007], // Arts District (SoHo-ish)
    "4": [40.7831, -73.9712], // Uptown
    "5": [40.7589, -73.9851], // Tech Hub (Times Square-ish)
    "6": [40.7308, -74.0025], // Old Town (Village)
};

export default function Map({ properties, highlightedId }: MapProps) {
    return (
        <MapContainer
            center={CENTER}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full rounded-2xl"
            style={{ background: "#242f3e" }} // Dark background to match theme
        >
            {/* Dark Matter Tile Layer for Premium Look */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {properties.map((property) => (
                <MapMarker
                    key={property.id}
                    property={property}
                    isHighlighted={highlightedId === property.id}
                />
            ))}
        </MapContainer>
    );
}

// Extract Marker to a separate component to handle icon memoization
function MapMarker({ property, isHighlighted }: { property: any, isHighlighted: boolean }) {
    const position = COORDINATES[property.id] || CENTER;

    // Memoize the icon to prevent recreation on every render
    const customIcon = useMemo(() => {
        return L.divIcon({
            className: "custom-pin",
            html: `<div style="
                background-color: ${isHighlighted ? '#FF5733' : '#008080'};
                width: ${isHighlighted ? '32px' : '24px'};
                height: ${isHighlighted ? '32px' : '24px'};
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
            "></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    }, [isHighlighted]);

    return (
        <Marker position={position} icon={customIcon}>
            <Popup className="custom-popup">
                <div className="flex flex-col gap-2 p-1">
                    <span className="font-bold text-gray-900">{property.title}</span>
                    <span className="font-medium text-[var(--color-primary)]">
                        ${property.price} / night
                    </span>
                </div>
            </Popup>
        </Marker>
    );
}

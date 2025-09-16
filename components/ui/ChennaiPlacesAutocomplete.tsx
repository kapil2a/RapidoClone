"use client";

import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const DEFAULT_API_KEY = "AIzaSyC-xzChxgk7oqPMq3RJUuYZNo559xEcz98";

// Utility hook to get Chennai bounds safely on client
function useChennaiBounds() {
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google?.maps) {
      const b = new google.maps.LatLngBounds(
        new google.maps.LatLng(12.8000, 80.0000), // SW
        new google.maps.LatLng(13.2500, 80.3500)  // NE
      );
      setBounds(b);
    }
  }, []);

  return bounds;
}

export type SelectedPlace = {
  address: string;
  lat: number;
  lng: number;
};

type PlacesFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (place: SelectedPlace) => void;
  options?: google.maps.places.AutocompleteOptions;
};

function PlacesField({ label, value, onChange, onSelect, options }: PlacesFieldProps) {
  const acRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback((ac: google.maps.places.Autocomplete) => {
    acRef.current = ac;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (!acRef.current) return;
    const place = acRef.current.getPlace();
    if (!place || !place.geometry?.location) return;

    const address = place.formatted_address || place.name || value;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    onChange(address);
    onSelect({ address, lat, lng });
    console.log(`${label} selected:`, { address, lat, lng });
  }, [label, onChange, onSelect, value]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-f1-red w-5 h-5" />
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={options}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
            placeholder={`Search ${label.toLowerCase()}`}
          />
        </Autocomplete>
      </div>
    </div>
  );
}

type ChennaiPlacesAutocompleteProps = {
  apiKey?: string;
  onPickupSelected?: (data: SelectedPlace) => void;
  onDestinationSelected?: (data: SelectedPlace) => void;
};

export default function ChennaiPlacesAutocomplete({
  apiKey,
  onPickupSelected,
  onDestinationSelected,
}: ChennaiPlacesAutocompleteProps) {
  const libraries = useMemo(() => ["places"] as ("places")[], []);
  const googleMapsApiKey =
    apiKey || (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) || DEFAULT_API_KEY;

  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey, libraries });
  const bounds = useChennaiBounds();

  const options: google.maps.places.AutocompleteOptions | undefined = useMemo(() => {
    if (!bounds) return undefined;
    return {
      bounds,
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "geometry", "name", "place_id"],
      strictBounds: true,
      types: ["geocode"],
    };
  }, [bounds]);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  if (loadError) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-red-400">Failed to load Google Maps. Check your API key.</div>
        <input
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Pickup Location"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Drop Location"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-400">
        Loading maps...
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 w-full">
      <PlacesField
        label="Pickup Location"
        value={pickup}
        onChange={setPickup}
        onSelect={(data) => onPickupSelected?.(data)}
        options={options}
      />
      <PlacesField
        label="Drop Location"
        value={destination}
        onChange={setDestination}
        onSelect={(data) => onDestinationSelected?.(data)}
        options={options}
      />
    </div>
  );
}

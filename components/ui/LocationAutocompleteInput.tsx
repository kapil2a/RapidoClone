"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

export type SelectedPlace = {
  address: string;
  lat: number;
  lng: number;
};

type LocationAutocompleteInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (place: SelectedPlace) => void;
  apiKey?: string;
  disabled?: boolean;
  className?: string;
};

export function LocationAutocompleteInput({
  label,
  placeholder = "Enter location",
  value,
  onChange,
  onSelect,
  apiKey,
  disabled,
  className = "",
}: LocationAutocompleteInputProps) {
  const libraries = useMemo(() => ["places"] as ("places")[], []);
  const googleMapsApiKey = apiKey || (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  // Use `any` for Google objects to avoid requiring @types/google.maps
  const acRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePlaceChanged = useCallback(() => {
    if (!acRef.current) return;
    const place: any = acRef.current.getPlace?.();
    if (!place || !place.geometry?.location) return;

    const formatted = place.formatted_address || place.name || value;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    if (formatted) onChange(formatted);
    onSelect({ address: formatted || "", lat, lng });
  }, [onChange, onSelect, value]);

  const onLoad = useCallback((ac: any) => {
    acRef.current = ac;
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-f1-red w-5 h-5" />
        {loadError && (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
            placeholder={placeholder}
          />
        )}
        {!loadError && (
          isLoaded ? (
            <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-f1-red focus:border-transparent"
                placeholder={placeholder}
              />
            </Autocomplete>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
              placeholder="Loading maps..."
            />
          )
        )}
      </div>
    </div>
  );
}

export function PickupLocationInput({
  value,
  onChange,
  onSelect,
  apiKey,
  disabled,
  className,
}: Omit<LocationAutocompleteInputProps, "label" | "placeholder">) {
  return (
    <LocationAutocompleteInput
      label="Pickup Location"
      placeholder="Search pickup location"
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      apiKey={apiKey}
      disabled={disabled}
      className={className}
    />
  );
}

export function DestinationLocationInput({
  value,
  onChange,
  onSelect,
  apiKey,
  disabled,
  className,
}: Omit<LocationAutocompleteInputProps, "label" | "placeholder">) {
  return (
    <LocationAutocompleteInput
      label="Drop Location"
      placeholder="Search destination"
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      apiKey={apiKey}
      disabled={disabled}
      className={className}
    />
  );
}

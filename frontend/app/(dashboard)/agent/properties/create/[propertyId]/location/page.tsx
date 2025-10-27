"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Country, State, City } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useFormContext } from "../FormContext";

// ✅ Schema validation
const locationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State / Province is required"),
  city: Yup.string().required("City is required"),
});

export default function LocationForm() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(locationSchema),
  });

  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const propertyId = params.propertyId;
  const { state, dispatch } = useFormContext();
  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const newCities = City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode
      );
      setCities(newCities);
    }
  }, [selectedState]);

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    dispatch({ type: "UPDATE_LOCATION", payload: data });
    startTransition(() => {
      router.push(`/agent/properties/create/${propertyId}/pricing`);
    });
  };

  console.log({ state });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto">
      <div className="max-w-lg mx-auto">
        {/* Country */}
        <div>
          <label className="block text-sm font-medium">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  const country = countries.find((c) => c.isoCode === value);
                  setSelectedCountry(country);
                  setSelectedState(null);
                  setCities([]);
                  setValue("country", country?.name || "");
                  setValue("state", "");
                  setValue("city", "");
                  field.onChange(country?.name);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* State */}
        {states.length > 0 && (
          <div>
            <label className="block text-sm font-medium">
              State / Province
            </label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    const state = states.find((s) => s.isoCode === value);
                    setSelectedState(state);
                    setCities([]);
                    setValue("state", state?.name || "");
                    setValue("city", "");
                    field.onChange(state?.name);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        )}

        {cities.length > 0 && (
          <div>
            <label className="block text-sm font-medium">City</label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    setValue("city", value);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between px-4 py-5">
        <Button>Prev</Button>
        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

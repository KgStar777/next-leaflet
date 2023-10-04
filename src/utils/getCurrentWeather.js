import { useAsuncRequest } from "@hooks/useAsuncRequest";
import { useEffect, useState } from "react";

const url = (queryParams) => `/api/weather?q=${queryParams}`;

export async function getCurrentWeather(latlng) {
  console.log("latlng for weather: ", latlng);
  const { result, error, loading } = await useAsuncRequest({
    getUrl: url, params: `${latlng?.[0]},${latlng?.[1]}`
  });

  console.log("getCurrentWeather", { result, error, loading });
  
  // useEffect(() => {
  //   if (latlng) {
      
      
  //   }
  // }, [latlng]);
}
// functions/api/weather.ts
// Replaces OpenWeatherMap WordPress widget
// KV-cached — refreshes every 30 min

interface Env {
  CACHE: KVNamespace;
  OPENWEATHERMAP_API_KEY: string;
  OPENWEATHERMAP_LOCATION_ID: string;
}

const CACHE_KEY = 'weather:current';
const CACHE_TTL = 1800; // 30 minutes

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=1800',
    'Access-Control-Allow-Origin': '*',
  };

  // Try KV cache first
  try {
    const cached = await env.CACHE.get(CACHE_KEY);
    if (cached) {
      return new Response(cached, { headers });
    }
  } catch {}

  const apiKey = env.OPENWEATHERMAP_API_KEY;
  const locationId = env.OPENWEATHERMAP_LOCATION_ID || '2643743'; // London

  if (!apiKey) {
    return Response.json({
      name: 'London',
      temp: 18,
      description: 'Partly cloudy',
      icon: '02d',
      humidity: 65,
      wind: 12,
    }, { headers });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${locationId}&appid=${apiKey}&units=metric`
    );
    const data: any = await res.json();

    const weather = {
      name: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed),
    };

    const body = JSON.stringify(weather);

    // Store in KV
    try {
      await env.CACHE.put(CACHE_KEY, body, { expirationTtl: CACHE_TTL });
    } catch {}

    return new Response(body, { headers });
  } catch (err) {
    return Response.json({ error: 'Weather unavailable' }, { status: 503, headers });
  }
};

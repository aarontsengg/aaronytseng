// lib/spotify.ts
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Spotify token error: ${res.status} ${await res.text()}`);
  return res.json() as Promise<{ access_token: string }>;
}

export async function getNowPlayingOrRecent() {
  const { access_token } = await getAccessToken();

  // Try currently playing
  let res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status === 202) {
    // Fallback to most recent
    const recent = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });
    if (!recent.ok) throw new Error(`Spotify recent error: ${recent.status} ${await recent.text()}`);

    const data = await recent.json();
    const item = data?.items?.[0]?.track;
    if (!item) return { is_playing: false, item: null };

    return {
      is_playing: false,
      item: {
        name: item.name,
        artists: item.artists?.map((a: any) => a.name) ?? [],
        albumImageUrl: item.album?.images?.[0]?.url ?? "",
        externalUrl: item.external_urls?.spotify ?? "",
      },
    };
  }

  if (!res.ok) throw new Error(`Spotify now playing error: ${res.status} ${await res.text()}`);
  const json = await res.json();
  const track = json?.item;
  if (!track) return { is_playing: false, item: null };

  return {
    is_playing: Boolean(json?.is_playing),
    item: {
      name: track.name,
      artists: track.artists?.map((a: any) => a.name) ?? [],
      albumImageUrl: track.album?.images?.[0]?.url ?? "",
      externalUrl: track.external_urls?.spotify ?? "",
    },
  };
}

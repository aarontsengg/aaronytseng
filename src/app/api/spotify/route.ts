import { NextResponse } from "next/server";
import { getNowPlayingOrRecent } from "@/app/lib/spotify";

export const revalidate = 0; 
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getNowPlayingOrRecent();
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

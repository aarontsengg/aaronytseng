import { NextResponse } from "next/server";
import { getNowPlayingOrRecent } from "@/app/lib/spotify";

export const revalidate = 0; 
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getNowPlayingOrRecent();
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "unknown error" }, { status: 500 });
  }
}

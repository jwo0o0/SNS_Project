import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const isLogin = cookieStore.get("isLogin")?.value === "true";
  return NextResponse.json({ isLogin });
}

import { NextResponse } from "next/server";
import { createAdminToken, setAdminCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin belum dikonfigurasi." }, { status: 500 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Password salah." }, { status: 401 });
    }

    const token = await createAdminToken();
    await setAdminCookie(token);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}

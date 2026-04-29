import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// secret key buat jwt, ambil dari env kalo ga ada pake default aja
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "revoloop-secret-key-123");
const ADMIN_SECRET = new TextEncoder().encode(process.env.ADMIN_PASSWORD || "admin123");

// token user 7 hari, admin 1 hari aja biar ga riskan
const TOKEN_AGE = 60 * 60 * 24 * 7; 
const ADMIN_TOKEN_AGE = 60 * 60 * 24; 

// nge-hash password biar aman di db
export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

// buat cek pas login
export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// bikin token jwt user
export async function signUserToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// verifikasi token bener apa kagak
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

// ambil data user dari cookies (server side)
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("revoloop_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// simpen token ke cookie
export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set("revoloop_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, 
    path: "/",
  });
}

// hapus cookie pas logout
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("revoloop_token");
}

// bikin token khusus buat admin
export async function createAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(ADMIN_SECRET);
}

// cek apa session admin masih aktif
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("revoloop_admin_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

// taro token admin ke cookie
export async function setAdminCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set("revoloop_admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, 
    path: "/",
  });
}

// logout admin
export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("revoloop_admin_token");
}

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateResetToken(email: string): string {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyResetToken(token: string): { email: string } {
  return jwt.verify(token, JWT_SECRET) as { email: string };
}

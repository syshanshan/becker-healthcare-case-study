import type { ApiErrorBody, ApiResponse } from "../types";

/** Dev default uses Vite proxy: /api/assets → localhost:3000/assets */
export const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  const body = (await res.json()) as ApiResponse<T> | ApiErrorBody;

  if (!res.ok) {
    const message =
      "error" in body && typeof body.error === "string"
        ? body.error
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return (body as ApiResponse<T>).data;
}

export async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = (await res.json()) as ApiResponse<T> | ApiErrorBody;

  if (!res.ok) {
    const message =
      "error" in body && typeof body.error === "string"
        ? body.error
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return (body as ApiResponse<T>).data;
}

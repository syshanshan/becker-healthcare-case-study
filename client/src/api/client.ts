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

async function readJsonBody<T>(
  res: Response
): Promise<ApiResponse<T> | ApiErrorBody> {
  const text = await res.text();
  if (!text.trim()) {
    throw new ApiError(
      res.ok
        ? "Server returned an empty response"
        : `Request failed (${res.status})`,
      res.status
    );
  }

  try {
    return JSON.parse(text) as ApiResponse<T> | ApiErrorBody;
  } catch {
    throw new ApiError("Invalid JSON response from server", res.status);
  }
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  const body = await readJsonBody<T>(res);

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
  const body = await readJsonBody<T>(res);

  if (!res.ok) {
    const message =
      "error" in body && typeof body.error === "string"
        ? body.error
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return (body as ApiResponse<T>).data;
}

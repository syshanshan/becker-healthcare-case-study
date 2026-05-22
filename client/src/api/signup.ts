import { postJson } from "./client";
import type { Person, SignUpPayload } from "../types";

export interface SignupRequest {
  person: Omit<Person, "id">;
}

export function postSignup(
  assetId: string,
  person: SignupRequest["person"]
): Promise<SignUpPayload> {
  return postJson<SignUpPayload>(`/assets/${assetId}/signup`, { person });
}

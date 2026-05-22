export function signupParentFromPath(from: string): { label: string; to: string } {
  const normalized = from.trim() || "/assets";
  const pathname = normalized.split("?")[0] || "/";

  if (pathname === "/" || pathname === "") {
    return { label: "Home", to: normalized };
  }

  return { label: "Asset Library", to: normalized };
}

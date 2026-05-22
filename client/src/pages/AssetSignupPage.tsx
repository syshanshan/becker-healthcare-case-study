import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchAsset } from "../api/assets";
import { ApiError } from "../api/client";
import { postSignup } from "../api/signup";
import { AssetSummary } from "../components/assets/AssetSummary";
import { SignupConfirmation } from "../components/signup/SignupConfirmation";
import { SignupBreadcrumb } from "../components/signup/SignupBreadcrumb";
import { SignupForm } from "../components/signup/SignupForm";
import type { LeadGenAsset, SignUpPayload } from "../types";
import { signupParentFromPath } from "../utils/signupBreadcrumb";
import type { SignupFormFields } from "../utils/validation";

type LocationState = { from?: string };

export function AssetSignupPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const listingPath =
    (location.state as LocationState | null)?.from ?? "/assets";
  const parentCrumb = signupParentFromPath(listingPath);

  const [asset, setAsset] = useState<LeadGenAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [signup, setSignup] = useState<SignUpPayload | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setLoadError("Invalid asset link.");
      return;
    }
    const assetId = id;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await fetchAsset(assetId);
        if (!cancelled) setAsset(data);
      } catch (e) {
        if (!cancelled) {
          if (e instanceof ApiError && e.status === 404) {
            setLoadError("This asset could not be found.");
          } else {
            setLoadError(
              e instanceof Error ? e.message : "Could not load this asset."
            );
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(fields: SignupFormFields) {
    if (!id) return;
    setSubmitError(null);
    try {
      const result = await postSignup(id, fields);
      setSignup(result);
    } catch (e) {
      if (e instanceof ApiError) {
        setSubmitError(e.message);
      } else {
        setSubmitError(
          e instanceof Error ? e.message : "Registration failed. Please try again."
        );
      }
    }
  }

  return (
    <div className="signup-page">
      <SignupBreadcrumb
        from={listingPath}
        assetName={asset?.name}
        loading={loading && !asset}
      />

      {loading && (
        <div className="signup-page__loading state-panel" role="status">
          <p className="state-panel__text">Loading asset details…</p>
        </div>
      )}

      {!loading && loadError && (
        <div className="state-panel" role="alert">
          <h2 className="state-panel__title">Unable to open registration</h2>
          <p className="state-panel__text">{loadError}</p>
          <Link to={listingPath} className="bh-link state-panel__action">
            Return to {parentCrumb.label}
          </Link>
        </div>
      )}

      {!loading && !loadError && asset && (
        <>
          <header className="signup-page__header">
            <h1 className="signup-page__title">Sign up</h1>
          </header>

          <div className="signup-page__layout">
            <AssetSummary asset={asset} />
            <div className="signup-page__form-panel">
              {signup ? (
                <SignupConfirmation signup={signup} assetName={asset.name} />
              ) : (
                <SignupForm onSubmit={handleSubmit} serverError={submitError} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

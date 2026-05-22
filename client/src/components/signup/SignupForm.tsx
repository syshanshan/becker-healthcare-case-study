import { useState } from "react";
import type { SignupFormFields, SignupFieldErrors } from "../../utils/validation";
import {
  EMPTY_SIGNUP_FORM,
  hasFieldErrors,
  validateSignupForm,
} from "../../utils/validation";

interface SignupFormProps {
  onSubmit: (fields: SignupFormFields) => Promise<void>;
  serverError: string | null;
}

export function SignupForm({ onSubmit, serverError }: SignupFormProps) {
  const [fields, setFields] = useState<SignupFormFields>(EMPTY_SIGNUP_FORM);
  const [errors, setErrors] = useState<SignupFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof SignupFormFields, boolean>>>(
    {}
  );

  function updateField(key: keyof SignupFormFields, value: string) {
    setFields((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key]) {
        const validated = validateSignupForm(next);
        setErrors((errs) => {
          const copy = { ...errs };
          delete copy[key];
          if (validated[key]) copy[key] = validated[key];
          return copy;
        });
      }
      return next;
    });
  }

  function blurField(key: keyof SignupFormFields) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setFields((current) => {
      const validated = validateSignupForm(current);
      setErrors((prev) => ({
        ...prev,
        [key]: validated[key],
      }));
      return current;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    const validated = validateSignupForm(fields);
    setErrors(validated);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      jobTitle: true,
      companyName: true,
    });
    if (hasFieldErrors(validated)) return;

    setSubmitting(true);
    try {
      await onSubmit({
        firstName: fields.firstName.trim(),
        lastName: fields.lastName.trim(),
        email: fields.email.trim(),
        jobTitle: fields.jobTitle.trim(),
        companyName: fields.companyName.trim(),
      });
    } finally {
      setSubmitting(false);
    }
  }

  const field = (
    name: keyof SignupFormFields,
    label: string,
    type: "text" | "email" = "text",
    autoComplete?: string
  ) => {
    const showError = (touched[name] || submitAttempted) && errors[name];
    const err = showError ? errors[name] : undefined;
    const id = `signup-${name}`;
    return (
      <div className={`signup-field${err ? " signup-field--error" : ""}`}>
        <label className="signup-field__label" htmlFor={id}>
          {label}
          <span className="signup-field__required" aria-hidden>
            {" "}
            *
          </span>
        </label>
        <input
          id={id}
          name={name}
          type={type}
          className="signup-field__input"
          value={fields[name]}
          onChange={(e) => updateField(name, e.target.value)}
          onBlur={() => blurField(name)}
          autoComplete={autoComplete}
          aria-invalid={!!err}
          aria-describedby={err ? `${id}-error` : undefined}
          disabled={submitting}
        />
        {err && (
          <span id={`${id}-error`} className="signup-field__error" role="alert">
            {err}
          </span>
        )}
      </div>
    );
  };

  const errorCount = Object.keys(errors).filter(
    (k) => errors[k as keyof SignupFormFields]
  ).length;

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <h2 className="signup-form__title">Your information</h2>
      <p className="signup-form__intro bh-small">
        Fields marked with <span className="signup-field__required">*</span> are
        required. Becker&apos;s Healthcare shares registration details with the
        sponsoring organization.
      </p>

      {submitAttempted && errorCount > 0 && (
        <div className="signup-form__summary" role="alert">
          Please correct {errorCount} field{errorCount === 1 ? "" : "s"} below.
        </div>
      )}

      {serverError && (
        <div className="signup-form__banner" role="alert">
          {serverError}
        </div>
      )}

      <div className="signup-form__grid">
        {field("firstName", "First name", "text", "given-name")}
        {field("lastName", "Last name", "text", "family-name")}
        {field("email", "Work email", "email", "email")}
        {field("jobTitle", "Job title", "text", "organization-title")}
        {field("companyName", "Company name", "text", "organization")}
      </div>

      <button
        type="submit"
        className="bh-btn bh-btn--primary bh-btn--sm asset-card__cta signup-form__submit"
        disabled={submitting}
      >
        {submitting ? "REGISTERING…" : "REGISTER"}
      </button>
    </form>
  );
}

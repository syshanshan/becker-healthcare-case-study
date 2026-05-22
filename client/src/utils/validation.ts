export interface SignupFormFields {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  companyName: string;
}

export type SignupFieldErrors = Partial<Record<keyof SignupFormFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required`;
  return undefined;
}

export function validateSignupForm(
  fields: SignupFormFields
): SignupFieldErrors {
  const errors: SignupFieldErrors = {};

  const firstName = required(fields.firstName, "First name");
  if (firstName) errors.firstName = firstName;

  const lastName = required(fields.lastName, "Last name");
  if (lastName) errors.lastName = lastName;

  const jobTitle = required(fields.jobTitle, "Job title");
  if (jobTitle) errors.jobTitle = jobTitle;

  const companyName = required(fields.companyName, "Company name");
  if (companyName) errors.companyName = companyName;

  const emailTrimmed = fields.email.trim();
  if (!emailTrimmed) {
    errors.email = "Email is required";
  } else if (!EMAIL_RE.test(emailTrimmed)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

export function hasFieldErrors(errors: SignupFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const EMPTY_SIGNUP_FORM: SignupFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  companyName: "",
};

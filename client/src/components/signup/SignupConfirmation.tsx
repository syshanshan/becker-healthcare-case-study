import type { SignUpPayload } from "../../types";

interface SignupConfirmationProps {
  signup: SignUpPayload;
  assetName: string;
}

function formatSignupDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function SignupConfirmation({ signup, assetName }: SignupConfirmationProps) {
  const { person } = signup;

  return (
    <div className="signup-confirmation" role="status">
      <div className="bh-kicker">Confirmed</div>
      <h2 className="signup-confirmation__title">You&apos;re registered</h2>
      <p className="signup-confirmation__lede">
        Thank you, {person.firstName}. Your registration for{" "}
        <strong>{assetName}</strong> is confirmed.
      </p>
      <p className="signup-confirmation__date">
        Registered on {formatSignupDate(signup.signupDate)}
      </p>
      <p className="signup-confirmation__note bh-small">
        A confirmation has been recorded for {person.email}. Becker&apos;s
        Healthcare or the sponsor may follow up with additional materials.
      </p>
    </div>
  );
}

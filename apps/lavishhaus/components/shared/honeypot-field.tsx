import { HONEYPOT_FIELD } from "@/lib/enquiry";

/** Hidden from people and assistive tech; bots that fill every field reveal themselves. */
export function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

import { useState, useCallback, FormEvent } from "react";
import { useUser } from "@/hooks/useUser";

export const LoginForm = () => {
  const { loginWithEmail } = useUser();
  const [email, setEmail] = useState<string>();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email) {
        loginWithEmail(email);
      }
    },
    [email, loginWithEmail]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
      </div>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="name@website.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

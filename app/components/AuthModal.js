"use client";

import { useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import styles from "./AuthModal.module.css";

const LABELS = {
  pt: {
    signIn: "Entrar",
    signUp: "Criar Conta",
    email: "Email",
    password: "Palavra-passe",
    name: "Nome",
    namePlac: "O teu primeiro nome",
    emailPlac: "o@teu.email",
    passwordPlac: "Mínimo 8 caracteres",
    google: "Continuar com Google",
    switchToSignUp: "Não tens conta? Criar conta",
    switchToSignIn: "Já tens conta? Entrar",
    close: "Fechar",
    error: "Ocorreu um erro. Tenta novamente.",
  },
  en: {
    signIn: "Sign In",
    signUp: "Create Account",
    email: "Email",
    password: "Password",
    name: "Name",
    namePlac: "Your first name",
    emailPlac: "your@email.com",
    passwordPlac: "Minimum 8 characters",
    google: "Continue with Google",
    switchToSignUp: "No account? Create one",
    switchToSignIn: "Already have an account? Sign in",
    close: "Close",
    error: "An error occurred. Please try again.",
  },
};

export default function AuthModal({ isOpen, onClose, lang = "pt", onSuccess }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState("signIn"); // "signIn" | "signUp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const l = LABELS[lang] || LABELS.pt;

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signIn") {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      const msg = err.code === "auth/invalid-credential"
        ? (lang === "pt" ? "Email ou palavra-passe incorretos." : "Incorrect email or password.")
        : err.code === "auth/email-already-in-use"
        ? (lang === "pt" ? "Este email já está em uso." : "Email already in use.")
        : l.error;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      onSuccess?.();
      onClose();
    } catch {
      setError(l.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label={l.close}>×</button>

        <div className={styles.header}>
          <div className={styles.logo}>⚡</div>
          <h2 className={styles.title}>{mode === "signIn" ? l.signIn : l.signUp}</h2>
        </div>

        <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          {l.google}
        </button>

        <div className={styles.divider}><span>ou</span></div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === "signUp" && (
            <div className={styles.field}>
              <label htmlFor="auth-name" className={styles.label}>{l.name}</label>
              <input
                id="auth-name"
                type="text"
                className={styles.input}
                placeholder={l.namePlac}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}
          <div className={styles.field}>
            <label htmlFor="auth-email" className={styles.label}>{l.email}</label>
            <input
              id="auth-email"
              type="email"
              className={styles.input}
              placeholder={l.emailPlac}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="auth-password" className={styles.label}>{l.password}</label>
            <input
              id="auth-password"
              type="password"
              className={styles.input}
              placeholder={l.passwordPlac}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "..." : (mode === "signIn" ? l.signIn : l.signUp)}
          </button>
        </form>

        <button className={styles.switchMode} onClick={() => { setMode(mode === "signIn" ? "signUp" : "signIn"); setError(""); }}>
          {mode === "signIn" ? l.switchToSignUp : l.switchToSignIn}
        </button>
      </div>
    </div>
  );
}

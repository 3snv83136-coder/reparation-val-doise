"use client";

import { useState } from "react";
import { PhoneCall, X, User } from "lucide-react";

interface CallbackButtonProps {
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
  className?: string;
}

export function CallbackButton({ variant = "primary", style, className }: CallbackButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleOpen() {
    setOpen(true);
    setSubmitted(false);
    setName("");
    setPhone("");
  }

  const baseStyle: React.CSSProperties =
    variant === "primary"
      ? {
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#F7941D",
          color: "#fff",
          fontWeight: 800,
          padding: "14px 32px",
          borderRadius: 50,
          border: "none",
          fontSize: 17,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(247,148,29,0.3)",
          ...style,
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#fff",
          color: "#F7941D",
          fontWeight: 800,
          padding: "14px 32px",
          borderRadius: 50,
          border: "none",
          fontSize: 17,
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          ...style,
        };

  return (
    <>
      <button onClick={handleOpen} style={baseStyle} className={className}>
        <PhoneCall style={{ height: 20, width: 20 }} />
        Rappel par expert
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 32,
              width: "100%",
              maxWidth: 420,
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                lineHeight: 1,
              }}
              aria-label="Fermer"
            >
              <X style={{ height: 20, width: 20, color: "#718096" }} />
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div
                  style={{
                    height: 64,
                    width: 64,
                    borderRadius: "50%",
                    background: "#F0FFF4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <PhoneCall style={{ height: 30, width: 30, color: "#38A169" }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#2D3748", marginBottom: 8 }}>
                  Demande envoyée !
                </h3>
                <p style={{ color: "#718096", fontSize: 14, lineHeight: 1.6 }}>
                  Un expert vous rappelle dans les{" "}
                  <strong style={{ color: "#F7941D" }}>30 minutes</strong>.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 12,
                      background: "#FFF7ED",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <PhoneCall style={{ height: 22, width: 22, color: "#F7941D" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#2D3748", margin: 0 }}>
                      Rappel par expert
                    </h3>
                    <p style={{ fontSize: 13, color: "#718096", margin: 0 }}>
                      Réponse sous 30 minutes
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#2D3748",
                        marginBottom: 6,
                      }}
                    >
                      Votre nom
                    </label>
                    <div style={{ position: "relative" }}>
                      <User
                        style={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          height: 16,
                          width: 16,
                          color: "#A0AEC0",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        type="text"
                        required
                        placeholder="Prénom et nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: "100%",
                          paddingLeft: 36,
                          paddingRight: 12,
                          paddingTop: 10,
                          paddingBottom: 10,
                          border: "1.5px solid #E2E8F0",
                          borderRadius: 10,
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                          color: "#2D3748",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#2D3748",
                        marginBottom: 6,
                      }}
                    >
                      Votre téléphone
                    </label>
                    <div style={{ position: "relative" }}>
                      <PhoneCall
                        style={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          height: 16,
                          width: 16,
                          color: "#A0AEC0",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="06 XX XX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: "100%",
                          paddingLeft: 36,
                          paddingRight: 12,
                          paddingTop: 10,
                          paddingBottom: 10,
                          border: "1.5px solid #E2E8F0",
                          borderRadius: 10,
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                          color: "#2D3748",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#F7941D",
                      color: "#fff",
                      fontWeight: 800,
                      padding: "14px",
                      borderRadius: 50,
                      border: "none",
                      fontSize: 15,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: "0 4px 16px rgba(247,148,29,0.3)",
                    }}
                  >
                    <PhoneCall style={{ height: 17, width: 17 }} />
                    Être rappelé maintenant
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

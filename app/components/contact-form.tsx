"use client";

import { useState } from "react";

type FormState = {
  status: "idle" | "sending" | "sent";
  errors: { nome?: string; email?: string; mensagem?: string };
};

const initialState: FormState = { status: "idle", errors: {} };

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nome = String(formData.get("nome") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const mensagem = String(formData.get("mensagem") ?? "").trim();

    const errors: FormState["errors"] = {};
    if (!nome) errors.nome = "Digite seu nome.";
    if (!email) errors.email = "Digite seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Confira o formato do e-mail.";
    if (!mensagem) errors.mensagem = "Conte o que você precisa.";

    setState({ status: "idle", errors });

    if (Object.keys(errors).length > 0) return;

    setState({ status: "sending", errors: {} });
    window.setTimeout(() => {
      setState({ status: "sent", errors: {} });
      form.reset();
    }, 800);
  }

  if (state.status === "sent") {
    return (
      <div
        role="status"
        className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 px-6 text-center"
      >
        <p className="font-serif text-2xl">Mensagem enviada.</p>
        <p className="mt-2 text-sm text-zinc-600">
          Respondemos em até 24 horas úteis.
        </p>
      </div>
    );
  }

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 ${
      hasError ? "border-red-500" : "border-zinc-300"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="nome" className="text-sm font-medium">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className={inputClass(state.errors.nome)}
            aria-invalid={!!state.errors.nome}
          />
          {state.errors.nome && (
            <p className="text-sm text-red-600">{state.errors.nome}</p>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            className={inputClass(state.errors.email)}
            aria-invalid={!!state.errors.email}
          />
          {state.errors.email && (
            <p className="text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensagem" className="text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte o que você precisa para o seu negócio."
          className={`${inputClass(state.errors.mensagem)} resize-none`}
          aria-invalid={!!state.errors.mensagem}
        />
        {state.errors.mensagem && (
          <p className="text-sm text-red-600">{state.errors.mensagem}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={state.status === "sending"}
        className="mt-1 flex h-12 min-h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === "sending" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}

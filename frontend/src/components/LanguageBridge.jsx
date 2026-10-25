const languages = {
  "ml-IN": { name: "Malayalam", script: "മലയാളം" },
  "hi-IN": { name: "Hindi", script: "हिन्दी" },
  "ta-IN": { name: "Tamil", script: "தமிழ்" },
};

export default function LanguageBridge({
  targetLanguage,
  state = "loading",
  error = "",
  sourceLanguage = "English",
}) {
  const target = languages[targetLanguage] || { name: "Regional language", script: "Language" };
  const loading = state === "loading";

  return (
    <section
      className={`language-bridge bridge-${state}`}
      aria-live={loading ? "polite" : "assertive"}
      aria-busy={loading}
      aria-label={`${sourceLanguage} to ${target.name} translation status`}
    >
      <div className="bridge-doc source"><span>{sourceLanguage}</span><i /><i /><i /></div>
      <div className="bridge-link" aria-hidden="true"><span /></div>
      <div className="bridge-doc target"><span>{target.name}</span><b lang={targetLanguage}>{target.script}</b></div>
      <div className="bridge-caption">
        <div>
          <strong>{loading ? "Translating legal document" : "Translation could not be completed"}</strong>
          {error && <p role="alert">{error}</p>}
        </div>
        <span>{sourceLanguage} → {target.name}</span>
      </div>
    </section>
  );
}

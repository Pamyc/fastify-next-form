export default function Page() {
  return (
    <div className="card">
      <h1>Fastify + Next.js (TypeScript)</h1>
      <p className="mt-3">Единое приложение: Fastify обслуживает API и хостит Next.js страницы.</p>
      <ul className="mt-3">
        <li>UI: Next.js (App Router)</li>
        <li>API: Fastify → <code>/api/*</code></li>
        <li>Health: <code>/healthz</code></li>
      </ul>
      <p className="mt-3">Для проверки перейди на «Форма» и отправь данные.</p>
    </div>
  );
}

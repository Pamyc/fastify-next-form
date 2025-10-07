import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyNext from '@fastify/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

async function build() {
  const app = Fastify({ logger: true });

  // CORS (можно ограничить origin конкретным доменом)
  await app.register(fastifyCors, { origin: true });

  // Подключаем Next.js через плагин
  await app.register(fastifyNext, { dev: !isProd });

  // API
  app.get('/healthz', async () => ({ status: 'ok', uptime: process.uptime() }));
  app.post('/api/submit', async (request, reply) => {
    const body = (request.body || {}) as { message?: string };
    const msg = (body.message || '').toString().trim();
    return reply.send({ ok: true, message: `Принято: ${msg || 'пусто'}` });
  });

  // Страницы Next
  app.after(() => {
    (app as any).next('/');
    (app as any).next('/form');
    (app as any).next('/_next/*');
    (app as any).next('/**'); // общий вайлдкард
  });

  return app;
}

build()
  .then((app) => {
    app.listen({ port, host }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`🚀 Server ready on ${address} (prod=${isProd})`);
    });
  })
  .catch((err) => {
    console.error('Fatal during bootstrap', err);
    process.exit(1);
  });

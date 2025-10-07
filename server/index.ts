import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyNext from '@fastify/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

async function build() {
  const app = Fastify({
    logger: true,
  });

  // CORS (можно отключить, если один домен)
  await app.register(fastifyCors, { origin: true });

  // Подключаем Next.js через плагин
  await app.register(fastifyNext, { dev: !isProd });

  // Примитивные API-роуты
  app.get('/healthz', async () => ({ status: 'ok', uptime: process.uptime() }));

  app.post('/api/submit', async (request, reply) => {
    const body = (request.body || {}) as { message?: string };
    const msg = (body.message || '').toString().trim();
    return reply.send({ ok: true, message: `Принято: ${msg || 'пусто'}` });
  });

  // Все остальные маршруты отдаём Next (SSR/статик)
  app.after(() => {
    // fastify.next('/*') — wildcard для страниц Next
    (app as any).next('/*');
  });

  return app;
}

build().then(app => {
  app.listen({ port, host }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`🚀 Server ready on ${address} (prod=${isProd})`);
  });
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal during bootstrap', err);
  process.exit(1);
});

# Fastify + Next.js (TypeScript) — Starter

Один сервис на Node.js 18+/22: Fastify (бекенд) + Next.js (фронтенд) в одном приложении.
Готов для деплоя на **Timeweb Cloud → Backend → Fastify (Node.js 22)**.

## Что есть
- **/form** — простая страница с формой (Next.js App Router)
- **POST /api/submit** — обработчик формы (Fastify)
- **/healthz** — health-check

## Запуск в Timeweb Cloud
Переменные окружения (в панели):
```
PORT=3000
NODE_ENV=production
```

Команда запуска:
```
npm run start
```

(Скрипт `prestart` автоматически соберёт Next и сервер TypeScript).

## Локально (опционально)
```bash
npm i
npm run dev    # Fastify+Next dev (через tsx)
# или production:
npm run build
npm run start
```

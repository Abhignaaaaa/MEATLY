import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

async function startServer() {
  console.log(`[Server] Initializing MEATLY Backend API...`);
  
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`[Server] MEATLY API listening at http://localhost:${config.port}/api`);
    console.log(`[Server] Health check available at http://localhost:${config.port}/api/health`);
  });

  const handleShutdown = async (signal: string) => {
    console.log(`[Server] Received ${signal}. Gracefully shutting down MEATLY API...`);
    server.close(async () => {
      await disconnectDatabase();
      console.log('[Server] Shutdown complete.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

startServer().catch((error) => {
  console.error('[Server Fatal Error]', error);
  process.exit(1);
});

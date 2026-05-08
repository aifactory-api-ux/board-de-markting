import 'dotenv/config';
import { app } from './app';
import { config } from '../shared/config';
import { AppDataSource } from './config/db';
import { createInitialAdmin } from './services/authService';

const PORT = config.backend.port;

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    await createInitialAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${config.backend.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
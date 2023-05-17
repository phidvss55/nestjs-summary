import { Server } from 'http';
import express from 'express';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
  }

  return cachedServer;
}

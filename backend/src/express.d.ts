// src/types.d.ts or src/custom.d.ts

import { Request } from 'express'; // Import express types

// Extend the Request interface to include a `user` property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number; // Add any other properties if needed
      };
    }
  }
}

export {};

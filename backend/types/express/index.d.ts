import "express";

declare global {
  namespace Express {
    interface UserPayload {
      email: string;
      role: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}


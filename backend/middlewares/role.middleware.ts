import { Request, Response, NextFunction } from "express";

const authorizeRoles = (...roles: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.token || !req.token.role) { 
        res.status(401).json({ message: "Not authenticated" });
        return;
      }

      const token = req.token;
      console.log("log from authorizeRoles", token);

      const hasRole = roles.some(r => r.toLowerCase() === token.role.toLowerCase());

      if (!hasRole) {
        res.status(403).json({ message: "Forbidden: insufficient role" });
        return;
      }

      next();
    } catch (error) { 
      res.status(500).json({ message: "internal server error", error });
      console.log("error here ma", error);
    }
  };
};

export default authorizeRoles;


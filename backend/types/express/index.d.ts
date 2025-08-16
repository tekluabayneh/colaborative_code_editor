// import "express-serve-static-core";
//
// declare global {
//   namespace Express {
//     interface User {
//       email: string;
//       role: string;
//     }
//   }
// }


import "express";

declare global {
  namespace Express {
    interface Request {
      token?: { email: string; role: string }; 
    }
  }
}

//
// import "express";
// declare global {
//   namespace express {
//     interface  UserPayload {
//       email: string;
//       role: string;
//     }
//
//     interface Request {
//       token?: UserPayload; 
//     }
//   }
// }


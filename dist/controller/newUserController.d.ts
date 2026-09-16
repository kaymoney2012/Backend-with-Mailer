import type { Request, Response } from "express";
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resendOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signin: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=newUserController.d.ts.map
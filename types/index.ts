// types/index.ts - Updated with proper types
export interface User {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface CalculationNode {
  _id: string;
  value: number;
  parentId: string | null;
  operation: "+" | "-" | "*" | "/" | null;
  rightOperand: number | null;
  userId: string;
  username: string;
  createdAt: Date;
  depth: number;
}

export interface AuthUser {
  id: string;
  username: string;
}

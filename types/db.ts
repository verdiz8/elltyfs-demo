// types/db.ts - Update the types
import { ObjectId } from "mongodb";

export interface DbUser {
  _id: ObjectId;
  username: string;
  password: string;
  createdAt: Date;
}

export interface DbCalculationNode {
  _id: ObjectId;
  value: number;
  parentId: ObjectId | null;
  operation: "+" | "-" | "*" | "/" | null;
  rightOperand: number | null;
  userId: ObjectId;
  username: string;
  createdAt: Date;
  depth: number;
}

// Types for inserting (without _id)
export interface InsertCalculationNode {
  value: number;
  parentId: ObjectId | null;
  operation: "+" | "-" | "*" | "/" | null;
  rightOperand: number | null;
  userId: ObjectId;
  username: string;
  createdAt: Date;
  depth: number;
}

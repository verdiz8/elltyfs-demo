# Number Communication – Full Stack Test Assignment

A full-stack one-page application built for the Ellty developer assessment.  
Users “communicate” using numbers: each post is a starting number, and every reply is a mathematical operation applied to the parent value, forming a branching calculation tree.

## Live Demo

https://elltyfs-demo.vercel.app/

## Core Concept

Users create starting numbers, others respond with operations, forming an infinite branching tree.

Example chain:
45 → 63 → 72 → 8 (each step derived from parent value)

## Functional Requirements (All Met)

- ✔ Unregistered users can view, register, log in
- ✔ Registered users can start chains and reply
- ✔ Full calculation logic implemented
- ✔ MongoDB Atlas for persistence
- ✔ Secure authentication, hashed passwords
- ✔ Complete client-server communication protocol

## Tech Stack

- Next.js, React, TypeScript
- MongoDB Atlas
- TailwindCSS
- bcryptjs, HTTP-only cookies

**Note:** MongoDB Atlas is used, so Docker Compose is not required.  
A Docker setup can be added if needed.

## Project Structure

/app (frontend + backend routes)
/api (auth, nodes, tree)
/components  
 /hooks  
/lib  
/types  
README.md

## Data Models

### Node

value, parentId, operation, rightOperand, depth, user info

### User

username, hashed password, createdAt

## 🔌 API Overview

POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/session  
POST /api/auth/logout  
GET /api/tree  
POST /api/nodes

## Tree Rendering

Hierarchical indentation using depth level.

## Authentication

Session stored in httpOnly cookie.

## Notes

Atlas simplifies deployment; Docker optional.

Healthcare Doctor–Patient Translation Web Application
Overview

This is a full-stack healthcare communication platform designed to support conversations between doctors and patients who speak different languages.

The application enables real-time translated chat along with AI-generated medical summaries to improve clarity and reduce misunderstandings in clinical discussions.

The focus of this project was to design a clean, functional architecture that integrates AI services into a practical healthcare use case.

Key Features

Role-based interaction (Doctor and Patient modes)

Real-time multilingual message translation using OpenAI API

Dual message display (original + translated text)

AI-generated structured medical summary including:

Symptoms discussed

Possible diagnoses

Medications mentioned

Suggested follow-up actions

Persistent conversation storage using PostgreSQL

Keyword-based search across previous messages

Responsive UI optimized for desktop and mobile devices

Tech Stack

Frontend

React

TypeScript

Tailwind CSS

Backend

Node.js

Express

REST API architecture

Database

PostgreSQL

AI Integration

OpenAI API for translation and medical summarization

Development & Deployment

Vite

Replit

Architecture Approach

The system is structured with clear separation between frontend, backend, and AI services.

The frontend handles user interaction and renders translated outputs.

The backend manages API routing, OpenAI integration, and database operations.

PostgreSQL is used to persist chat history and enable search functionality.

AI responses are processed server-side before being returned to the client to maintain structured outputs.

Error handling and async processing were implemented to ensure smooth API communication.

Engineering Decisions

Prioritized clarity and usability in the chat interface.

Designed APIs to keep AI-related logic abstracted from the UI layer.

Structured database schema to support message persistence and retrieval.

Focused on maintainable and readable code structure.

Limitations

Authentication is not implemented in the current version.

The system supports a single active conversation flow.

Not intended for production-level medical compliance (demonstration purpose).

Future Improvements

Secure authentication and role-based access control

Multi-session support

Speech-to-text and text-to-speech integration

Advanced medical entity extraction

Enhanced security hardening for real-world deployment

## Live Demo

Application deployed and accessible via:

[Live Application Link](https://health-care-connect--shoaibahmadddev.replit.app)

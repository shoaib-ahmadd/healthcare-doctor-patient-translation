# Healthcare Doctor–Patient Translation Web Application

## Project Overview
This project is a full-stack web application designed to bridge communication gaps between doctors and patients who speak different languages. It provides a real-time chat interface with AI-powered translation and medical summarization to support clearer and safer healthcare conversations.

The goal of this assignment was not to build a production-ready system, but to demonstrate problem-solving, architectural decision-making, and effective use of AI tools under time constraints.

---

## Features Implemented
- **Role-Based Interaction**  
  Two roles — Doctor and Patient — with the ability to switch roles during a session.

- **AI-Powered Text Translation**  
  Messages sent by one role are translated into the selected language of the other role.

- **Dual Message Display**  
  Both the original text and translated output are shown for clarity and verification.

- **Medical Conversation Summary**  
  An AI-generated summary highlighting:
  - Symptoms  
  - Possible diagnoses  
  - Medications mentioned  
  - Follow-up actions  

- **Conversation Persistence**  
  Chat history is stored in a database and remains available across page reloads.

- **Conversation Search**  
  Keyword-based search across previous messages.

- **Responsive UI**  
  Mobile-friendly interface for use on different devices.

---

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS  
- **Backend**: Node.js, Express  
- **Database**: PostgreSQL  
- **AI / LLM**: OpenAI API  
- **Tooling & Build**: Vite, Replit

---

## AI Tools and Resources Used
- **OpenAI API** for translation and summarization
- **Replit AI** for rapid scaffolding and deployment setup
- **ChatGPT** for architectural guidance, prompt refinement, and documentation support

AI tools were used to accelerate development, while feature prioritization, trade-offs, and overall design decisions were made intentionally.

---

## Trade-offs and Limitations
- **Audio Support**:  
  Audio recording and speech-to-text were planned but deprioritized to focus on core translation and summarization features within the limited timeframe.

- **Authentication**:  
  The application does not include user authentication. In a production healthcare system, authentication and authorization would be mandatory.

- **Single Conversation Scope**:  
  The current implementation focuses on a single conversation flow rather than managing multiple concurrent sessions.

- **Security & Compliance**:  
  This project is a technical demonstration and is not intended to be HIPAA-compliant in its current form.

---

## Future Improvements
- Secure authentication and role-based access control  
- Audio input/output using speech-to-text and text-to-speech  
- Support for multiple concurrent doctor–patient sessions  
- Enhanced medical entity extraction  
- Integration with Electronic Health Record (EHR) systems

---

## Conclusion
This project demonstrates how AI can be leveraged to improve cross-language communication in healthcare settings. The focus was on building a clear, functional, and explainable system while making conscious trade-offs due to time constraints.

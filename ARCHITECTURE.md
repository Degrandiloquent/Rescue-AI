# RescueAI Architecture Diagram

## System Overview

## Architecture Components

### Core Layers
1. **User Interface** - Voice and text input application
2. **Frontend App** - Web and mobile UI handling user interactions
3. **Backend API** - Central processing engine (Node.js/Python)
4. **AI Agent** - Google Gemini for intelligent decision-making

### External Services
- **Speech-to-Text**: Converts voice input to text for processing
- **Maps Platform**: Locates nearby hospitals and emergency services
- **Text-to-Speech**: Converts responses back to voice for user

### Data & Notifications
- **Incident Database**: Firebase for storing incident records
- **Notifications**: SMS/Email alerts for emergency updates



    System Architecture
                ┌─────────────────────┐
                │        User         │
                │  Voice / Text App  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     Frontend App    │
                │  (Web / Mobile UI)  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      Backend API    │
                │  (Node.js / Python) │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      AI Agent       │
                │   Google Gemini     │
                └──────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ Speech-to-Text│  │  Maps Platform│  │   Text-to-    │
│   (Voice →    │  │ (Hospitals &  │  │   Speech      │
│    Text)      │  │  Location)    │  │ (Voice Reply) │
└───────────────┘  └───────────────┘  └───────────────┘
        │                                   │
        ▼                                   ▼
 ┌───────────────┐                  ┌───────────────┐
 │ Incident DB   │                  │ SMS / Email   │
 │ (Firebase)    │                  │ Notifications │
 └───────────────┘                  └───────────────┘
```




---
## Jayson Paylod
{
  "incidentType": "Explosion",
  "victims": 15,
  "location": "Sports Field",
  "severity": "Mass Casualty",
  "reporterName": "Bongiwe Nxumalo",
  "reporterPhone": "+27827644047",
  "reporterEmail": "bongiwenxumalo54@gmail.com"
}

Case ID Format: ER-XXXXX (Example: ER-20451)
Tracking URL: https://rescueai.app/track/ER-20451

## Backend Endpoints
Endpoint	Method	Purpose
/api/report-emergency	POST	Receive AI JSON, generate Case ID, store, send SMS/email
/api/track/:caseID	GET	Return incident status
/api/sms-query	POST	Respond to SMS tracking queries

## Notifications

SMS:

RescueAI Emergency Report Received
Case ID: ER-20451
Incident: Explosion
Track: https://rescueai.app/track/ER-20451

Email:

Subject: Emergency Report Confirmation
Your report has been received.
Case ID: ER-20451
Incident: Explosion
Victims: 15
Track: https://rescueai.app/track/ER-20451

##Frontend Screens

Home: Report Emergency | ⌨ Type Emergency

Voice Capture: live transcription

Dashboard: incident type, victims, first aid, hospitals

Tracking: status, ETA, responders

## Demo Script

Press Report Emergency → speak incident

AI extracts data → sends JSON → backend

Backend: generates Case ID → stores → sends SMS/email

Dashboard shows incident + triage + hospitals

Show tracking via link/SMS query

 ##Git Project Structure
rescue-ai/
├─ frontend/           # UI & voice capture
├─ backend/            # API & services
│  ├─ routes/          # Emergency, tracking, notifications
│  ├─ services/        # AI, SMS, Email, Maps
│  └─ database/        # Firebase integration
├─ prompts/            # AI prompt configuration
├─ docs/               # Architecture diagrams
└─ README.md           # Project documentation

*Last Updated: March 6, 2026*

# Scrum Poker Web UI  

A real-time web-based **Scrum Poker** application built with **Next.js**. This app allows users to create or join sessions, vote on story points, and collaborate effectively in agile planning meetings.  

---

## Features  

### 🌟 Core Functionalities  
- **Room Management:**  
  - Create or join rooms using unique IDs.  
  - Share room IDs with participants for easy access.  

- **Real-Time Updates:**  
  - User join/leave notifications update the participant list dynamically. 
  - Real-time status updates to indicate whether voting results are revealed.
  - Story point voting is updated instantly for all participants.

- **Interactive User Interface:**  
  - Smooth animations with TailwindCSS.  

---

### 🔄 SignalR Real-Time Communication  
- **Key Events:**  
  1. UserJoined: Notifies the server when a user joins a session.
  2. ActiveUsers: Retrieves the active participant list from the server and updates it dynamically.
  3. UserLeft: Handles user departure and updates the participant list.
  4. UserLeft: Handles user departure and updates the participant list.
  5. GetShowEstimateNotify: Synchronizes the state of vote visibility across all participants.

---

## 🚀 Technology Stack  

| Technology      | Usage                       |
|------------------|-----------------------------|
| **Next.js**     | Frontend framework          |
| **TailwindCSS** | Styling and animations      |
| **SignalR**     | Real-time communication     |


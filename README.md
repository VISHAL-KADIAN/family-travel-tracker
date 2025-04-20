
---

# Family Travel Tracker App

Developed a full-stack **Family Travel Tracker App** to help families collaboratively log, monitor, and share their travel experiences. Built using **React.js**, **Node.js**, **Express.js**, and **MongoDB** to ensure a responsive user interface and scalable backend architecture.

##  Features

* Real-time activity logging for family members  
* Trip creation, editing, and deletion  
* Location tagging and map integration for travel history  

## Technology Stack

* **Backend:** Node.js, Express.js  
* **Database:** PostgreSQL  
* **Templating Engine:** EJS  
* **Middleware:** Body-parser  


## Architecture Overview

### 1. Authentication & Authorization

* **Purpose:** Handles user registration, login, and access management  
* **Technology:** JWT for secure token-based authentication  

### 2. Trip Management

* **Purpose:** CRUD operations for travel entries, media uploads, and tagging  
* **Technology:** Node.js, Express.js, MongoDB (Mongoose ODM)  

### 3. Activity Feed

* **Purpose:** Real-time updates of family travel logs and comments  

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd family-travel-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
3. **Start the backend server**
   ```bash
   npm start
   ```

4. **(Optional) Set up and build the React frontend**
   ```bash
   cd client
   npm install
   npm run build
   ```

##  Future Improvements

* Offline mode with local storage sync  
* Enhanced analytics for travel trends  
* Integration with Google Maps API for route previews  

---

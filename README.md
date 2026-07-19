# 🗺️ MapMinds

MapMinds is an AI-powered smart travel itinerary planner designed to transform how travelers explore the world. By combining real-time web data with lightning-fast artificial intelligence, MapMinds creates hyper-personalized, up-to-date, and optimized travel itineraries in seconds.

Built for the modern traveler, it eliminates hours of manual research by curating the best routes, local attractions, dining spots, and hidden gems based on individual preferences.

---

## 🚀 Core Features

*   **Real-Time Data Integration:** Uses **Tavily Search API** to fetch live local events, operational hours, weather constraints, and recent travel updates.
*   **Lightning-Fast AI Generation:** Powered by **Groq Cloud (LLaMA-3)** to process user preferences and generate structured itineraries in milliseconds.
*   **Smart Routing & Categorization:** Automatically groups activities by location, mood (Adventure, Cultural, Relaxation), and optimal time of the day.
*   **Budget & Duration Adjustments:** Dynamically adapts the pacing and recommendations based on the user's timeframe and budget constraints.

---

## 🛠️ Tech Stack

*   **Frontend:** React / Next.js, Tailwind CSS, DaisyUI / Shadcn UI
*   **Backend:** Node.js, Express
*   **Database:** MongoDB (MERN Stack)
*   **AI Inference:** Groq Cloud SDK (`groq-sdk`)
*   **Search Engine:** Tavily API

---

## ⚙️ Architecture Flow

1. **User Input:** The user provides destination, duration, budget, and interests (e.g., "7 Days in Swiss Alps, adventure focus").
2. **Context Gathering (Tavily):** MapMinds queries Tavily to gather fresh, real-time data about the destination, current local highlights, and ticket prices.
3. **Intelligence Layer (Groq):** The raw web context and user preferences are fed into Groq's high-speed LLM engine with a highly optimized prompt structure.
4. **Structured Output:** Groq returns a clean JSON payload containing the breakdown of days, spots, estimated costs, and travel tips.
5. **UI Rendering:** The frontend maps the data into beautiful interactive timeline cards.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js installed and API keys ready for:
*   [Groq Cloud Console](https://console.groq.com/)
*   [Tavily AI](https://tavily.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/mapminds.git](https://github.com/yourusername/mapminds.git)
   cd mapminds
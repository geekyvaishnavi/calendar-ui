# Wall Calendar UI

##  Source Code  
GitHub Repository:  
👉 https://github.com/geekyvaishnavi/calendar-ui  

---

##  Overview  
This project is an interactive wall-style calendar built using React.  
It focuses on translating a static calendar design into a functional, responsive, and intuitive UI with smooth interactions and a clean visual hierarchy.

---

##  Key Features  

### Calendar
- Monthly calendar view with proper date alignment  
- Click or drag to select date ranges  
- Today highlight with quick navigation  

### Notes System
- Add notes to a single day or a selected date range  
- Range notes apply to all selected days  
- Edit notes per day independently  
- Supports overlapping notes  
- Data persisted using `localStorage`  

### UI / UX
- Clean wall-calendar inspired design  
- Smooth animations for transitions  
- Minimal and distraction-free interface  
- Responsive across all screen sizes  

---

##  Tech Stack  

- React (Vite)  
- Tailwind CSS  
 

---

##  Project Structure  

```
src/
├── components/
│   ├── CalendarGrid.jsx
│   ├── HeroSection.jsx
│   ├── NotesSection.jsx
│   ├── SpiralBinding.jsx
│   └── WallCalendar.jsx
├── hooks/
│   ├── useCalendar.js
│   └── useNotes.js
├── constants/
│   └── calendar.js
```

---

##  How to Run Locally  

### 1. Clone the repository  
```bash
git clone https://github.com/geekyvaishnavi/calendar-ui.git
cd calendar-ui
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Start development server  
```bash
npm run dev
```

### 4. Open in browser  
```
http://localhost:3000
```

---

##  Design Decisions  

- **Range-based note system**  
  Allows assigning notes across multiple days using date intervals.

- **Local state + localStorage**  
  Keeps the app lightweight while preserving user data.

- **Component-based architecture**  
  Clear separation of concerns for scalability and maintainability.

- **Minimal UI approach**  
  Focused on clarity, spacing, and smooth interaction.

---


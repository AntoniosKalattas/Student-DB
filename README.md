# ST-Dashboard

A sleek and interactive **Student Dashboard** built with **Electron**, **Bootstrap**, and **Chart.js**. This dashboard helps students keep track of their study habits, break hours, assignments, projects, sleep data, and more.

## Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Screenshots](#screenshots)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Folder Structure](#folder-structure)  
7. [Contributing](#contributing)  
8. [License](#license)

---

## Overview
**ST-Dashboard** is designed for students who want an all-in-one platform to manage their daily grind hours, break hours, assignments, projects, and other academic metrics. By combining **Bootstrap** icons and styles with **Chart.js**, it provides an at-a-glance view of important data, such as:

- Average sleep time  
- Grade performance  
- Daily/Monthly grind and break analytics  
- Completed assignments and projects  

All these are wrapped into a user-friendly interface with modals, charts, and dynamic counters.

---

## Features

1. **Health Tracking**  
   - Displays **Sleep Hours** in a chart for easy visualization.
   
2. **Grind and Break Management**  
   - Interactive **Grind** and **Break** buttons with built-in timers.  
   - A **Grind Chart** that logs study hours, break hours, and compares sleep data.

3. **Assignments and Projects**  
   - Track the number of **active assignments** and **active projects**.  
   - Increment and decrement counters with plus and minus icons.  
   - **Completed Assignments** and **Completed Projects** displayed separately.

4. **Grades**  
   - Add or update grades and view them in a **Grade performance** chart.

5. **Timers and Scheduling**  
   - A built-in countdown for **Days Until Next Break**.

6. **Responsive Sidebar Navigation**  
   - A collapsible sidebar with categories (Health, Grind, Goals).  
   - Mobile-friendly menu toggles.

7. **Bootstrap Integration**  
   - Uses the latest **Bootstrap 5** features for modals, buttons, and layout.

8. **Interactive Modals**  
   - Collect numeric input for tasks like grades or goal setting.

---

## Screenshots


![alt text](https://github.com/AntoniosKalattas/ST-Dashboard/blob/main/img/Screenshot%202024-12-31%20at%207.53.44%E2%80%AFPM.png)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/st-dashboard.git
   cd st-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development**:
   ```bash
   npm start
   ```
   This will start the Electron app and open the **ST-Dashboard** window.

4. **(Optional) Build the application**:
   If you’d like to package the application into an executable:
   ```bash
   npm run build   # or npx electron-builder
   ```
   The final application files will be in the `dist` or `build` folder (depending on your setup).

---

## Usage

1. **Launch the App**:  
   After running `npm start`, a new **Electron** window will open showing the dashboard.

2. **Navigating the Sidebar**:  
   - **Health**: View or log sleep hours.  
   - **Grind**: Track study hours, add break hours.  
   - **Goals**: (Future development) A placeholder for personal or academic goals.  
   - **Add Grades**: Opens a modal to input grades which appear in the **Grade performance** chart.

3. **Using Timers**:  
   - **Study** and **Break** buttons start timers for accountability.  
   - The labeled counters show elapsed time.

4. **Charts**:  
   - **SleepChart**: Displays average sleep time.  
   - **GradePerformance**: Displays user-input grades as a bar/line chart.  
   - **GrindChart**: Shows a line chart comparing **Sleep**, **Grind**, and **Break** hours by month.

5. **Interactive Counters**:  
   - **Active Assignments/Projects**: Increment or decrement using the plus or minus icons.  
   - **Completed Assignments/Projects**: These counters may update automatically or manually (depending on your implementation).

---

## Folder Structure

```
st-dashboard/
├─ assets/               # (Optional) store icons or images
├─ node_modules/
├─ web/
│  ├─ index.html         # Main HTML file
│  ├─ style.css          # Custom CSS
│  └─ (others)           # Additional assets
├─ main.js               # Entry point for Electron (if you named it differently, adjust accordingly)
├─ preload.js            # Preload scripts for Electron
├─ script.js             # Main JS logic for DOM handling & chart updates
├─ popup.js              # Popup/Modal handling script
├─ package.json
└─ README.md
```

- **`index.html`**: The main UI file, containing the sidebar, charts, and modals.  
- **`script.js`**: Handles dynamic functionality (chart creation, timers, counters, etc.).  
- **`popup.js`**: Likely contains logic for opening, closing, or animating modals.  
- **`main.js`** (or your `electron.js`): Entry point for Electron, creates the `BrowserWindow`, sets icon, and manages the app lifecycle.  
- **`preload.js`**: Preloads code that can safely interact with the DOM from the main process in Electron.

*(Adjust folder names and file references according to your actual structure.)*

---

## Contributing

1. **Fork** the repository.  
2. **Create a new branch**: `git checkout -b feature-my-feature`.  
3. **Commit your changes**: `git commit -m "Add some feature"`.  
4. **Push to the branch**: `git push origin feature-my-feature`.  
5. **Open a Pull Request**.  

Contributions are welcome! Feel free to submit feature requests, bug fixes, or enhancements.

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

### Thank You!
Thank you for checking out **ST-Dashboard**. If you have any questions or suggestions, feel free to open an issue or submit a pull request! 


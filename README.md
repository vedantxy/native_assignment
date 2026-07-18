<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_Navigation-8A2BE2?style=for-the-badge&logo=react&logoColor=white" alt="React Navigation" />

  <h1 align="center">Field Survey & Inspection App 📱</h1>
  <p align="center">
    <strong>A modern, enterprise-grade mobile application for managing field surveys, site inspections, and data collection seamlessly.</strong>
  </p>
</div>

---

## 📖 Overview

The **Field Survey & Inspection App** is designed for field engineers and inspectors to collect and manage survey data on the go. Built with a focus on modern UX/UI, the application leverages the power of React Native, Expo Router, and a centralized React Context for flawless global state management.

## ✨ Key Features

- **🌐 Global State Management:** Centralized `AppContext` flawlessly syncs data across all screens without prop drilling.
- **📊 Dynamic Dashboard:** Instantly view statistics for total surveys, high-priority tasks, and recent activity logs.
- **📝 Intelligent Survey Management:** Create, track, and manage new surveys. Survey history dynamically reflects additions and deletions in real-time.
- **🎨 Custom Drawer Navigation:** A meticulously designed sidebar drawer with a striking indigo-gradient header and dynamically styled active/inactive tabs.
- **👤 User Profile & Settings:** Modify employee details and app preferences. Profile updates instantly reflect in the main drawer and dashboard headers.

## 🛠️ Technology Stack

| Technology | Description |
|------------|-------------|
| **Framework** | [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/)) |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation) |
| **State** | React Context API for global state |
| **Language** | [TypeScript](https://www.typescriptlang.org/) for robust type safety |
| **Styling** | Vanilla StyleSheet & `expo-linear-gradient` |
| **Icons** | `@expo/vector-icons` (Ionicons) |

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer)
- [Git](https://git-scm.com/)
- Expo CLI (`npm install -g expo-cli`)
- **Expo Go** app installed on your iOS/Android device (for physical testing).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vedantxy/native_assignment.git
   cd native_assignment/survey_inspection_project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

### 📱 Running the App

Once the Metro bundler is running in your terminal, you can:
- Press **`i`** to open the app in an iOS Simulator.
- Press **`a`** to open the app in an Android Emulator.
- Press **`w`** to open the app in a web browser.
- **Scan the QR Code** with your camera (iOS) or Expo Go app (Android) to run it directly on your physical mobile device.

## 📁 Project Structure

```text
survey_inspection_project/
├── app/                  # Expo Router file-based routing
│   ├── (drawer)/         # Custom Sidebar Drawer Navigation
│   │   ├── (tabs)/       # Dashboard, New Survey, History, Profile
│   │   ├── camera.tsx    # Camera module placeholder
│   │   ├── contacts.tsx  # Contacts module
│   │   ├── location.tsx  # Geolocation module
│   │   ├── settings.tsx  # App settings
│   │   └── _layout.tsx   # Custom Drawer layout & styling
│   └── _layout.tsx       # Root Layout (AppProvider wrapper)
├── context/
│   └── AppContext.tsx    # Global state logic and initial state
├── assets/               # Local images, fonts, and icons
├── package.json          # Dependencies & Scripts
└── README.md             # Project documentation
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <sub>Built with ❤️ by Vedant Patel</sub>
</div>

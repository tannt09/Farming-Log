# 🌱 Farming Log App (React Native)

## 📌 Overview

Farming Log is a mobile application that helps farmers record their daily field activities such as seeding, fertilizing, and harvesting.

The app is designed with an **offline-first approach**, ensuring it works seamlessly even in areas with unstable or no internet connection.

---

## 🛠 Tech Stack

* **React Native (TypeScript - Strict Mode)**
* **Redux Toolkit**
* **Redux-Saga** (for side effects & sync flow)
* **AsyncStorage** (offline storage)
* **React Navigation v6/v7**
* **i18next + react-i18next**
* **NetInfo** (network detection)

---

## 📂 Project Structure

```
src/
 ├── components/       # Reusable UI components
 ├── screens/          # App screens
 ├── navigation/       # Navigation setup
 ├── store/            # Redux + Saga
 ├── services/         # API & storage
 ├── utils/            # Helpers (network, etc.)
 ├── data/             # Mock JSON data
 ├── i18n/             # Localization files
 └── types/            # TypeScript types
```

---

## ⚙️ Installation & Run

### 1. Install dependencies

```
yarn
```

### 2. Start Metro

```
yarn start
```

### 3. Run Android

```
yarn android
```

---

## 🧪 Testing

### Run tests

```
yarn test
```

---

## 🧠 Architectural Decisions

### Why Redux + Saga?

* Clear separation between UI and business logic
* Handles async flows (offline → online sync) cleanly
* Easier to scale and test

### Why AsyncStorage?

* Simple and reliable local storage
* Suitable for offline-first apps

### Why i18n?

* Clean language management
* Easy to extend for more languages

---

## 🔥 What I Would Improve

If given more time, I would:

* Setup add **prettier** **eslint** **commitlint** to clean and manger code
* Change **AsyncStorage** by **react-native-sqlite-storage** to optimal for search, filter, sort,... function
* Add **animations** **skeleton-loading** to improve user experience

---

## 👨‍💻 Author

Tan Nguyen

# React Flexible InputField Component

This project implements a **flexible, accessible, and responsive InputField component** in React + TypeScript.  
It is built with **Vite** and styled using **Tailwind CSS**, with tests written in **Vitest + React Testing Library**.  

---

## Features

- **Label, placeholder, helper text, error message**
- **Validation States**
  - Disabled  
  - Invalid (error state with message)  
  - Loading (with spinner, transitions to success)  
- **Variants**: `filled`, `outlined`, `ghost`
- **Sizes**: `small`, `medium`, `large`
- **Optional Controls**
  - Clear button  
  - Password toggle (Show/Hide)  
- **Accessibility**: ARIA labels, roles, keyboard-friendly
- **Themes**: Light & Dark mode support
- **Responsive design** (mobile-first, scales well on all devices)

---

## 📂 Project Structure

src/
├── components/
│ ├── InputField.tsx # Main component
│ └── InputField.test.tsx # Unit tests
├── App.tsx # Demo page with example states
├── main.tsx # Entry point
└── index.css # Tailwind setup


---

## 🚀 Getting Started

### 1. Clone repo
```sh
git clone https://github.com/Anjali536/react-input-field.git
cd react-input-field
```
## Install Dependencies 
npm install
npm run dev
npm run test

## Tests
Renders label and placeholder
Disabled state
Invalid state (error message + aria-invalid)
Loading spinner state
onChange functionality
Password toggle (show/hide)
Clear button interaction

Frameworks: Vitest + React Testing Library + Jest-DOM



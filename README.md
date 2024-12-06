# Recipe Management System (RMS)

## Overview
The Recipe Management System (RMS) is a web-based application designed to provide an easy and efficient way to search, organize, and record recipes. With the vast number of recipes available online, it can be challenging for users to recall and search for specific recipes, store their favorites, or plan a menu. RMS simplifies these tasks by allowing users to search for recipes, add them to their personal list, and generate ingredient lists for groceries.

RMS is tailored for food enthusiasts, including both home cooks and professional chefs, who want to streamline their cooking tasks using a modern computing tool. Whether you're looking to discover new recipes or organize your tried-and-true favorites, RMS supports you every step of the way. Our goal is to create a user-friendly environment that makes cooking more affordable, organized, and enjoyable.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Running on Windows](#running-on-windows)
3. [Running on Linux](#running-on-linux)
4. [Technologies Used](#technologies-used)
5. [Troubleshooting](#troubleshooting)
6. [Learn More](#learn-more)
7. [Deployment](#deployment)
8. [License](#license)

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)
- A code editor like [VS Code](https://code.visualstudio.com/) or access to a terminal/command-line tool

---

## Running on Windows

Follow these steps to set up and run the project:

1. **Extract the Project Files**  
   Download the `.zip` file containing the project and extract it to your preferred folder.

2. **Navigate to the Project Directory**  
   Open a terminal and navigate to the extracted folder:  
   ```bash
   cd "path-to-extracted-folder"
   ```
   
3. **Install Dependencies**  
   Run the following command to install all required dependencies:  
```bash
npm install
```

4. **Run the Development Server**  
   Start the development server with the command:  
```bash
npm run dev
```

Alternatively, you can use:
```bash
yarn dev
pnpm dev
bun dev
```

5. **Access the Application**  
   Open your browser and go to:
```bash
(http://localhost:3000)
```

---

## Running on Linux

The setup process is largely the same as Windows. If you encounter permission issues, use sudo:

1. **Extract the Project Files**  
   Download the `.zip` file containing the project and extract it to your preferred folder.

2. **Navigate to the Project Directory**  
   Open a terminal and navigate to the extracted folder:  
   ```bash
   cd "path-to-extracted-folder"
   ```
   
3. **Install Dependencies**  
   Prefix the command with sudo if necessary:  
   ```bash
   sudo npm install
   ```

4. **Run the Development Server**  
   Start the development server: 
   ```bash
   sudo npm run dev
   ```


5. **Access the Application**  
   Open your browser and go to:
   ```bash
   (http://localhost:3000)
   ```

---


## Technologies Used

- **Next.js**: A React framework optimized for production environments.
- **React**: A JavaScript library for building user interfaces.
- **CSS Modules**: Used for scoped and modular styling.

---

## Troubleshooting

### Common Issues

1. **Missing Node.js**  
   If Node.js is not installed, verify by running:  
   ```bash
   node -v
   ```
   If it’s not installed, download it from the Node.js Official Website.

2. **Port Already in Use**  
   If port 3000 is already in use, stop any process using the port or run the server on a different port:
   ```bash
   npm run dev -- --port=4000
   ```
   
3. **Permission Denied on Linux**  
   On Linux systems, if you encounter permission issues, prepend commands with sudo:
   ```bash
   sudo npm install
   sudo npm run dev
   ```

---

## Learn More

For additional information and resources about the technologies used in this project:

1. [Next.js Documentation](https://nextjs.org/docs): Explore Next.js features and APIs.
2. [Learn Next.js](https://nextjs.org/learn): An interactive tutorial to get started with Next.js.
3. [Next.js GitHub Repository](https://github.com/vercel/next.js): Contribute to or explore the source code.

---

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js application is through the [Vercel Platform](https://vercel.com/), developed by the creators of Next.js.

1. **Sign Up**: Create an account on [Vercel](https://vercel.com/).
2. **Link Repository**: Connect your GitHub repository to Vercel.
3. **Deploy**: Follow the on-screen instructions to deploy your application.

For detailed guidance, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

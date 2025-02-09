# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Install the dependencies
npm install

# Start the proyect
npm run dev

# Install Json-server
npm install -g json-server

# Start Json-server
json-server --watch db/db.json --port 5000


# Remove node tasks in windows
taskkill /F /IM node.exe


import { Buffer } from 'buffer';
window.Buffer = Buffer;
import process from 'process';
window.process = process;
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

import { Main } from './src/main';
import { createRoot } from 'react-dom/client';

const root = (document.getElementById('root') as HTMLElement) || null;

if (!root) throw new Error('root not found');

const container = createRoot(root);

container.render(<Main />);

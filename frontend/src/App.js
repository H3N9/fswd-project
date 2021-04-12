import './App.css';
import Index from './pages/index'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'

library.add(fas, far)

function App() {
  return (
    <Index />
  );
}

export default App;

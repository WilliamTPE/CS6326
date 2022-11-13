import logo from './logo.svg';
import './App.css';
import Forum from "./pages/Forums";
import QuestionForms from "./pages/QuestionForms";
import QuestionDetail from "./pages/QuestionDetail";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Forum/>}/>
              <Route path="/question/ask" element={<QuestionForms/>} />
              <Route path="/question/:id" element={<QuestionDetail/>} />
          </Routes>
      </Router>
  );
}

export default App;

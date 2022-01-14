import { Container } from '@mui/material';
import './App.css';
import Header from './components/header/Header';
import TaskActions from './components/filters/TaskActions';
import TasksContainer from './components/tasks/TasksContainer';
function App() {
  return (
    <div className="App do-productive">
      <Header />
      <Container>
        <TaskActions />
        <TasksContainer />
      </Container>
    </div>
  );
}

export default App;

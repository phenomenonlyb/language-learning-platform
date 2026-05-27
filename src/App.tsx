import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import WordLearning from './pages/WordLearning'
import GrammarLearning from './pages/GrammarLearning'
import SpeakingLearning from './pages/SpeakingLearning'
import ListeningLearning from './pages/ListeningLearning'
import Progress from './pages/Progress'
import Community from './pages/Community'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="learn/words" element={<WordLearning />} />
          <Route path="learn/grammar" element={<GrammarLearning />} />
          <Route path="learn/speaking" element={<SpeakingLearning />} />
          <Route path="learn/listening" element={<ListeningLearning />} />
          <Route path="progress" element={<Progress />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import MyceliumCanvas from './components/ui/MyceliumCanvas'
import Home from './pages/Home'
import DOLIndex from './pages/dol/index'
import LLVMIndex from './pages/llvm/index'
import SkillsIndex from './pages/skills/index'
import About from './pages/About'

function App() {
  return (
    <>
      <MyceliumCanvas />
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dol/*" element={<DOLIndex />} />
          <Route path="/llvm/*" element={<LLVMIndex />} />
          <Route path="/skills/*" element={<SkillsIndex />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </PageLayout>
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import MyceliumCanvas from './components/ui/MyceliumCanvas'
import Home from './pages/Home'
import DOLIndex from './pages/dol/index'
import LLVMIndex from './pages/llvm/index'
import SkillsIndex from './pages/skills/index'
import About from './pages/About'
import Developers from './pages/Developers'
import Roadmap from './pages/Roadmap'
import EnergyCalculator from './pages/tools/energy-calculator'
import NetworkTopologyAnalyzer from './pages/tools/network-analyzer'
import ThermodynamicsIndex from './pages/docs/foundations/thermodynamics/index'

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
          <Route path="/docs/foundations/thermodynamics/*" element={<ThermodynamicsIndex />} />
          <Route path="/about" element={<About />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/tools/energy-calculator" element={<EnergyCalculator />} />
          <Route path="/tools/network-analyzer" element={<NetworkTopologyAnalyzer />} />
        </Routes>
      </PageLayout>
    </>
  )
}

export default App

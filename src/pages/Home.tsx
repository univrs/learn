import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
import Ecosystem from '@/components/sections/Ecosystem'
import GetStarted from '@/components/sections/GetStarted'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Univrs.io - Tools for systems that understand themselves</title>
        <meta name="description" content="The Univrs meta-tools ecosystem: DOL (Design Ontology Language) v0.6.0 with 1,705+ tests, HIR + MLIR + WASM pipeline. Specification-first development for intelligent systems." />
      </Helmet>

      <Hero />
      <Pillars />
      <Ecosystem />
      <GetStarted />
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
import Ecosystem from '@/components/sections/Ecosystem'
import GetStarted from '@/components/sections/GetStarted'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Univrs Learn - Tools that build tools</title>
        <meta name="description" content="Learn the Univrs meta-tools ecosystem: DOL (Design Ontology Language), LLVM Translation Tools, and Skills Framework." />
      </Helmet>

      <Hero />
      <Pillars />
      <Ecosystem />
      <GetStarted />
    </>
  )
}

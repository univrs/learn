import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
}

export default function MyceliumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      nodesRef.current = []
      const nodeCount = Math.floor((canvas.width * canvas.height) / 25000)

      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2
        })
      }
    }

    const getThemeColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      return {
        node: isDark ? 'rgba(0, 255, 213, 0.6)' : 'rgba(0, 139, 117, 0.6)',
        connection: isDark ? 'rgba(0, 255, 213, 0.15)' : 'rgba(0, 139, 117, 0.15)'
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const colors = getThemeColors()
      const time = Date.now() * 0.001
      const nodes = nodesRef.current

      // Update and draw connections
      const maxDist = 150

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i]

        // Update position
        nodeA.x += nodeA.vx
        nodeA.y += nodeA.vy

        // Bounce off edges
        if (nodeA.x < 0 || nodeA.x > canvas.width) nodeA.vx *= -1
        if (nodeA.y < 0 || nodeA.y > canvas.height) nodeA.vy *= -1

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j]
          const dx = nodeB.x - nodeA.x
          const dy = nodeB.y - nodeA.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.3
            ctx.strokeStyle = colors.connection.replace('0.15', alpha.toFixed(2))
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.stroke()
          }
        }

        // Draw node with pulse
        const pulse = Math.sin(time * 2 + nodeA.pulsePhase) * 0.3 + 0.7
        ctx.fillStyle = colors.node
        ctx.beginPath()
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius * pulse, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    // Initialize
    resize()
    draw()

    // Handle resize
    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      resize()
      draw()
    }

    window.addEventListener('resize', handleResize)

    // Reduce animation when not visible
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      } else {
        draw()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="mycelium-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  )
}

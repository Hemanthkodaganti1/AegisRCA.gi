import { useState } from 'react'
import './App.css'

function App() {
  const [incident, setIncident] = useState('')
  const [result, setResult] = useState('')

  const analyzeIncident = async () => {
    const response = await fetch('http://127.0.0.1:8000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incident: incident,
      }),
    })

    const data = await response.json()

    setResult(data.message)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AegisRCA</h1>
        <p>AI-Powered DevOps Root Cause Analysis Platform</p>
      </header>

      <main className="dashboard">
        <section className="incident-card">
          <h2>DevOps Incident</h2>

          <textarea
            placeholder="Describe your incident..."
            rows={5}
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
          />

          <button onClick={analyzeIncident}>
            Analyze Incident
          </button>
        </section>

        <section className="investigation-card">
          <h2>Investigation</h2>

          <div className="agents">
            <div>Docker Agent</div>
            <div>Kubernetes Agent</div>
            <div>CI/CD Agent</div>
            <div>Monitoring Agent</div>
          </div>
        </section>

        <section className="result-card">
          <h2>Root Cause</h2>
          <p>{result || 'Investigation results will appear here.'}</p>
        </section>

        <section className="result-card">
          <h2>Remediation</h2>
          <p>Recommended actions will appear here.</p>
        </section>
      </main>
    </div>
  )
}

export default App

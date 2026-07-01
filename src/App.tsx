import { useState } from 'react';
import { Sparkles, BarChart3, Database, ShieldCheck, Compass, HelpCircle, Activity } from 'lucide-react';
import UploadZone from './components/UploadZone';
import ResultsDashboard from './components/ResultsDashboard';
import ArchitectureDocs from './components/ArchitectureDocs';

interface PredictionResponse {
  success: boolean;
  extracted_features: {
    experience_years: number;
    education_level: number;
    education_name: string;
    skill_count: number;
  };
  role_predictions: {
    selected_role: string;
    mapped_role: string;
    fit_score: number;
    outcome: 'Hired' | 'Rejected';
  };
  global_predictions: {
    hireability_prob: number;
    outcome: string;
  };
  recommendations: Array<{
    role: string;
    score: number;
  }>;
}

const JOB_ROLES = [
  "Data Scientist",
  "Machine Learning Engineer",
  "Software Engineer",
  "Backend Developer",
  "Frontend Developer",
  "Project Manager",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Engineer",
  "UI/UX Designer",
  "Product Manager",
  "QA Engineer",
  "Cloud Architect",
  "Security Engineer",
  "Mobile Developer"
];

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string>("Software Engineer");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'docs'>('upload');

  const handleFileSelect = async (file: File, roleToPredict: string = selectedRole) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setApiError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('role', roleToPredict);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server responded with status ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setApiError(
        err.message || 'Unable to connect to the backend server. Please verify FastAPI is running at http://localhost:8000.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    if (selectedFile) {
      handleFileSelect(selectedFile, newRole);
    }
  };

  const handleLoadSarahChenDemo = () => {
    const sarahText = `SARAH CHEN
San Francisco, CA | +1 (555) 234-5678 | sarah.chen@email.com

PROFESSIONAL SUMMARY
Senior Machine Learning Engineer with 8 years of experience in building end-to-end ML systems. Expert in Machine Learning, Deep Learning, and Data Science. Strong background in Python, SQL, Java, and C++.

EDUCATION
M.S. in Computer Science | Massachusetts Institute of Technology (MIT) | 2014 - 2016
B.S. in Computer Science | University of California, Berkeley | 2010 - 2014

SKILLS
Python, SQL, Java, C++, Node.js, React, Machine Learning, Deep Learning, Agile, Scrum, Leadership, Communication, Project Management, Docker, Git, FastAPI`;

    const blob = new Blob([sarahText], { type: 'text/plain' });
    const file = new File([blob], 'sarah_chen_resume.txt', { type: 'text/plain' });
    setSelectedRole("Machine Learning Engineer");
    handleFileSelect(file, "Machine Learning Engineer");
  };

  return (
    <div className="app-container">
      
      {/* Header Bar */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon-box">
            <Sparkles style={{ width: '1.4rem', height: '1.4rem', color: 'var(--color-white)' }} />
          </div>
          <div className="logo-text">
            <h1>AI Hiring Intelligence Platform</h1>
            <p>Production Grade Suite</p>
          </div>
        </div>

        <div className="nav-tabs">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`nav-button ${activeTab === 'upload' ? 'active' : ''}`}
          >
            CV Analyzer
          </button>
          <button 
            onClick={() => setActiveTab('docs')}
            className={`nav-button ${activeTab === 'docs' ? 'active' : ''}`}
          >
            System Architecture
          </button>
        </div>
      </header>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="glass-panel stats-card">
          <div className="stats-icon-box purple">
            <Database style={{ width: '1.2rem', height: '1.2rem' }} />
          </div>
          <div className="stats-info">
            <span className="label">Dataset Pool</span>
            <span className="value">2,500 Candidates</span>
          </div>
        </div>

        <div className="glass-panel stats-card">
          <div className="stats-icon-box cyan">
            <Compass style={{ width: '1.2rem', height: '1.2rem' }} />
          </div>
          <div className="stats-info">
            <span className="label">Supported Roles</span>
            <span className="value">15 Job Titles</span>
          </div>
        </div>

        <div className="glass-panel stats-card">
          <div className="stats-icon-box emerald">
            <ShieldCheck style={{ width: '1.2rem', height: '1.2rem' }} />
          </div>
          <div className="stats-info">
            <span className="label">Classification Acc.</span>
            <span className="value">93.0%</span>
          </div>
        </div>

        <div className="glass-panel stats-card">
          <div className="stats-icon-box indigo">
            <Activity style={{ width: '1.2rem', height: '1.2rem' }} />
          </div>
          <div className="stats-info">
            <span className="label">Validation AUC</span>
            <span className="value">0.846</span>
          </div>
        </div>
      </section>

      {/* Main Tab Render */}
      {activeTab === 'upload' ? (
        <main className="main-grid animate-fade-in">
          
          {/* Input Controls Panel */}
          <div className="glass-panel form-panel">
            <div>
              <h3 className="panel-title">Upload CV Profile</h3>
              <p className="panel-subtitle">Configure parameters before uploading the document</p>
            </div>

            {/* Target Job Role Select */}
            <div className="form-group">
              <label>Target Job Role Select</label>
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="role-select"
              >
                {JOB_ROLES.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.2rem 0' }}></div>

            {/* File Dropzone */}
            <UploadZone
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              selectedFile={selectedFile}
            />

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.2rem 0' }}></div>
            
            <button
              onClick={handleLoadSarahChenDemo}
              disabled={isProcessing}
              style={{
                width: '100%',
                background: 'rgba(139, 92, 246, 0.07)',
                border: '1px dashed rgba(139, 92, 246, 0.3)',
                color: 'var(--neon-purple)',
                padding: '0.65rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                outline: 'none'
              }}
            >
              <Sparkles style={{ width: '0.8rem', height: '0.8rem' }} />
              Try Sarah Chen CV (Demo)
            </button>
          </div>

          {/* Prediction Results Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {result ? (
              <ResultsDashboard data={result} />
            ) : apiError ? (
              <div className="glass-panel api-error-card">
                <div className="api-error-icon-box glow-rose">
                  <BarChart3 style={{ width: '2rem', height: '2rem' }} />
                </div>
                <h3>Connection Failed</h3>
                <p>{apiError}</p>
                <button 
                  onClick={() => selectedFile && handleFileSelect(selectedFile)}
                  className="retry-btn"
                >
                  Retry Analysis
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <HelpCircle className="empty-state-icon" style={{ width: '3rem', height: '3rem' }} />
                <h3>Awaiting Resume Upload</h3>
                <p>
                  Select a target role on the left and upload a CV to view the collaborative filtering match results.
                </p>
              </div>
            )}
          </div>

        </main>
      ) : (
        <main className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-white)', marginBottom: '0.25rem' }}>
              Technical Documentation
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              Detailed visualization of system components bridging the unstructured CV-to-dataset feature gap.
            </p>
            <ArchitectureDocs />
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 AI Hiring Intelligence Platform. Production-grade deployment version 1.0.0.</p>
      </footer>
    </div>
  );
}

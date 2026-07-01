import { Upload, Cpu, Network, Award, ShieldAlert, GitBranch, Terminal } from 'lucide-react';

export default function ArchitectureDocs() {
  const steps = [
    {
      number: "01",
      title: "CV Upload",
      description: "User uploads unstructured resumes (PDF, DOCX, or TXT) and selects a target job role.",
      icon: <Upload style={{ width: '1.1rem', height: '1.1rem' }} />,
      colorClass: "purple"
    },
    {
      number: "02",
      title: "Regex Parsing Engine",
      description: "Performs section splitting, extracts non-overlapping experience, evaluates case-safe degrees, and maps unique skill words.",
      icon: <Cpu style={{ width: '1.1rem', height: '1.1rem' }} />,
      colorClass: "cyan"
    },
    {
      number: "03",
      title: "Core ML Modules",
      description: "Applies Random Forest Classification (hireability) and Random Forest Regression (fit score using Skill Overlap Ratio).",
      icon: <Network style={{ width: '1.1rem', height: '1.1rem' }} />,
      colorClass: "emerald"
    },
    {
      number: "04",
      title: "Intelligent Output",
      description: "Renders the matching percentage, global decision status, extracted feature card, and top 3 career recommendations.",
      icon: <Award style={{ width: '1.1rem', height: '1.1rem' }} />,
      colorClass: "indigo"
    }
  ];

  const modules = [
    {
      id: "Module 1",
      name: "Classification",
      algorithms: "KNN, Decision Tree, Random Forest (rf_clf.pkl)",
      purpose: "Predicts the global Hired/Not-Hired class based on scaled experience, education, skill counts, and overlap ratio. Achieves 93.0% validation accuracy.",
    },
    {
      id: "Module 2",
      name: "Regression",
      algorithms: "Linear Regression, Random Forest Regressor (rf_reg.pkl)",
      purpose: "Estimates the precise Job Fit Score using scaled experience, education, skill counts, and real-time Skill Overlap Ratio. Achieves 99.8% R².",
    },
    {
      id: "Module 3",
      name: "Clustering",
      algorithms: "K-Means, Hierarchical (Ward), DBSCAN",
      purpose: "Segments candidates into talent groups based on multi-dimensional attributes and outcomes.",
    },
    {
      id: "Module 4",
      name: "Dimensionality Reduction",
      algorithms: "PCA (pca.pkl)",
      purpose: "Reduces TF-IDF vectors of candidate skills to dense, low-dimensional components for SVD latent regressor input.",
    },
    {
      id: "Module 5",
      name: "Collaborative Filtering",
      algorithms: "TruncatedSVD (svd_model.pkl) & Latent Regressor",
      purpose: "Projects candidates and roles into a latent space, generating recommendations and alternative career fit paths.",
    }
  ];

  return (
    <div className="docs-wrapper animate-fade-in" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Visual SVG System Architecture Diagram */}
      <div className="pipeline-section glass-panel" style={{ padding: '2rem' }}>
        <h3 className="section-subtitle" style={{ marginBottom: '1.5rem' }}>
          <Terminal style={{ width: '1.2rem', height: '1.2rem', color: 'var(--neon-cyan)' }} />
          <span>Interactive System Architecture Diagram</span>
        </h3>
        
        <div style={{ width: '100%', overflowX: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.03)' }}>
          <svg viewBox="0 0 920 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: '850px', width: '100%', height: 'auto' }}>
            <style>
              {`
                @keyframes flowDash {
                  to { stroke-dashoffset: -20; }
                }
                .flow-path {
                  stroke: rgba(139, 92, 246, 0.4);
                  stroke-width: 1.5;
                  stroke-dasharray: 6, 4;
                  animation: flowDash 1.5s linear infinite;
                }
                .flow-path-cyan {
                  stroke: rgba(6, 182, 212, 0.4);
                  stroke-width: 1.5;
                  stroke-dasharray: 6, 4;
                  animation: flowDash 1.5s linear infinite;
                }
                .flow-path-emerald {
                  stroke: rgba(16, 185, 129, 0.4);
                  stroke-width: 1.5;
                  stroke-dasharray: 6, 4;
                  animation: flowDash 1.5s linear infinite;
                }
                .node-box {
                  fill: rgba(13, 13, 26, 0.85);
                  stroke: rgba(255, 255, 255, 0.08);
                  stroke-width: 1;
                  transition: all 0.3s ease;
                }
                .node-group:hover .node-box {
                  stroke: var(--neon-purple);
                  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.25));
                }
                .node-group-cyan:hover .node-box {
                  stroke: var(--neon-cyan);
                  filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.25));
                }
                .node-group-emerald:hover .node-box {
                  stroke: var(--neon-emerald);
                  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.25));
                }
                .node-title {
                  font-family: 'Outfit', sans-serif;
                  font-weight: 700;
                  fill: #ffffff;
                  font-size: 11px;
                }
                .node-desc {
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  fill: #94a3b8;
                  font-size: 9px;
                }
                .label-bubble {
                  fill: rgba(139, 92, 246, 0.1);
                  stroke: rgba(139, 92, 246, 0.2);
                  rx: 4px;
                }
              `}
            </style>
            
            {/* Filters */}
            <defs>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines (Subtle) */}
            <path d="M 0,120 L 920,120 M 0,240 L 920,240 M 0,360 L 920,360 M 180,0 L 180,480 M 390,0 L 390,480 M 600,0 L 600,480" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

            {/* Flow Connecting Lines */}
            {/* Frontend -> Parser */}
            <path d="M 140,240 L 200,240" className="flow-path" />
            
            {/* Parser -> Preprocessor */}
            <path d="M 360,130 L 410,130" className="flow-path-cyan" />
            <path d="M 360,200 L 385,200 L 385,210 L 410,210" className="flow-path-cyan" />
            <path d="M 360,270 L 385,270 L 385,290 L 410,290" className="flow-path-cyan" />
            <path d="M 360,340 L 395,340 L 395,310 L 410,310" className="flow-path-cyan" />

            {/* Preprocessor -> ML Models */}
            {/* Scaler -> Classifier & Regressor */}
            <path d="M 570,130 L 595,130 L 595,150 L 640,150" className="flow-path-emerald" />
            <path d="M 570,130 L 595,130 L 595,220 L 640,220" className="flow-path-emerald" />
            {/* TF-IDF & PCA -> SVD */}
            <path d="M 570,220 L 640,315" className="flow-path-emerald" />
            {/* Overlap -> Classifier & Regressor */}
            <path d="M 570,300 L 610,300 L 610,170 L 640,170" className="flow-path-emerald" />
            <path d="M 570,300 L 610,300 L 610,240 L 640,240" className="flow-path-emerald" />

            {/* Return Flow: ML output back to Frontend */}
            <path d="M 870,240 L 890,240 L 890,440 L 80,440 L 80,315" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1.5" strokeDasharray="5, 5" />
            <polygon points="80,310 76,318 84,318" fill="rgba(139, 92, 246, 0.4)" />

            {/* Column Titles */}
            <text x="80" y="40" fill="var(--neon-purple)" fontFamily="Outfit" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">1. CLIENT LAYER</text>
            <text x="280" y="40" fill="var(--neon-cyan)" fontFamily="Outfit" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">2. PARSING LAYER</text>
            <text x="490" y="40" fill="var(--neon-cyan)" fontFamily="Outfit" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">3. PREPROCESSING</text>
            <text x="755" y="40" fill="var(--neon-emerald)" fontFamily="Outfit" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">4. MACHINE LEARNING LAYER</text>

            {/* LAYER 1: Frontend Client */}
            <g className="node-group">
              <rect x="20" y="165" width="120" height="150" rx="8" className="node-box" />
              <rect x="20" y="165" width="120" height="3" rx="1.5" fill="url(#purpleGrad)" />
              <text x="80" y="190" className="node-title" textAnchor="middle">React Dashboard</text>
              <text x="30" y="215" className="node-desc">• CV file input</text>
              <text x="30" y="230" className="node-desc">• Role select</text>
              <text x="30" y="245" className="node-desc">• Match outputs</text>
              <text x="30" y="260" className="node-desc">• Skill gauges</text>
              <text x="30" y="275" className="node-desc">• Recommendations</text>
              <text x="30" y="295" className="node-desc" fill="var(--neon-purple)">[Frontend - Vite]</text>
            </g>

            {/* LAYER 2: Parsing Engine (cv_parser.py) */}
            {/* Section Splitter */}
            <g className="node-group-cyan">
              <rect x="200" y="90" width="160" height="60" rx="6" className="node-box" />
              <text x="210" y="110" className="node-title">Section Splitter</text>
              <text x="210" y="125" className="node-desc">Isolates Work Exp vs Education</text>
              <text x="210" y="138" className="node-desc">to avoid cross-date errors</text>
            </g>
            {/* Experience Year Summing */}
            <g className="node-group-cyan">
              <rect x="200" y="165" width="160" height="60" rx="6" className="node-box" />
              <text x="210" y="185" className="node-title">Exp Years Summing</text>
              <text x="210" y="200" className="node-desc">Sums non-overlapping work</text>
              <text x="210" y="213" className="node-desc">intervals; ignores raw numbers</text>
            </g>
            {/* Case-Safe Education */}
            <g className="node-group-cyan">
              <rect x="200" y="240" width="160" height="60" rx="6" className="node-box" />
              <text x="210" y="260" className="node-title">Case-Safe Education</text>
              <text x="210" y="275" className="node-desc">Validates uppercase BE/BS/MS</text>
              <text x="210" y="288" className="node-desc">to filter out verb/tool matches</text>
            </g>
            {/* Skills Vocabulary Scanner */}
            <g className="node-group-cyan">
              <rect x="200" y="315" width="160" height="60" rx="6" className="node-box" />
              <text x="210" y="335" className="node-title">Vocabulary Scanner</text>
              <text x="210" y="350" className="node-desc">Scans CV for 13 unique skills</text>
              <text x="210" y="363" className="node-desc">Rebuilds clean comma string</text>
            </g>

            {/* LAYER 3: Preprocessing */}
            {/* Scaler */}
            <g className="node-group-cyan">
              <rect x="410" y="90" width="160" height="70" rx="6" className="node-box" />
              <text x="420" y="110" className="node-title">Standard Scaler</text>
              <text x="420" y="125" className="node-desc">Scales base features</text>
              <text x="420" y="138" className="node-desc">for classifier and regressor</text>
              <text x="420" y="150" className="node-desc" fill="var(--neon-cyan)">[scaler.pkl]</text>
            </g>
            {/* Comma TF-IDF & PCA */}
            <g className="node-group-cyan">
              <rect x="410" y="175" width="160" height="80" rx="6" className="node-box" />
              <text x="420" y="195" className="node-title">Comma TF-IDF & PCA</text>
              <text x="420" y="210" className="node-desc">Extracts skills & reduces</text>
              <text x="420" y="223" className="node-desc">dimensions to 5 components</text>
              <text x="420" y="236" className="node-desc" fill="var(--neon-cyan)">[tfidf_vectorizer.pkl | pca.pkl]</text>
            </g>
            {/* Skill Overlap Ratio */}
            <g className="node-group-cyan">
              <rect x="410" y="270" width="160" height="60" rx="6" className="node-box" />
              <text x="420" y="290" className="node-title">Skill Overlap Ratio</text>
              <text x="420" y="305" className="node-desc">Overlaps skills with target</text>
              <text x="420" y="318" className="node-desc">role expected requirements</text>
            </g>

            {/* LAYER 4: Machine Learning Models */}
            {/* Random Forest Classifier */}
            <g className="node-group-emerald">
              <rect x="640" y="90" width="230" height="80" rx="6" className="node-box" />
              <rect x="640" y="90" width="230" height="3" rx="1.5" fill="var(--neon-emerald)" />
              <text x="650" y="110" className="node-title">RF Classifier (Module 1)</text>
              <text x="650" y="125" className="node-desc">Predicts Hired/Rejected outcome based</text>
              <text x="650" y="138" className="node-desc">on candidate features + overlap ratio</text>
              <text x="650" y="152" className="node-desc" fill="var(--neon-emerald)">[random_forest_clf.pkl] - Acc: 93%</text>
            </g>
            {/* Random Forest Regressor */}
            <g className="node-group-emerald">
              <rect x="640" y="180" width="230" height="80" rx="6" className="node-box" />
              <rect x="640" y="180" width="230" height="3" rx="1.5" fill="var(--neon-emerald)" />
              <text x="650" y="200" className="node-title">RF Regressor (Module 2)</text>
              <text x="650" y="215" className="node-desc">Predicts exact Job Fit Score directly</text>
              <text x="650" y="228" className="node-desc">using real-time Skill Overlap Ratio</text>
              <text x="650" y="242" className="node-desc" fill="var(--neon-emerald)">[rf_reg.pkl] - R²: 0.998</text>
            </g>
            {/* Collaborative SVD */}
            <g className="node-group-emerald">
              <rect x="640" y="270" width="230" height="90" rx="6" className="node-box" />
              <rect x="640" y="270" width="230" height="3" rx="1.5" fill="var(--neon-emerald)" />
              <text x="650" y="290" className="node-title">Collaborative Filtering (Module 5)</text>
              <text x="650" y="305" className="node-desc">Projects PCA components to latent space;</text>
              <text x="650" y="318" className="node-desc">identifies top 3 career recommendations</text>
              <text x="650" y="331" className="node-desc">using SVD reconstruction predictions</text>
              <text x="650" y="345" className="node-desc" fill="var(--neon-emerald)">[svd_model.pkl | latent_regressor.pkl]</text>
            </g>
          </svg>
        </div>
      </div>
      
      {/* Step by Step Flow */}
      <div className="pipeline-section">
        <h3 className="section-subtitle">
          <GitBranch style={{ width: '1.2rem', height: '1.2rem', color: 'var(--neon-purple)' }} />
          <span>System Pipeline Flow</span>
        </h3>
        
        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className={`glass-panel step-card ${step.colorClass}`}>
              <div className="step-header">
                <div className="step-icon-wrapper">
                  {step.icon}
                </div>
                <span className="step-number">{step.number}</span>
              </div>
              
              <div className="step-details">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bridging the Gap Explanation */}
      <div className="info-banner">
        <div className="info-banner-icon">
          <ShieldAlert style={{ width: '1.5rem', height: '1.5rem' }} />
        </div>
        <div className="info-banner-content">
          <h4>Bridging the Gap (Structured Models vs. Unstructured Resumes)</h4>
          <p>
            Machine learning models are trained on clean, numerical representations of Experience, Education levels, and Skill counts. 
            However, resumes are naturally uploaded in free-form PDF or Word files. 
            The system implements a custom regular expression parser on the backend. This parser reads the CV text, counts exact matches against the TF-IDF feature vocabulary, calculates years of experience using dynamic date range subtraction, and matches academic degree patterns to return scaled floats. 
            This ensures incoming documents match the feature dimensions expected by the trained estimators.
          </p>
        </div>
      </div>

      {/* Syllabus Modules Details */}
      <div className="pipeline-section">
        <h3 className="section-subtitle">
          <Cpu style={{ width: '1.2rem', height: '1.2rem', color: 'var(--neon-purple)' }} />
          <span>Trained ML Pipeline Modules</span>
        </h3>
        
        <div className="modules-grid">
          {modules.map((m, idx) => (
            <div key={idx} className="glass-panel module-card">
              <div>
                <span className="module-badge">
                  {m.id}
                </span>
                <h4>{m.name}</h4>
                <p>{m.purpose}</p>
              </div>
              
              <div className="module-tech-footer">
                <span className="title">Algorithms</span>
                <span className="val">{m.algorithms}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

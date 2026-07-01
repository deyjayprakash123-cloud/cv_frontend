import { Briefcase, GraduationCap, Code2, ArrowUpRight, TrendingUp } from 'lucide-react';

interface Recommendation {
  role: string;
  score: number;
}

interface ResultsDashboardProps {
  data: {
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
    recommendations: Recommendation[];
  };
}

export default function ResultsDashboard({ data }: ResultsDashboardProps) {
  const { extracted_features, role_predictions, recommendations } = data;
  const isHired = role_predictions.outcome === 'Hired';
  const fitScorePercentage = Math.round(role_predictions.fit_score * 100);

  // SVG Circular progress values
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (role_predictions.fit_score * circumference);

  return (
    <div className="results-container animate-fade-in">
      {/* Top Banner: Hired/Rejected Status */}
      <div className={`result-status-card ${isHired ? 'hired' : 'rejected'}`}>
        <div className="result-meta">
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '0.2rem' }}>
            Application Decision
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-white)' }}>
            For role: <span style={{ color: 'var(--neon-purple)' }}>{role_predictions.selected_role}</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.3rem', lineHeight: 1.4 }}>
            {isHired 
              ? "Excellent profile match. The candidate meets or exceeds the required collaborative filtering benchmarks." 
              : "Profile alignment is below the threshold for this role. Consider alternative career paths below."
            }
          </p>
        </div>

        {/* Big Glowing Badge */}
        <div style={{ flexShrink: 0 }}>
          <span className={`decision-badge ${isHired ? 'hired' : 'rejected'}`}>
            {role_predictions.outcome}
          </span>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="results-grid">
        
        {/* Left Card: Score Progress Circle */}
        <div className="glass-panel gauge-panel">
          <div className="gauge-title">
            <TrendingUp style={{ width: '0.8rem', height: '0.8rem', marginRight: '0.2rem', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>SVD Fit Score</span>
          </div>

          {/* SVG Circular Progress Gauge */}
          <div className="gauge-wrapper" style={{ marginTop: '1rem' }}>
            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              {/* Background Track */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                style={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: '8', fill: 'transparent' }}
              />
              {/* Foreground Indicator */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                style={{
                  stroke: isHired ? 'var(--neon-emerald)' : 'var(--neon-rose)',
                  strokeWidth: '8',
                  fill: 'transparent',
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  strokeLinecap: 'round',
                  transition: 'stroke-dashoffset 1s ease-out'
                }}
              />
            </svg>
            <div className="gauge-inner-label">
              <span className="value">{fitScorePercentage}%</span>
              <span className="desc">Match</span>
            </div>
          </div>

          <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>
              Calculated using Module 5 (Matrix Factorization via TruncatedSVD) with a hireability threshold of 70%.
            </p>
          </div>
        </div>

        {/* Right Card: Extracted Resume Info */}
        <div className="glass-panel features-panel">
          <h3>Extracted Features Card</h3>

          <div className="features-list">
            {/* Experience */}
            <div className="feature-item">
              <div className="feature-icon-box purple">
                <Briefcase style={{ width: '1.2rem', height: '1.2rem' }} />
              </div>
              <div className="feature-details">
                <span className="label">Experience Years</span>
                <span className="value">
                  {extracted_features.experience_years} {extracted_features.experience_years === 1 ? 'Year' : 'Years'}
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="feature-item">
              <div className="feature-icon-box cyan">
                <GraduationCap style={{ width: '1.2rem', height: '1.2rem' }} />
              </div>
              <div className="feature-details">
                <span className="label">Education Level (Mapped)</span>
                <span className="value">
                  {extracted_features.education_name} <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontWeight: 500 }}>(Level {extracted_features.education_level})</span>
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="feature-item">
              <div className="feature-icon-box emerald">
                <Code2 style={{ width: '1.2rem', height: '1.2rem' }} />
              </div>
              <div className="feature-details">
                <span className="label">Skill Matches</span>
                <span className="value">
                  {extracted_features.skill_count} unique keywords
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Alternative Recommendations Section */}
      <div className="glass-panel recs-panel">
        <h3>Alternative Career Recommendations</h3>
        <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '-0.3rem' }}>
          Reconstructed collaborative filtering matrix indicates strong latent alignment with these fields:
        </p>

        <div className="recs-grid" style={{ marginTop: '0.4rem' }}>
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((rec, idx) => (
              <div key={idx} className="rec-card">
                <div className="rec-header">
                  <span>{rec.role}</span>
                  <ArrowUpRight style={{ width: '0.8rem', height: '0.8rem', color: 'var(--color-muted)', flexShrink: 0 }} />
                </div>
                
                <div className="rec-score-wrapper">
                  <div className="rec-score-label">
                    <span className="txt">Match score</span>
                    <span className="val">{Math.round(rec.score * 100)}%</span>
                  </div>
                  {/* Small visual bar */}
                  <div className="rec-bar-bg">
                    <div 
                      className="rec-bar-fill" 
                      style={{ width: `${rec.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '1rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              No alternative recommendations available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

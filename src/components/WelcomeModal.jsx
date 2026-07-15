import './WelcomeModal.css';

export default function WelcomeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="welcome-overlay" onClick={onClose}>
      <div className="welcome-clouds" aria-hidden="true">
        <span className="cloud cloud-1" />
        <span className="cloud cloud-2" />
        <span className="cloud cloud-3" />
        <span className="cloud cloud-4" />
      </div>

      <div
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="welcome-aura" aria-hidden="true" />
        <h1 className="welcome-title">San Lucas-Piso 12</h1>
        <p className="welcome-text">
          Bienvenido a este recorrido, conoce este apto totalmente nuevo, si te
          gusta y estas interesad@, comunicate conmigo +57 3108056083
        </p>
        <button className="welcome-btn" onClick={onClose}>
          Comenzar recorrido
        </button>
      </div>
    </div>
  );
}

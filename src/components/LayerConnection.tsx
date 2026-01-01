export function LayerConnection() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection lines representing the flow between layers */}
        <path
          d="M 100 100 Q 200 150 300 100 T 500 100"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          fill="none"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 1000"
            to="1000 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        <path
          d="M 200 200 Q 400 250 600 200 T 800 200"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          fill="none"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 1000"
            to="1000 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

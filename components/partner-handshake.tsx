"use client"

import React, { useState } from "react"

type Props = {
  /** Path to the left partner logo image (e.g., "/logos/partner1.png") */
  leftSrc?: string
  /** Path to the right partner logo image (e.g., "/logos/partner2.png") */
  rightSrc?: string
  /** Size of the logo containers in pixels */
  size?: number
}

export default function PartnerHandshake({ 
  leftSrc = "/logo.png", 
  rightSrc = "/IIT_Kharagpur_Logo.svg.png", 
  size = 100 
}: Props) {
  const [leftImgError, setLeftImgError] = useState(false)
  const [rightImgError, setRightImgError] = useState(false)

  const handSize = size * 0.5 // Make hands proportional but prominent
  const logoGap = size * 0.8 // Gap between logos

  return (
    <div className="mt-2 flex items-center justify-center">
      <div className="relative flex items-center" style={{ gap: `${logoGap}px`, alignItems: 'center' }}>
        {/* Left Logo Container */}
        <div className="partner-logo-container relative z-20">
          <div 
            className="partner-logo left-logo rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-2xl border-2 border-white/30" 
            style={{ 
              width: size, 
              height: size,
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))'
            }}
          >
            <img 
              src={leftImgError ? '/placeholder-logo.png' : leftSrc} 
              alt="Left partner logo" 
              className="w-[90%] h-[90%] object-contain" 
              onError={() => setLeftImgError(true)}
              style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
          
          {/* Left Professional Hand - Extending from logo */}
          <div 
            className="absolute left-full top-1/2 -translate-y-1/2 z-30"
            style={{ 
              marginLeft: `${size * 0.1}px`,
              transform: 'translateY(-50%)'
            }}
          >
            <svg
              className="hand-left"
              width={handSize * 1.2}
              height={handSize * 1.2}
              viewBox="0 0 120 120"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
                animation: 'extend-left-hand 2.5s ease-in-out infinite',
                transformOrigin: 'left center'
              }}
            >
              {/* Realistic left hand in handshake position */}
              <g transform="translate(5, 15)">
                {/* Wrist */}
                <ellipse cx="12" cy="75" rx="6" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                
                {/* Palm - main body */}
                <path d="M 8 70 Q 8 65 12 60 Q 20 55 28 58 Q 32 60 32 65 Q 32 70 28 72 Q 20 75 12 75 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                
                {/* Thumb */}
                <path d="M 28 58 Q 32 50 38 48 Q 42 48 40 52 Q 38 55 34 58 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="38" cy="50" rx="5" ry="6" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Index finger */}
                <path d="M 30 60 Q 32 50 35 40 Q 36 35 38 35 Q 36 38 36 42 Q 34 48 32 55 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="36" cy="37" rx="3.5" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Middle finger - longest */}
                <path d="M 32 60 Q 35 48 38 35 Q 39 30 41 30 Q 39 33 39 37 Q 37 45 34 55 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="39" cy="32" rx="3.5" ry="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Ring finger */}
                <path d="M 34 62 Q 37 52 40 42 Q 41 38 43 38 Q 41 41 41 45 Q 39 50 36 58 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="41" cy="40" rx="3" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Pinky */}
                <path d="M 36 64 Q 38 56 40 48 Q 40 46 42 46 Q 40 48 40 50 Q 38 54 37 60 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="40" cy="47" rx="2.5" ry="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Palm crease lines */}
                <path d="M 15 65 Q 20 66 25 65" stroke="#F59E0B" strokeWidth="1.2" fill="none" opacity="0.5" />
                <path d="M 15 68 Q 20 69 25 68" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.4" />
              </g>
            </svg>
          </div>
        </div>

        {/* Handshake Center - Where hands meet */}
        <div 
          className="handshake-container relative z-40"
          style={{ 
            width: `${handSize * 0.8}px`, 
            height: `${handSize * 0.8}px`,
            margin: `0 ${size * 0.05}px`
          }}
        >
          {/* Glowing handshake connection effect */}
          <svg 
            className="handshake-icon" 
            viewBox="0 0 100 100"
            style={{ 
              width: '100%', 
              height: '100%',
              animation: 'handshake-glow 2.5s ease-in-out infinite'
            }}
          >
            {/* Connection sparkles */}
            <circle cx="50" cy="50" r="8" fill="#F59E0B" opacity="0.8">
              <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="45" r="3" fill="#FCD34D" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="55" cy="55" r="3" fill="#FCD34D" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          </svg>
          
          {/* Additional glow effect */}
          <div 
            className="absolute inset-0 rounded-full bg-amber-400/40 blur-lg"
            style={{
              animation: 'pulse-glow 2.5s ease-in-out infinite'
            }}
          />
        </div>

        {/* Right Logo Container */}
        <div className="partner-logo-container relative z-20">
          {/* Right Professional Hand - Extending from logo */}
          <div 
            className="absolute right-full top-1/2 -translate-y-1/2 z-30"
            style={{ 
              marginRight: `${size * 0.1}px`,
              transform: 'translateY(-50%)'
            }}
          >
            <svg
              className="hand-right"
              width={handSize * 1.2}
              height={handSize * 1.2}
              viewBox="0 0 120 120"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
                animation: 'extend-right-hand 2.5s ease-in-out infinite',
                transformOrigin: 'right center'
              }}
            >
              {/* Realistic right hand in handshake position (mirrored) */}
              <g transform="translate(115, 15) scale(-1, 1)">
                {/* Wrist */}
                <ellipse cx="12" cy="75" rx="6" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                
                {/* Palm - main body */}
                <path d="M 8 70 Q 8 65 12 60 Q 20 55 28 58 Q 32 60 32 65 Q 32 70 28 72 Q 20 75 12 75 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                
                {/* Thumb */}
                <path d="M 28 58 Q 32 50 38 48 Q 42 48 40 52 Q 38 55 34 58 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="38" cy="50" rx="5" ry="6" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Index finger */}
                <path d="M 30 60 Q 32 50 35 40 Q 36 35 38 35 Q 36 38 36 42 Q 34 48 32 55 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="36" cy="37" rx="3.5" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Middle finger - longest */}
                <path d="M 32 60 Q 35 48 38 35 Q 39 30 41 30 Q 39 33 39 37 Q 37 45 34 55 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="39" cy="32" rx="3.5" ry="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Ring finger */}
                <path d="M 34 62 Q 37 52 40 42 Q 41 38 43 38 Q 41 41 41 45 Q 39 50 36 58 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="41" cy="40" rx="3" ry="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Pinky */}
                <path d="M 36 64 Q 38 56 40 48 Q 40 46 42 46 Q 40 48 40 50 Q 38 54 37 60 Z" 
                      fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="40" cy="47" rx="2.5" ry="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
                
                {/* Palm crease lines */}
                <path d="M 15 65 Q 20 66 25 65" stroke="#F59E0B" strokeWidth="1.2" fill="none" opacity="0.5" />
                <path d="M 15 68 Q 20 69 25 68" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.4" />
              </g>
            </svg>
          </div>

          <div 
            className="partner-logo right-logo rounded-lg overflow-hidden bg-white p-2 flex items-center justify-center shadow-2xl border-2 border-white/30" 
            style={{ 
              width: size, 
              height: size,
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))'
            }}
          >
            <img 
              src={rightImgError ? '/placeholder-logo.png' : rightSrc} 
              alt="Right partner logo" 
              className="w-[90%] h-[90%] object-contain" 
              onError={() => setRightImgError(true)}
              style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .partner-logo { 
          transform-origin: center; 
          will-change: transform;
          transition: transform 0.3s ease;
        }
        
        .left-logo { 
          animation: shake-left 2.5s ease-in-out infinite;
        }
        
        .right-logo { 
          animation: shake-right 2.5s ease-in-out infinite;
        }

        .handshake-icon { 
          will-change: transform, opacity;
        }

        @keyframes shake-left {
          0%, 100% { transform: translateX(0) rotate(0deg) scale(1); }
          25% { transform: translateX(3px) rotate(-5deg) scale(1.02); }
          35% { transform: translateX(1px) rotate(-2deg) scale(1.01); }
          45% { transform: translateX(3px) rotate(-5deg) scale(1.02); }
          55% { transform: translateX(0) rotate(0deg) scale(1); }
        }

        @keyframes shake-right {
          0%, 100% { transform: translateX(0) rotate(0deg) scale(1); }
          25% { transform: translateX(-3px) rotate(5deg) scale(1.02); }
          35% { transform: translateX(-1px) rotate(2deg) scale(1.01); }
          45% { transform: translateX(-3px) rotate(5deg) scale(1.02); }
          55% { transform: translateX(0) rotate(0deg) scale(1); }
        }

        @keyframes extend-left-hand {
          0%, 100% { 
            transform: translateX(0) translateY(-50%) scale(0.9) rotate(-5deg);
            opacity: 0.8;
          }
          20%, 50% { 
            transform: translateX(25px) translateY(-50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          35% { 
            transform: translateX(30px) translateY(-50%) scale(1.05) rotate(2deg);
            opacity: 1;
          }
        }

        @keyframes extend-right-hand {
          0%, 100% { 
            transform: translateX(0) translateY(-50%) scale(0.9) rotate(5deg);
            opacity: 0.8;
          }
          20%, 50% { 
            transform: translateX(-25px) translateY(-50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          35% { 
            transform: translateX(-30px) translateY(-50%) scale(1.05) rotate(-2deg);
            opacity: 1;
          }
        }

        @keyframes handshake-glow {
          0%, 100% { 
            opacity: 0.9; 
            transform: scale(0.95);
          }
          25%, 50% { 
            opacity: 1; 
            transform: scale(1.1);
          }
          35% { 
            opacity: 1; 
            transform: scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}

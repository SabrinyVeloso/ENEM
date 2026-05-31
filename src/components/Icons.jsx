import React from 'react';

function IconBase({ children, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export function SparkIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.6 5.1L19 10l-5.4 1.9L12 17l-1.6-5.1L5 10l5.4-1.9L12 3z" />
    </IconBase>
  );
}

export function HomeIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10.5V19h12v-8.5" />
      <path d="M9.5 19v-5h5v5" />
    </IconBase>
  );
}

export function BookIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M6.5 4.5h9.2A2.3 2.3 0 0 1 18 6.8V20H8.2A2.7 2.7 0 0 0 5.5 22v-15A2.5 2.5 0 0 1 8 4.5Z" />
      <path d="M8.5 8h6.8" />
      <path d="M8.5 11h6.8" />
    </IconBase>
  );
}

export function PenIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M4.5 19.5h4l10-10a2.2 2.2 0 0 0 0-3.1l-1-1a2.2 2.2 0 0 0-3.1 0l-10 10v4Z" />
      <path d="M13.5 6.5l4 4" />
    </IconBase>
  );
}

export function ExerciseIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M7 5h10v14H7z" />
      <path d="M9.5 9h5" />
      <path d="M9.5 12h5" />
      <path d="M9.5 15h3.5" />
    </IconBase>
  );
}

export function ChartIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M5 19h14" />
      <path d="M7 16V9" />
      <path d="M12 16V6" />
      <path d="M17 16v-5" />
    </IconBase>
  );
}

export function VideoIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M5 8.5A1.5 1.5 0 0 1 6.5 7h8A1.5 1.5 0 0 1 16 8.5v7a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 15.5v-7Z" />
      <path d="M16 10l4-2v8l-4-2.2" />
    </IconBase>
  );
}

export function SettingsIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M10 4.5h4" />
      <path d="M12 4.5v3" />
      <path d="M6.5 7.5 8 10" />
      <path d="M4.5 12h3" />
      <path d="M6.5 16.5 8 14" />
      <path d="M10 19.5h4" />
      <path d="M12 19.5v-3" />
      <path d="M17.5 16.5 16 14" />
      <path d="M19.5 12h-3" />
      <path d="M17.5 7.5 16 10" />
      <circle cx="12" cy="12" r="2.5" />
    </IconBase>
  );
}

export function RefreshIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.7-5.2L19 8.6" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.7 5.2L5 15.4" />
      <path d="M18.8 4.5v4.2h-4.2" />
      <path d="M5.2 19.5v-4.2h4.2" />
    </IconBase>
  );
}

export function WifiIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M5 9a11 11 0 0 1 14 0" />
      <path d="M8 12a7 7 0 0 1 8 0" />
      <path d="M11 15a3 3 0 0 1 2 0" />
      <path d="M12 18h.01" />
    </IconBase>
  );
}

export function OfflineIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M5 9a11 11 0 0 1 6.5-2.2" />
      <path d="M19 9a11 11 0 0 0-2.4-1.5" />
      <path d="M8.5 12a7 7 0 0 1 2.2-1" />
      <path d="M15.5 12a7 7 0 0 0-1.9-.8" />
      <path d="M11.8 15.2a3 3 0 0 1 1.2-.2" />
      <path d="m4 4 16 16" />
    </IconBase>
  );
}

export function MenuIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </IconBase>
  );
}

export function SunIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 4.5v2" />
      <path d="M12 17.5v2" />
      <path d="M4.5 12h2" />
      <path d="M17.5 12h2" />
      <path d="m6.2 6.2 1.4 1.4" />
      <path d="m16.4 16.4 1.4 1.4" />
      <path d="m17.8 6.2-1.4 1.4" />
      <path d="m7.6 16.4-1.4 1.4" />
    </IconBase>
  );
}

export function MoonIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M16 14.4A7 7 0 0 1 9.6 4a8 8 0 1 0 10.4 10.4A7 7 0 0 1 16 14.4Z" />
    </IconBase>
  );
}
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-3">{children}</div>;
}

export function CardTitle({ children }) {
  return (
    <h3 className="text-lg font-semibold text-slate-800">{children}</h3>
  );
}

export function CardContent({ children }) {
  return <div className="text-slate-600">{children}</div>;
}

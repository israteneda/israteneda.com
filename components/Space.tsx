import React from "react";

export default function Space({ size = "1rem" }: { size?: string }) {
  return <div style={{ height: size, display: 'block' }} />;
} 
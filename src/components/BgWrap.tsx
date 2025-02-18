import React from 'react';
import '../styles/Wrapper.css'

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <div>{children}</div>;
}


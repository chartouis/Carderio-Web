import React from 'react';
import '../styles/Wrapper.css'

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return <div>{children}</div>;
}

export default Wrapper;
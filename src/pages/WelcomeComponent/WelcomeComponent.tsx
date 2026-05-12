import React from 'react'
import { Outlet } from 'react-router-dom';

export default function WelcomeComponent() {
  return <div>
    WelcomeComponent 
    <Outlet/></div>;
}

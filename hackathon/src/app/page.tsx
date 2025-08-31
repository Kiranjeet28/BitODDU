"use client";
import PlacementHero from '@/components/main/banner/placement-hero';
import Home from '@/components/main/placement/main';
import React from 'react';

const Page: React.FC = () => {
  return (
    <main>
      <PlacementHero/>
      <Home/>
    </main>
  );
};

export default Page;
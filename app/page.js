import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import WithWithout from '@/components/WithWithout';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 py-8 sm:py-12">
            <Hero />
            <Problem />
            <FeaturesAccordion />
            <WithWithout />
            <FAQ />
            <CTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
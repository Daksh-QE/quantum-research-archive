"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Rocket, BookOpen, Code, Heart } from "lucide-react";

export default function StartPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pt-8">
      <h1 className="text-3xl font-bold text-slate-900">Welcome to Quantum Computing</h1>
      <p className="text-slate-600">In plain English: quantum computing uses the strange properties of particles like atoms and photons to solve certain problems exponentially faster than classical computers. Instead of bits (0 or 1), quantum computers use qubits that can be both 0 and 1 at the same time.</p>
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 border border-indigo-100">
        <p className="text-sm text-slate-700 font-medium mb-2">🎥 First, watch this quick 7-minute introduction:</p>
        <a href="https://www.youtube.com/watch?v=p9pPjASnnxw" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center gap-1">Some light quantum mechanics →</a>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Choose your path:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/overview" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
          <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="font-semibold text-slate-900">I&apos;m a student</h3>
          <p className="text-xs text-slate-500 mt-1">Start with the full curriculum from math foundations up.</p>
          <span className="text-xs text-blue-600 font-medium mt-2 inline-flex items-center gap-1">Start learning <ArrowRight className="w-3 h-3" /></span>
        </Link>
        <Link href="/quantum-sandbox" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
          <Code className="w-6 h-6 text-emerald-600 mb-2" />
          <h3 className="font-semibold text-slate-900">I&apos;m a developer</h3>
          <p className="text-xs text-slate-500 mt-1">Jump straight into building circuits in the Quantum Sandbox.</p>
          <span className="text-xs text-emerald-600 font-medium mt-2 inline-flex items-center gap-1">Play with circuits <ArrowRight className="w-3 h-3" /></span>
        </Link>
        <Link href="/overview" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
          <Heart className="w-6 h-6 text-rose-600 mb-2" />
          <h3 className="font-semibold text-slate-900">I&apos;m just curious</h3>
          <p className="text-xs text-slate-500 mt-1">Explore articles, videos, and what makes quantum computing exciting.</p>
          <span className="text-xs text-rose-600 font-medium mt-2 inline-flex items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
        </Link>
      </div>
      <div className="text-center pt-4">
        <Link href="/overview" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">Get Started <ArrowRight className="w-3.5 h-3.5" /></Link>
      </div>
    </div>
  );
}

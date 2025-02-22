import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { useStoryStore } from '../store/storyStore';

export function LandingPage() {
  const navigate = useNavigate();
  const [premise, setPremise] = useState('');
  const { setPremise: setStorePremise } = useStoryStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStorePremise(premise);
    navigate('/beat-sheet');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-blue-100 rounded-full">
              <PenLine className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
            Story Beat Sheet
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Transform your story idea into a structured beat sheet using AI-powered assistance
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="premise" className="block text-lg font-medium text-gray-900 mb-4">
                  Enter Your Story Premise
                </label>
                <textarea
                  id="premise"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="A young wizard discovers he's destined to defeat a dark lord..."
                  value={premise}
                  onChange={(e) => setPremise(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition-colors"
              >
                Generate Beat Sheet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
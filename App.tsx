
import React, { useState, useCallback } from 'react';
import { PROMPT_DATA } from './constants';
import { generateMugImage } from './services/geminiService';
import Button from './components/Button';
import PromptDisplay from './components/PromptDisplay';
import ImageDisplay from './components/ImageDisplay';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pick = <T,>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const handleGeneratePrompt = useCallback(() => {
    const newPrompt = [
      "festive holiday mug illustration::2",
      pick(PROMPT_DATA.toppings),
      pick(PROMPT_DATA.characters),
      pick(PROMPT_DATA.mug_styles),
      pick(PROMPT_DATA.surroundings),
      pick(PROMPT_DATA.backgrounds),
      pick(PROMPT_DATA.style_tags),
      pick(PROMPT_DATA.lighting),
      pick(PROMPT_DATA.extras)
    ].join(", ") + " --ar 3:4";

    setPrompt(newPrompt);
    setImageUrl('');
    setError(null);
  }, []);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt) return;

    setIsLoading(true);
    setError(null);
    setImageUrl('');

    try {
      const generatedImageUrl = await generateMugImage(prompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      console.error("Image generation failed:", err);
      setError("Oops! Couldn't create the image. Please try a different prompt.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-warm-beige font-sans text-gray-800 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-festive-red tracking-wide">
            Holiday Mug Prompt Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Design your perfect festive mug with a little help from AI!
          </p>
        </header>

        <main className="bg-snow-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleGeneratePrompt} disabled={isLoading}>
                  🎁 Generate New Prompt
                </Button>
                <Button 
                  onClick={handleGenerateImage} 
                  disabled={!prompt || isLoading} 
                  variant="secondary">
                  ✨ Generate Image
                </Button>
              </div>
              
              <PromptDisplay prompt={prompt} />
            </div>

            <div className="md:w-1/2 flex items-center justify-center">
              <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} error={error} />
            </div>
          </div>
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by React, Tailwind CSS, and the Google Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

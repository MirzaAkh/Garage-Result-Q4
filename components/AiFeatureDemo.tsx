import React, { useState, useRef } from 'react';
import Section from './Section';
import { Sparkles, Upload, Loader2, ArrowRight } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

const AiFeatureDemo: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await editImageWithGemini(image, prompt);
      setGeneratedImage(result);
    } catch (err) {
      setError("Не удалось обработать изображение. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLoad = () => {
     // Load a placeholder car image for quick demo
     setImage("https://picsum.photos/id/111/800/600"); 
     setPrompt("Добавь неоновую подсветку в стиле киберпанк");
  };

  return (
    <Section className="bg-garage-black border-y border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 text-purple-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI Garage Studio • Gemini 2.5 Flash</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Редактируй фото<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-garage-blue to-purple-500">силой мысли</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Новая функция для пользователей: загрузите фото своего авто и примерьте любой тюнинг или окружение с помощью текстовых команд.
          </p>
          
          <div className="space-y-4">
             <div className="flex gap-4">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Например: Сделай фон марсианским пейзажем..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-garage-blue transition-colors"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading || !image || !prompt}
                  className="bg-garage-blue text-black font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  Generate
                </button>
             </div>
             <p className="text-xs text-gray-500">Powered by Google Gemini 2.5 Flash Image Model</p>
          </div>
        </div>

        {/* Interactive Area */}
        <div className="bg-garage-card rounded-3xl p-2 border border-white/10 shadow-2xl relative min-h-[400px] flex items-center justify-center">
          {!image ? (
            <div className="text-center p-8">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => fileInputRef.current?.click()}>
                 <Upload className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Загрузите фото</h3>
               <p className="text-gray-500 mb-6">или используйте демо</p>
               <button onClick={handleDemoLoad} className="text-garage-blue hover:text-white underline underline-offset-4">Загрузить демо-авто</button>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
               {generatedImage ? (
                 <div className="relative w-full h-full">
                    <img src={generatedImage} alt="AI Generated" className="w-full h-auto object-cover rounded-2xl" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-garage-blue border border-garage-blue/30">
                      AI Result
                    </div>
                    <button onClick={() => setGeneratedImage(null)} className="absolute bottom-4 left-4 bg-black/60 hover:bg-black text-white px-4 py-2 rounded-lg text-sm backdrop-blur">
                      Назад к оригиналу
                    </button>
                 </div>
               ) : (
                 <div className="relative w-full h-full">
                    <img src={image} alt="Original" className="w-full h-auto object-cover rounded-2xl" />
                    {isLoading && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                        <Loader2 className="w-12 h-12 text-garage-blue animate-spin mb-4" />
                        <p className="text-garage-blue font-mono animate-pulse">AI думает...</p>
                      </div>
                    )}
                    <button onClick={() => { setImage(null); setGeneratedImage(null); }} className="absolute top-4 right-4 bg-black/60 hover:bg-red-500/20 text-white p-2 rounded-full transition-colors">
                      ✕
                    </button>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default AiFeatureDemo;
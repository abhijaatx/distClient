import React, { useState } from 'react';

const GenerationControls = ({ onGenerate, disabled }) => {
    const [questionCount, setQuestionCount] = useState(40);
    const [difficulty, setDifficulty] = useState('Medium');
    const [selectedModel, setSelectedModel] = useState('t5-small-dgrace');

    const distractorModels = [
        { id: 't5-base-dgrace', name: 'Base DGrace (High Quality)' },
        { id: 't5-small-dgrace', name: 'Small DGrace (Fastest)' },
        { id: 't5-base-sciq', name: 'Base SciQ (Scientific)' },
        { id: 't5-small-sciq', name: 'Small SciQ (Scientific Fast)' },
        { id: 't5-base-dgrace-sciq', name: 'Base Mixed (DGrace + SciQ)' },
        { id: 't5-small-dgrace-sciq', name: 'Small Mixed (DGrace + SciQ)' },
    ];

    // Inside GenerationControls.jsx
    const handleGenerate = () => {
        onGenerate({
            questionCount: questionCount, // should be a number
            difficulty: difficulty,       // should be "Medium", "Hard", etc.
            version: selectedModel        // MUST be "t5-small-dgrace", etc.
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-light text-gray-900">Configuration</h3>
                    <p className="text-xs text-gray-500 mt-1">Customize your test and model parameters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Questions</label>
                            <span className="text-sm font-mono font-medium text-black bg-gray-100 px-2 py-1 rounded">{questionCount}</span>
                        </div>
                        <input
                            type="range" min="1" max="100"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Difficulty</label>
                            <div className="relative">
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-black"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Distractor AI</label>
                            <div className="relative">
                                <select
                                    value={selectedModel}
                                    onChange={(e) => {
                                        console.log("UI: Dropdown selection changed to:", e.target.value);
                                        setSelectedModel(e.target.value);
                                    }}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg p-2.5 outline-none focus:border-black"
                                >
                                    {distractorModels.map((model) => (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={handleGenerate}
                        disabled={disabled}
                        className={`w-full py-3 px-4 rounded-lg text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 shadow-lg active:scale-[0.99]'
                            }`}
                    >
                        {disabled ? 'Generating...' : 'Generate Questions'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenerationControls;
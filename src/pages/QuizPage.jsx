import React, { useState } from 'react';
import FileUploader from '../components/FileUploader/FileUploader';
import GenerationControls from '../components/GenerationControls/GenerationControls';
import QuestionCard from '../components/Editor/QuestionCard';
import ExportToolbar from '../components/Editor/ExportToolbar';

const QuizPage = () => {
    const [files, setFiles] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddFile = (newFile) => setFiles((prev) => [...prev, newFile]);
    const handleRemoveFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

    const handleGenerateRequest = async (settings) => {
        console.log("🛠️ Received Settings:", settings);

        if (files.length === 0) {
            alert("Please upload content first.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            // 1. Append basic fields - Ensure they are strings and not undefined
            formData.append("question_count", String(settings.questionCount || 20));
            formData.append("difficulty", String(settings.difficulty || "Medium"));

            // CRITICAL: Ensure version is a valid string from our Kaggle map
            const modelVersion = settings.version || "t5-base-dgrace";
            formData.append("version", String(modelVersion));

            // 2. Handle Binary Files - Check originalFile exists before appending
            const binaryFiles = files.filter(f => f.originalFile);
            binaryFiles.forEach(f => {
                if (f.originalFile instanceof File) {
                    formData.append("files", f.originalFile);
                }
            });

            // 3. Handle Text Content - Ensure it's a valid string
            const textContent = files
                .filter(f => f.content && typeof f.content === 'string')
                .map(f => f.content)
                .join("\n\n");

            if (textContent.trim().length > 0) {
                formData.append("text_input", textContent);
            }

            // 4. Execute Fetch
            // Note: We do NOT set 'Content-Type' header manually; 
            // the browser must set it to include the multipart boundary.
            const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

            const response = await fetch(`${API_BASE}/generate`, {
                method: "POST",
                body: formData,
            });


            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Server Error: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.questions) {
                setQuestions(data.questions);
            } else {
                throw new Error("The server responded successfully but sent no questions.");
            }

        } catch (err) {
            console.error("🚨 QuizPage Error:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setQuestions([]);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 relative">
            {isLoading && (
                <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                    <p className="text-gray-600 font-medium uppercase tracking-widest">Generating Quiz</p>
                    <p className="text-xs text-gray-400 mt-2 font-mono">This may take upto a minute...</p>
                </div>
            )}

            <header className="bg-white border-b border-gray-100 py-6 mb-10 text-center">
                <h1 className="text-2xl font-light tracking-tight text-black">Question Generator</h1>
            </header>

            <main className="max-w-3xl mx-auto px-4">
                {questions.length === 0 ? (
                    <div className="space-y-10">
                        <FileUploader files={files} onFileAdd={handleAddFile} onRemove={handleRemoveFile} />
                        {files.length > 0 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <GenerationControls onGenerate={handleGenerateRequest} disabled={isLoading} />
                            </div>
                        )}
                        {error && (
                            <div className="text-center text-red-500 text-sm p-4 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-light">Results ({questions.length})</h2>
                            <button onClick={handleStartOver} className="text-xs text-red-500 font-bold uppercase tracking-tighter">
                                Start Over
                            </button>
                        </div>
                        <div className="space-y-6">
                            {questions.map((q, idx) => (
                                <QuestionCard
                                    key={idx} index={idx} questionData={q}
                                    onUpdate={(i, updated) => {
                                        const newQ = [...questions];
                                        newQ[i] = updated;
                                        setQuestions(newQ);
                                    }}
                                    onDelete={(i) => setQuestions(questions.filter((_, idx) => idx !== i))}
                                />
                            ))}
                        </div>
                        <ExportToolbar questions={questions} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default QuizPage;
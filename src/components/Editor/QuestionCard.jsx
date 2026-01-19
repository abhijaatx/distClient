import React from 'react';

const QuestionCard = ({ questionData, index, onUpdate, onDelete }) => {

    const handleQuestionChange = (e) => {
        const updated = { ...questionData, question: e.target.value };
        onUpdate(index, updated);
    };

    const handleOptionChange = (optIndex, newText) => {
        const updatedOptions = [...questionData.answers];
        updatedOptions[optIndex] = { ...updatedOptions[optIndex], answer: newText };
        onUpdate(index, { ...questionData, answers: updatedOptions });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow group">

            {/* Header: Question Number & Delete Button */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Question {index + 1}
                </span>

                {/* --- DELETE BUTTON --- */}
                <button
                    onClick={() => onDelete(index)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                    title="Remove this question"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Editable Question Stem */}
            <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase">
                    Stem
                </label>
                <textarea
                    rows={2}
                    value={questionData.question}
                    onChange={handleQuestionChange}
                    className="w-full text-lg font-medium text-gray-900 border-b border-gray-200 focus:border-black focus:outline-none bg-transparent transition-colors resize-none leading-relaxed"
                />
            </div>

            {/* Options List */}
            <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase">
                    Options & Distractors
                </label>

                {questionData.answers.map((option, idx) => (
                    <div
                        key={idx}
                        className={`
              relative flex items-center p-3 rounded-lg border 
              ${option.correct
                                ? 'bg-gray-50 border-black ring-1 ring-black'
                                : 'bg-white border-gray-200'
                            }
            `}
                    >
                        {/* Checkmark/Circle Icon */}
                        <div className="mr-4 flex-shrink-0">
                            {option.correct ? (
                                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                            ) : (
                                <div className="w-6 h-6 border-2 border-gray-200 rounded-full"></div>
                            )}
                        </div>

                        {/* Editable Text */}
                        <input
                            type="text"
                            value={option.answer}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400"
                        />

                        {/* Similarity Badge */}


                        {/* Correct Label */}
                        {option.correct && (
                            <span className="ml-3 text-[10px] font-bold uppercase tracking-wider text-black">
                                Correct
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
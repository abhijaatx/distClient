import React from 'react';

const ExportToolbar = ({ questions }) => {

    // --- Logic: Download as JSON ---
    const downloadJSON = () => {
        const dataStr = JSON.stringify(questions, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `questions_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- Logic: Download as CSV ---
    const downloadCSV = () => {
        // 1. Create CSV Header
        let csvContent = "Question,Correct Answer,Distractors\n";

        // 2. Loop through questions to create rows
        questions.forEach(q => {
            // Escape quotes to prevent CSV breakage
            const safeQuestion = `"${q.question.replace(/"/g, '""')}"`;

            const correctAns = q.answers.find(a => a.correct)?.answer || "";
            const safeCorrect = `"${correctAns.replace(/"/g, '""')}"`;

            // Join all distractors with a pipe | or semicolon ;
            const distractors = q.answers
                .filter(a => !a.correct)
                .map(a => a.answer)
                .join(" | ");
            const safeDistractors = `"${distractors.replace(/"/g, '""')}"`;

            csvContent += `${safeQuestion},${safeCorrect},${safeDistractors}\n`;
        });

        // 3. Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `questions_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    };

    return (
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
                onClick={downloadJSON}
                className="flex-1 py-3 border border-black text-black text-sm font-semibold uppercase tracking-widest rounded hover:bg-gray-50 transition-colors"
            >
                Download JSON
            </button>

            <button
                onClick={downloadCSV}
                className="flex-1 py-3 bg-black text-white text-sm font-semibold uppercase tracking-widest rounded hover:bg-gray-800 transition-colors shadow-lg"
            >
                Download CSV
            </button>
        </div>
    );
};

export default ExportToolbar;
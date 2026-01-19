
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ files, onFileAdd, onRemove }) => {
    const [activeTab, setActiveTab] = useState('upload');
    const [textInput, setTextInput] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const newFile = {
                name: file.name,
                originalFile: file,
                preview: URL.createObjectURL(file)
            };

            if (onFileAdd) onFileAdd(newFile);
        });
    }, [onFileAdd]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // --- UPDATED: Add support for Office & HTML files ---
        accept: {
            'text/plain': ['.txt', '.md', '.csv'],
            'text/html': ['.html', '.htm'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        multiple: true
    });

    const handleTextSubmit = () => {
        if (!textInput.trim()) return;
        const newFile = {
            name: `Pasted Text ${new Date().toLocaleTimeString()}`,
            content: textInput,
            type: 'text'
        };
        if (onFileAdd) onFileAdd(newFile);
        setTextInput('');
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Tabs */}
            <div className="flex mb-6 border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('upload')}
                    className={`pb-2 px-4 text-sm font-medium transition-colors ${activeTab === 'upload' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Upload File
                </button>
                <button
                    onClick={() => setActiveTab('paste')}
                    className={`pb-2 px-4 text-sm font-medium transition-colors ${activeTab === 'paste' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Paste Text
                </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
                <div {...getRootProps()} className={`h-72 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${isDragActive ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'}`}>
                    <input {...getInputProps()} />
                    <div className="text-center space-y-3">
                        <div className={`text-4xl font-thin transition-colors ${isDragActive ? 'text-black' : 'text-gray-300'}`}>+</div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">Drag & drop files</p>
                            {/* UPDATED: Display new formats */}
                            <p className="text-xs text-gray-400">
                                Supports .pdf, .docx, .txt, .md,
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Paste Tab */}
            {activeTab === 'paste' && (
                <div className="h-72 flex flex-col bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Paste your text content here..."
                        className="flex-1 w-full p-3 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    />
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={handleTextSubmit}
                            disabled={!textInput.trim()}
                            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all"
                        >
                            Add Text
                        </button>
                    </div>
                </div>
            )}

            {/* File List */}
            {files && files.length > 0 && (
                <div className="mt-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Inputs</h4>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{files.length}</span>
                    </div>
                    <ul className="space-y-2">
                        {files.map((file, idx) => (
                            <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-colors group">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <div className="w-2 h-2 rounded-full bg-black"></div>
                                    <span className="text-sm text-gray-600 truncate font-medium">{file.name}</span>
                                </div>
                                <button onClick={() => onRemove(idx)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100">✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
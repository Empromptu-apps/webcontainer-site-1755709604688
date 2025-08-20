import React, { useState } from 'react';

const WordInput = ({ word, setWord, onGenerate, loading, error }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const text = e.dataTransfer.getData('text/plain');
    if (text) {
      const words = text.trim().split(/\s+/);
      setWord(words[0] || '');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && word.trim()) {
      onGenerate();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Transform a Word into a Story
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Enter any word and watch it become the heart of a unique short story
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 mb-6 transition-all duration-200 ${
          dragOver 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">ð</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop text here, or type a word below
          </p>
          
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value.split(' ')[0])}
              onKeyPress={handleKeyPress}
              placeholder="Enter a single word..."
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={loading}
              aria-label="Enter a word to generate a story"
              aria-describedby="word-help"
            />
            <p id="word-help" className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Only the first word will be used if you enter multiple words
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">â ï¸</div>
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={onGenerate}
          disabled={loading || !word.trim()}
          className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
            loading || !word.trim()
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
          aria-label="Generate story from word"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="spinner mr-3"></div>
              Generating Story...
            </div>
          ) : (
            'â¨ Create Story'
          )}
        </button>
      </div>

      {/* Character Count */}
      {word && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Word: "{word}" ({word.length} characters)
          </p>
        </div>
      )}
    </div>
  );
};

export default WordInput;

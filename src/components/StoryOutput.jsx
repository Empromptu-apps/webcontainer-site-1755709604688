import React, { useState } from 'react';

const StoryOutput = ({ word, story, onReset }) => {
  const [expanded, setExpanded] = useState(true);

  const downloadStory = () => {
    const element = document.createElement('a');
    const file = new Blob([`Story based on: "${word}"\n\n${story}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `story-${word.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(story);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your Story: "{word}"
            </h2>
            <p className="text-primary-100">
              {story.split(' ').length} words â¢ {story.length} characters
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={copyToClipboard}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
              aria-label="Copy story to clipboard"
              title="Copy to clipboard"
            >
              ð
            </button>
            <button
              onClick={downloadStory}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
              aria-label="Download story as text file"
              title="Download as text file"
            >
              ð¾
            </button>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="p-8">
        <div className="mb-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-expanded={expanded}
            aria-controls="story-content"
          >
            <span className={`mr-2 transition-transform ${expanded ? 'rotate-90' : ''}`}>
              â¶ï¸
            </span>
            <span className="font-semibold">Story Content</span>
          </button>
        </div>

        {expanded && (
          <div 
            id="story-content"
            className="prose prose-lg dark:prose-invert max-w-none"
            aria-describedby="story-description"
          >
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div 
                className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed"
                style={{ lineHeight: '1.8' }}
              >
                {story}
              </div>
            </div>
          </div>
        )}

        <p id="story-description" className="sr-only">
          Generated story based on the word {word}
        </p>
      </div>

      {/* Actions */}
      <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Story generated successfully â¨
          </div>
          <div className="flex space-x-4">
            <button
              onClick={downloadStory}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-semibold"
              aria-label="Download story as CSV"
            >
              ð Download Story
            </button>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors font-semibold"
              aria-label="Create another story"
            >
              â¨ Create Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryOutput;

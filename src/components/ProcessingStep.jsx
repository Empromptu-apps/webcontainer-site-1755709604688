import React from 'react';

const ProcessingStep = ({ word, onCancel }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <div className="mb-8">
          <div className="spinner mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Crafting Your Story
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Transforming "{word}" into a creative narrative...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This may take a few moments
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-md mx-auto mb-8">
          <div className="space-y-4">
            <div className="flex items-center text-left">
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white text-sm">â</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Processing your word</span>
            </div>
            <div className="flex items-center text-left">
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Generating creative story</span>
            </div>
            <div className="flex items-center text-left">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <span className="text-gray-500 dark:text-gray-400">Preparing final result</span>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
          aria-label="Cancel story generation"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProcessingStep;

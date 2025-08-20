import React, { useState } from 'react';
import WordInput from './components/WordInput';
import ProcessingStep from './components/ProcessingStep';
import StoryOutput from './components/StoryOutput';
import DebugPanel from './components/DebugPanel';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [word, setWord] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [apiCalls, setApiCalls] = useState([]);
  const [createdObjects, setCreatedObjects] = useState([]);

  const API_BASE = 'https://staging.empromptu.ai/api_tools';
  const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 3e946f102602f7c3fa91a90a3e690860',
    'X-Generated-App-ID': 'cf8bb207-438c-4860-81a3-96723eb3c8b1',
    'X-Usage-Key': 'e908b484ab7c525fdd929e0e956fa2d4'
  };

  const logApiCall = (method, endpoint, payload, response) => {
    const call = {
      timestamp: new Date().toISOString(),
      method,
      endpoint,
      payload,
      response,
      id: Date.now()
    };
    setApiCalls(prev => [...prev, call]);
  };

  const generateStory = async () => {
    if (!word.trim()) {
      setError('Please enter a word');
      return;
    }

    setLoading(true);
    setError('');
    setStory('');
    setCurrentStep(2);
    setApiCalls([]);
    setCreatedObjects([]);

    try {
      // Step 1: Input the word as data
      const inputPayload = {
        created_object_name: 'input_word',
        data_type: 'strings',
        input_data: [word.trim()]
      };

      const inputResponse = await fetch(`${API_BASE}/input_data`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(inputPayload)
      });

      const inputResult = await inputResponse.json();
      logApiCall('POST', '/input_data', inputPayload, inputResult);

      if (!inputResponse.ok) {
        throw new Error(inputResult.message || 'Failed to process input word');
      }

      setCreatedObjects(prev => [...prev, 'input_word']);

      // Step 2: Generate a short story using the word
      const storyPayload = {
        created_object_names: ['generated_story'],
        prompt_string: `Write a creative short story (300-500 words) where the word "{input_word}" serves as either the main character, the primary setting, or the central theme. Be imaginative and engaging. If the word is a noun, consider making it a character or setting. If it's an abstract concept, make it the theme. Create a complete story with beginning, middle, and end.`,
        inputs: [{
          input_object_name: 'input_word',
          mode: 'combine_events'
        }]
      };

      const storyResponse = await fetch(`${API_BASE}/apply_prompt`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(storyPayload)
      });

      const storyResult = await storyResponse.json();
      logApiCall('POST', '/apply_prompt', storyPayload, storyResult);

      if (!storyResponse.ok) {
        throw new Error(storyResult.message || 'Failed to generate story');
      }

      setCreatedObjects(prev => [...prev, 'generated_story']);

      // Step 3: Retrieve the generated story
      const retrievePayload = {
        object_name: 'generated_story',
        return_type: 'pretty_text'
      };

      const retrieveResponse = await fetch(`${API_BASE}/return_data`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(retrievePayload)
      });

      const retrieveResult = await retrieveResponse.json();
      logApiCall('POST', '/return_data', retrievePayload, retrieveResult);

      if (!retrieveResponse.ok) {
        throw new Error(retrieveResult.message || 'Failed to retrieve story');
      }

      setStory(retrieveResult.value || 'No story generated');
      setCurrentStep(3);

    } catch (err) {
      setError(err.message || 'An error occurred while generating the story');
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  const deleteObjects = async () => {
    for (const objectName of createdObjects) {
      try {
        await fetch(`${API_BASE}/objects/${objectName}`, {
          method: 'DELETE',
          headers: API_HEADERS
        });
      } catch (err) {
        console.error(`Failed to delete ${objectName}:`, err);
      }
    }
    setCreatedObjects([]);
    setStory('');
    setCurrentStep(1);
  };

  const resetApp = () => {
    setCurrentStep(1);
    setWord('');
    setStory('');
    setError('');
    setApiCalls([]);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Word to Story Generator
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? 'âï¸' : 'ð'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step 
                      ? 'bg-primary-500 border-primary-500 text-white' 
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ${
                      currentStep > step 
                        ? 'bg-primary-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Labels */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-3 gap-8 text-center max-w-2xl">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Enter Word
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Generate Story
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                View Result
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {currentStep === 1 && (
              <WordInput 
                word={word}
                setWord={setWord}
                onGenerate={generateStory}
                loading={loading}
                error={error}
              />
            )}

            {currentStep === 2 && (
              <ProcessingStep 
                word={word}
                onCancel={resetApp}
              />
            )}

            {currentStep === 3 && (
              <StoryOutput 
                word={word}
                story={story}
                onReset={resetApp}
              />
            )}
          </div>

          {/* Control Buttons */}
          {(createdObjects.length > 0 || apiCalls.length > 0) && (
            <div className="max-w-4xl mx-auto mt-8 flex justify-center space-x-4">
              <DebugPanel apiCalls={apiCalls} />
              {createdObjects.length > 0 && (
                <button
                  onClick={deleteObjects}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  aria-label="Delete created objects"
                >
                  ðï¸ Delete Objects
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';

const DebugPanel = ({ apiCalls }) => {
  const [showDebug, setShowDebug] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  if (apiCalls.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setShowDebug(true)}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        aria-label="Show API debug information"
      >
        ð Show API Calls
      </button>

      {showDebug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                API Debug Information
              </h3>
              <button
                onClick={() => setShowDebug(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close debug panel"
              >
                â
              </button>
            </div>

            <div className="flex h-96">
              {/* API Calls List */}
              <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    API Calls ({apiCalls.length})
                  </h4>
                  <div className="space-y-2">
                    {apiCalls.map((call) => (
                      <button
                        key={call.id}
                        onClick={() => setSelectedCall(call)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedCall?.id === call.id
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium text-sm text-gray-900 dark:text-white">
                          {call.method} {call.endpoint}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(call.timestamp).toLocaleTimeString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call Details */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  {selectedCall ? (
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Request Payload
                        </h5>
                        <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                          <code className="text-gray-800 dark:text-gray-200">
                            {JSON.stringify(selectedCall.payload, null, 2)}
                          </code>
                        </pre>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Response
                        </h5>
                        <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                          <code className="text-gray-800 dark:text-gray-200">
                            {JSON.stringify(selectedCall.response, null, 2)}
                          </code>
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                      Select an API call to view details
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DebugPanel;

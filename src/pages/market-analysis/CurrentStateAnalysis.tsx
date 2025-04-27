import React from 'react';

interface Props {
  content: string | object;
}

const CurrentStateAnalysis: React.FC<Props> = ({ content }) => {
  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-xl font-semibold text-gray-900">Current State Analysis</h3>
      <pre className="bg-gray-50 p-4 rounded text-sm text-gray-700 whitespace-pre-wrap">
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
};

export default CurrentStateAnalysis;

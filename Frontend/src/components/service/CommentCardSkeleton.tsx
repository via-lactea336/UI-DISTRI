import React from "react";

const CommentCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white max-w-3xl rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                ))}
                <span className="text-sm font-medium text-gray-200 ml-1">
                  (0/5)
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded" />
            <div className="w-5 h-5 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="mt-4 h-20 bg-gray-200 rounded" />
        <div className="mt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <span className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;

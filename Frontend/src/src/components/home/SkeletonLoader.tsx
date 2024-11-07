import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Servicios populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-40 mb-2 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkeletonLoader;

import React from "react";

const ServiceDetailsSkeleton: React.FC = () => {
  return (
    <section className="container mx-auto px-4 pb-8 flex justify-between items-center">
      <div className="flex justify-between items-start ">
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between items-center gap-4">
            <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-1/4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 py-1">
            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
          <div className="px-0 space-y-6 mt-2">
            <div className="space-y-2">
              <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-24 w-full bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="mt-4 h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="">
        <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </section>
  );
};

export default ServiceDetailsSkeleton;

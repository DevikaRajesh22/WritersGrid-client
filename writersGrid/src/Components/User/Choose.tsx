import React from 'react';

interface ChoiceProps {
  title: string;
  description: string;
}

const Choice: React.FC<ChoiceProps> = ({ title, description }) => {
  return (
    <div className="flex flex-wrap justify-between mx-4">  <div className="relative flex flex-col rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-md w-50 h-35 overflow-hidden mb-8 sm:mb-0">  <div className="p-6">
      <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased text-ellipsis overflow-hidden text-center">
        {title}
      </h5>
      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased text-ellipsis overflow-hidden text-center">
        {description}
      </p>
    </div>
    </div>
    </div>
  );
};

const Choose = () => {
  return (
    <div className="bg-gray-300">
      <div className="text-center pb-8 pt-10">
        <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
          Why choose Writers Grid?
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row pb-10">
        <Choice
          title="Collaborate with Editors"
          description="Work closely with experienced editors to refine your articles and enhance your writing skills."
        />
        <Choice
          title="Get Published"
          description="Publish your articles on our platform and reach a wider audience."
        />
        <Choice
          title="Join a Community"
          description="Travel worry-free knowing we’re here if you need us. 24 hours a day.."
        />
      </div>
    </div>
  );
};

export default Choose;
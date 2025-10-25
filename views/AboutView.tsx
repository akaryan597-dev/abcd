
import React from 'react';

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AboutView: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-brand-dark text-gray-700 dark:text-gray-300">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white" style={{ backgroundImage: `url('https://picsum.photos/seed/about-hero/1920/1080')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            From Village to City, <br /> From <span className="text-brand-gold">Cow to Cup.</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Discover the story behind Yadukul Dairy's commitment to purity, innovation, and trust.
          </p>
        </div>
      </section>

      {/* Founder's Quote */}
      <section className="py-16 bg-white dark:bg-brand-dark-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl font-medium italic text-gray-900 dark:text-white">
                    "We didn't just want to sell milk; we wanted to deliver a promise. A promise of uncompromised purity, powered by technology that ensures transparency from our farm to your family's table."
                </p>
                <footer className="mt-6">
                    <p className="text-lg font-bold text-brand-gold">Yadukul Singh</p>
                    <p className="text-gray-600 dark:text-gray-400">Founder, Yadukul Dairy Pvt. Ltd.</p>
                </footer>
            </blockquote>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Our Story Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="mb-4">
              Yadukul Dairy began with a simple yet powerful vision: to bridge the gap between rural purity and urban demand. Born from generations of dairy farming heritage in the heartland of Uttar Pradesh, we saw a need for milk that was not just fresh, but also trustworthy and handled with the utmost care.
            </p>
            <p className="mb-4">
              We started small, with a handful of our best-bred cows and a commitment to ethical, sustainable farming. Our journey from a local village farm to a trusted name in Noida is a testament to our unwavering focus on quality. We believe that the best dairy products come from happy animals and a clean environment, a principle that guides us every single day.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://picsum.photos/seed/our-story/600/400" alt="Yadukul Dairy Farm" className="rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">Our Mission</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg transition-transform hover:scale-105 shadow-md">
              <h3 className="text-xl font-bold text-brand-gold mb-2">Absolute Purity</h3>
              <p>To deliver 100% pure, unadulterated dairy products, free from hormones and preservatives.</p>
            </div>
            <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg transition-transform hover:scale-105 shadow-md">
              <h3 className="text-xl font-bold text-brand-gold mb-2">Customer Trust</h3>
              <p>To build lasting relationships through transparency, reliability, and exceptional service.</p>
            </div>
            <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg transition-transform hover:scale-105 shadow-md">
              <h3 className="text-xl font-bold text-brand-gold mb-2">Innovation & Efficiency</h3>
              <p>To leverage technology to streamline our processes, ensuring freshness and timely delivery.</p>
            </div>
          </div>
        </section>

        {/* Our Technology Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/seed/our-tech/600/400" alt="Dairy Technology" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Technology</h2>
            <p className="mb-6">
              At Yadukul Dairy, tradition meets technology. We've invested in a state-of-the-art, automated system that governs every step of our process—from milking to delivery. This isn't just a website; it's our central command.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-brand-gold flex-shrink-0 mr-3 mt-1" />
                <span><strong className="text-gray-800 dark:text-white">Farm-to-Door Traceability:</strong> Our commitment to transparency means you can trust the journey of your milk, from the farm right to your doorstep.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-brand-gold flex-shrink-0 mr-3 mt-1" />
                <span><strong className="text-gray-800 dark:text-white">Automated Quality Checks:</strong> Our processing units have integrated sensors that continuously monitor for quality, temperature, and consistency.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-brand-gold flex-shrink-0 mr-3 mt-1" />
                <span><strong className="text-gray-800 dark:text-white">Smart Delivery Routing:</strong> Our staff panel uses route optimization to ensure the quickest, most efficient delivery, keeping your products fresh.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutView;

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-brand-primary mb-6 text-center">About Reddy Hostel</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="C:\Users\prath\OneDrive\Pictures\RH.jpg" alt="Hostel Building" className="rounded-lg shadow-lg w-full h-auto object-cover"/>
          </div>
          <div className="text-lg text-brand-text-secondary space-y-4">
            <p>
              Welcome to Reddy Hostel, a home away from home dedicated exclusively for boys from the Reddy community. Our primary mission is to provide a safe, supportive, and affordable living environment for students who face financial challenges while pursuing their education.
            </p>
            <p>
              Established with the vision of empowering our community's youth, we believe that financial constraints should never be a barrier to academic excellence. We offer a nurturing atmosphere that fosters both personal and academic growth, allowing students to focus on their studies without the burden of expensive accommodation.
            </p>
            <p>
              Our motto is simple: <strong className="text-brand-primary">"Support, Study, Succeed."</strong> We are committed to creating a community of scholars who will become the leaders of tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

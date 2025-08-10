import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <section className="fontJakarta bg-base-100 py-12 px-4 min-h-screen">
      <Helmet>
        <title>Privacy Policy | Runners.bd</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-4 border-b mb-6">
          Privacy Policy
        </h1>

        <p className=" text-center max-w-2xl mx-auto">
          We value your trust. Here's how we collect, use, and protect your personal information at Runners.bd.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">1. Information We Collect</h2>
          <p className="">
            We collect information you provide directly - such as name, email, and profile photo when you create an account or register for marathons. We also collect usage data like device info and browsing behavior through cookies.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">2. How We Use Your Info</h2>
          <p className="">
            Your information helps us personalize your experience, manage event registrations, improve our services, and send important updates. We do not sell your data.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">3. Data Protection</h2>
          <p className="">
            We implement strict security measures to protect your data. This includes encrypted storage and secure connections. However, no method is 100% secure.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">4. Third-Party Services</h2>
          <p className="">
            We may use trusted third-party tools (like payment gateways, analytics, etc.) that collect limited data as necessary. These services are required to follow privacy and security practices.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">5. Your Choices</h2>
          <p className="">
            You can access or update your account details anytime. You can also request deletion of your data by contacting our support team.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">6. Cookies</h2>
          <p className="">
            We use cookies to improve your experience. You can control cookie preferences through your browser settings.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">7. Updates to This Policy</h2>
          <p className="">
            We may update this Privacy Policy from time to time. When we do, we’ll revise the "last updated" date and notify users if required.
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 text-center pt-6 border-t border-gray-300">
          Last Updated: June 2025
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;

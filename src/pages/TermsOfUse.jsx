import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfUse = () => {
  return (
    <section className="fontJakarta bg-base-100 py-12 px-4 min-h-screen">
      <Helmet>
        <title>Terms of Use | Runners.bd</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-4 border-b mb-6">
          Terms of Use
        </h1>

        <p className=" text-center max-w-2xl mx-auto">
          Please read these terms carefully before using our platform. By accessing or using Runners.bd, you agree to comply with and be bound by the following terms.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">1. Acceptance of Terms</h2>
          <p className="">
            By accessing and using Runners.bd, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the platform.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">2. Use of the Platform</h2>
          <p className="">
            You agree to use Runners.bd only for lawful purposes. You must not use the platform in a way that may damage, disable, or interfere with its functionality or security.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">3. Account Responsibilities</h2>
          <p className="">
            If you register for an account, you are responsible for maintaining its confidentiality and security. You agree to notify us immediately of any unauthorized use.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">4. Event Participation</h2>
          <p className="">
            Runners.bd is a platform to explore and register for marathons. We are not responsible for third-party events or changes in event details made by organizers.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">5. Intellectual Property</h2>
          <p className="">
            All content on Runners.bd, including logos, text, and visuals, are the property of their respective owners. You may not copy, reproduce, or distribute without permission.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">6. Termination</h2>
          <p className="">
            We reserve the right to suspend or terminate your access to Runners.bd at any time, without notice, for violations of these Terms of Use.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">7. Updates to Terms</h2>
          <p className="">
            These terms may be updated from time to time. Continued use of the platform means you accept the updated terms.
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 text-center pt-6 border-t border-gray-300">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </section>
  );
};

export default TermsOfUse;

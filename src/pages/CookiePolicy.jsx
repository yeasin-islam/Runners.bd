import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <section className="fontJakarta bg-base-100 py-12 px-4 min-h-screen">
      <Helmet>
        <title>Cookie Policy | Runners.bd</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-4 border-b mb-6">
          Cookie Policy
        </h1>

        <p className="text-center max-w-2xl mx-auto">
          This page explains how Runners.bd uses cookies and your options for managing them.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">1. What Are Cookies?</h2>
          <p className="">
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and analyze usage.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">2. How We Use Cookies</h2>
          <p className="">
            At Runners.bd, we use cookies to:
            <ul className="list-disc list-inside mt-2">
              <li>Remember your login and preferences</li>
              <li>Analyze site traffic and performance</li>
              <li>Enable smooth navigation and features</li>
              <li>Deliver relevant content and user experiences</li>
            </ul>
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">3. Types of Cookies We Use</h2>
          <p className="">
            <strong>Essential Cookies:</strong> Needed for core features like login and navigation.<br />
            <strong>Performance Cookies:</strong> Help us understand how users interact with our site.<br />
            <strong>Preference Cookies:</strong> Remember your choices and settings.<br />
            <strong>Analytics Cookies:</strong> Collect anonymous data to improve functionality.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">4. Managing Cookies</h2>
          <p className="">
            Most browsers accept cookies automatically, but you can change your settings to decline or delete them. Please note, disabling cookies may affect some features of our website.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">5. Updates to This Policy</h2>
          <p className="">
            We may update this Cookie Policy from time to time. The latest version will always be available here with a revised "Last Updated" date.
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

export default CookiePolicy;

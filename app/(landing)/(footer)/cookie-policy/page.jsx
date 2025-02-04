import React from 'react'

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 chakra-text">
      <h1 className="text-2xl font-bold mb-4 css-iqc25v">Cookie Policy</h1>

      <p className="mb-4">
        Welcome to <strong>TaskBank</strong>! This Cookie Policy explains how we use cookies on our website. By continuing to use our website, you consent to the use of cookies as described in this policy.
      </p>

      <h2 className="text-xl font-semibold mb-2 css-iqc25v">What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a website. They help websites recognize your device and store some information about your preferences or past actions to improve your browsing experience.
      </p>

      <h2 className="text-xl font-semibold mb-2 css-iqc25v">How We Use Cookies</h2>
      <p className="mb-4">
        Our website uses cookies strictly for the purpose of maintaining sessions. These session cookies are essential to ensure our website functions correctly and to provide you with a seamless browsing experience.
      </p>

      <p className="mb-4 css-iqc25v">
        <strong>We do not use cookies for:</strong>
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Tracking your activity beyond your session.</li>
        <li>Marketing or advertising purposes.</li>
        <li>Collecting personal data for analytics.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 css-iqc25v">What Cookies Do We Store?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Session Cookies</strong>
          <ul className="list-disc pl-6">
            <li>Purpose: To maintain your session while you browse our website.</li>
            <li>Expiry: These cookies are temporary and are deleted automatically when you close your browser.</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2 css-iqc25v">Managing Cookies</h2>
      <p className="mb-4">
        Since our cookies are essential for the functionality of our website, they cannot be disabled without affecting your user experience. However, if you prefer, you can configure your browser to block cookies or notify you when cookies are being used. Please note that disabling cookies may affect the functionality of the website.
      </p>

      <h2 className="text-xl font-semibold mb-2 css-iqc25v">Updates to This Cookie Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time to reflect any changes in our use of cookies or other legal requirements. Please revisit this page periodically to stay informed about our practices.
      </p>

      <h2 className="text-xl font-semibold mb-2 css-iqc25v">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Cookie Policy, please contact us at:
      </p>
      <ul className="list-disc pl-6">
        <li>Email: support@taskbank.online</li>
      </ul>
    </div>
  )
}

export default page
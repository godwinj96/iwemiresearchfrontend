/* eslint-disable */
import React, { useState } from 'react';

// List of top 50 languages of the world
const languages = [
  'English', 'Mandarin Chinese', 'Hindi', 'Spanish', 'French',
  'Standard Arabic', 'Bengali', 'Russian', 'Portuguese', 'Urdu',
  'Indonesian', 'German', 'Japanese', 'Swahili', 'Marathi',
  'Telugu', 'Western Punjabi', 'Wu Chinese', 'Tamil', 'Turkish',
  'Korean', 'Vietnamese', 'Italian', 'Yue Chinese', 'Thai',
  'Gujarati', 'Jin Chinese', 'Persian', 'Bhojpuri', 'Hausa',
  'Filipino', 'Egyptian Arabic', 'Kannada', 'Polish', 'Myanmar',
  'Xiang Chinese', 'Malayalam', 'Sunda', 'Chhattisgarhi', 'Hakka Chinese',
  'Dutch', 'Somali', 'Nepali', 'Sinhalese', 'Khmer',
  'Turkmen', 'Madurese', 'Kurdish', 'Serbo-Croatian', 'Cebuano'
];

const Language = () => {

  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Handle change event for the select input
  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setSelectedLanguage(value); // Update the state with the selected language
    console.log('Selected Language:', value); // Optional: Log the selected language for testing
  };
  return (
    <div className="max-w-sm mx-auto mb-5">
      <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
      <select
        id="language"
        value={selectedLanguage} // Bind the state to the select input
        onChange={handleLanguageChange} // Handle the change event
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="">Select a language</option>
        {languages.map((language, index) => (
          <option key={index} value={language}>{language}</option>
        ))}
      </select>
    </div>
  );
};

export default Language;

/* eslint-disable */
import React from 'react';

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
  return (
    <div className="max-w-sm mx-auto mb-5">
      <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
      <select id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="">Select a language</option>
        {languages.map((language, index) => (
          <option key={index} value={language}>{language}</option>
        ))}
      </select>
    </div>
  );
};

export default Language;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdDateRange } from "react-icons/md";
import { toast } from 'react-toastify';
import cross from '../../../assets/cross_icon.png';
import './AdminUploadPopup.css';
const adminUploadPopup = ({ setShowUpload }) => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedOption, setUploadedOption] = useState('')//initial radio state
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [date, setDate] = useState(new Date())
  const [yearP, setYearP] = useState('')
  const [price, setPrice] = useState(0)
  const [type, setType] = useState('')
  const [abstract, setAbstract] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)

    } else {
      alert('Please upload a PDF file.')
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };



  const Upload = async () => {
    if (uploadedOption === 'subscriptionBased') {
      const formData = new FormData()
      formData.append('title', title);
      formData.append('author', authors);
      formData.append('date', date);
      formData.append('type', type);
      formData.append('drm', 2);
      formData.append('resource', selectedFile);
      //formData.append('access', uploadedOption);  

      const token = '3bc699cc93f50ebadd635e7cb1ed80b733eecc0a'
      let resourceId = null

      console.log('Preparing to upload book...')
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {

        const response = await fetch('https://app.editionguard.com/api/v2/book', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: formData
        })





        if (!response.ok) {
          throw new Error('Failed to upload the book')
        }
        const data = await response.json()
        console.log('Upload successful: ', data)

        resourceId = data.resource_id



        console.log('Selected file:', selectedFile);


        const uploadData = new FormData()
        uploadData.append("name", title)
        uploadData.append("type", type)
        uploadData.append("category", category)
        uploadData.append("subcategory", subcategory)
        uploadData.append("author", authors)
        uploadData.append("abstract", abstract)
        uploadData.append("price", price)
        uploadData.append("year_published", yearP)
        uploadData.append("resource_id", resourceId)
        uploadData.append("is_open_access", false)
        uploadData.append("file", selectedFile)
        uploadData.append("cover_page", selectedImage)

        const response2 = await fetch("https://localhost:8014/api/papers/", {
          method: 'POST',
          body: uploadData
        })

        const responseText = await response2.text();
        console.log(responseText); // This will show you the detailed error message


        if (!response2.ok) {
          throw new Error('Failed to upload the book')
        } else {
          setShowUpload(false)
          toast.success("Book uploaded")
        }


      } catch (error) {
        console.error('Error uploading book:', error.message)
        toast.error(error)
        alert('Failed to upload book. Please try again')
      }
    } else if (uploadedOption === 'openAccess') {
      const uploadData = new FormData()
      uploadData.append("name", title)
      uploadData.append("type", type)
      uploadData.append("category", category)
      uploadData.append("subcategory", subcategory)
      uploadData.append("author", authors)
      uploadData.append("abstract", abstract)
      uploadData.append("price", price)
      uploadData.append("year_published", yearP)
      // uploadData.append("resource_id", resourceId)
      uploadData.append("is_open_access", false)
      uploadData.append("file", selectedFile)
      uploadData.append("cover_page", selectedImage)

      try {
        const response2 = await fetch("https://localhost:8014/api/papers/", {
          method: 'POST',
          body: uploadData
        })


        const responseText = await response2.text();
        console.log(responseText); // This will show you the detailed error message


        if (!response2.ok) {
          throw new Error('Failed to upload the book')
        } else {
          setShowUpload(false)
          toast.success("Book uploaded")
        }
      } catch (error) {
        console.error('Error uploading book:', error.message)
        toast.error(error)
        alert('Failed to upload book. Please try again')
      }
    }
  }

  return (
    <div className='upload-popup'>
      <div className='upload-popup-container'>

        <div className='login-popup-inputs'>
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  min-w-[40vw]">
            <div className='upload-popup-title flex justify-between '>
              <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Upload a Paper</h2>
              <div className='cursor-pointer'>
                <img src={cross} alt="" onClick={() => setShowUpload(false)} className='' />
              </div>

            </div>
            <form className='upload-popup-container' onSubmit={Upload}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input onChange={(e) => setTitle(e.target.value)} value={title} name='title' type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>

                <div>
                  <label htmlFor="authors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authors</label>
                  <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} id="authors" name='authors' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                  <label htmlFor="dateOfUpload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Upload</label>
                  <div className="relative max-w-sm">
                    <div
                      style={{ zIndex: 10 }}
                      className="absolute inset-y-0 text-gray-500 start-0 flex items-center ps-3  pointer-events-none">
                      <MdDateRange color='gray' />
                    </div>
                    <DatePicker
                      selected={date}
                      onChange={(startDate) => setDate(startDate)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="datePublished" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year Published</label>
                  <input type="text" value={yearP} onChange={(e) => setYearP(e.target.value)} id="yearPublished" name='yearPublished' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                  <label htmlFor="datePublished" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} id="price" name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    id="type"
                    name="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>Select type</option>
                    <option value="Journal">Journal</option>
                    <option value="ThesisDissertation">Thesis & Dissertation</option>
                    <option value="Conference Paper">Conference Paper</option>
                    <option value="Academic Textbook">Academic Textbook</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Arts">Arts</option>
                    <option value="Biological Sciences">Biological Sciences</option>
                    <option value="Administration">Administration</option>
                    <option value="Dentistry">Dentistry</option>
                    <option value="Education">Education</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Environmental Sciences">Environmental Sciences</option>
                    <option value="Health Sciences & Technology">Health Sciences & Technology</option>
                    <option value="Law">Law</option>
                    <option value="Medical Sciences">Medical Sciences</option>
                    <option value="Pharmaceutical Sciences">Pharmaceutical Sciences</option>
                    <option value="Physical Sciences">Physical Sciences</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Veterinary Medicine">Veterinary Medicine</option>
                  </select>
                </div>

                {category === "Arts" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Archeology and Tourism">Archeology and Tourism</option>
                      <option value="Arabic and Islamic Studies">Arabic and Islamic Studies</option>
                      <option value="Christian Religious Studies">Christian Religious Studies</option>
                      <option value="English and Literary Studies">English and Literary Studies</option>
                      <option value="Fine and Applied Arts (Creatiuve Arts)">Fine and Applied Arts (Creatiuve Arts)</option>
                      <option value="Foreign Languages and Literature">Foreign Languages and Literature</option>
                      <option value="History and International Studies">History and International Studies</option>
                      <option value="Linguistics and Nigerian Languages">Linguistics and Nigerian Languages</option>
                      <option value="Mass Communication (Communication and Language Arts)">Mass Communication (Communication and Language Arts)</option>
                      <option value="Music">Music</option>
                      <option value="Theatre and Film Studies">Theatre and Film Studies</option>
                    </select>
                  </div>
                )}

                {category === "Biological Sciences" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Biochemistry">Biochemistry</option>
                      <option value="Botany">Botany</option>
                      <option value="Microbiology">Microbiology</option>
                      <option value="Marine Biology">Marine Biology</option>
                      <option value="Cell Biology & Genetics">Cell Biology & Genetics</option>
                      <option value="Zoology">Zoology</option>
                    </select>
                  </div>
                )}

                {category === "Agriculture" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Agricultural Economics">Agricultural Economics</option>
                      <option value="Agricultural Extension">Agricultural Extension</option>
                      <option value="Agronomy">Agronomy</option>
                      <option value="Animal Science">Animal Science</option>
                      <option value="Crop Science">Crop Science</option>
                      <option value="Food Science and Technology">Food Science and Technology</option>
                      <option value="Fisheries">Fisheries</option>
                      <option value="Forest Resources Management (Forestry)">Forest Resources Management (Forestry)</option>
                      <option value="Home Science, Nutrition and Dietetics">Home Science, Nutrition and Dietetics</option>
                      <option value="Soil Science">Soil Science</option>
                    </select>
                  </div>
                )}

                {category === "Administration" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Accountancy">Accountancy</option>
                      <option value="Acturial Science">Acturial Science</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="Business Management">Business Management</option>
                      <option value="Banking and Finance">Banking and Finance</option>
                      <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Industrial Relations and Personnel Management">Industrial Relations and Personnel Management</option>
                    </select>
                  </div>
                )}
                {category === "Dentistry" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Child Dental Health">Child Dental Health</option>
                      <option value="Oral and Maxillofacial Surgery">Oral and Maxillofacial Surgery</option>
                      <option value="Preventive Dentistry">Preventive Dentistry</option>
                      <option value="Restorative Dentistry">Restorative Dentistry</option>
                    </select>
                  </div>
                )}

                {category === "Education" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Adult Education and Extra-Mural Studies">Adult Education and Extra-Mural Studies</option>
                      <option value="Arts Education">Arts Education</option>
                      <option value="Education & Accountancy">Education & Accountancy</option>
                      <option value="Education & Computer Science">Education & Computer Science</option>
                      <option value="Education & Economics">Education & Economics</option>
                      <option value="Education & Mathematics">Education & Mathematics</option>
                      <option value="Education & Physics">Education & Physics</option>
                      <option value="Education & Religious Studies">Education & Religious Studies</option>
                      <option value="Education & Social Science">Education & Social Science</option>
                      <option value="Education And Biology">Education And Biology</option>
                      <option value="Education And Chemistry">Education And Chemistry</option>
                      <option value="Education And English Language">Education And English Language</option>
                      <option value="Education And French">Education And French</option>
                      <option value="Education And Geography/Physics">Education And Geography/Physics</option>
                      <option value="Education And Political Science">Education And Political Science</option>
                      <option value="Educational Foundations">Educational Foundations</option>
                      <option value="Educational / Psychology Guidance And Counselling">Educational / Psychology Guidance And Counselling</option>
                      <option value="Health and Physical Education">Health and Physical Education</option>
                      <option value="Library and Information Science">Library and Information Science</option>
                      <option value="Science Education">Science Education</option>
                      <option value="Social Sciences Education">Social Sciences Education</option>
                      <option value="Vocational Teacher Education (Technical Education)">Vocational Teacher Education (Technical Education)</option>
                      <option value="Religion">Religion</option>
                      <option value="Igbo Linguistics">Igbo Linguistics</option>
                    </select>
                  </div>
                )}

                {category === "Engineering" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Agricultural and Bioresources Engineering">Agricultural and Bioresources Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Chemical Engineering">Chemical Engineering</option>
                      <option value="Computer Engineering">Computer Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Electronic Engineering">Electronic Engineering</option>
                      <option value="Marine Engineering">Marine Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
                      <option value="Petroleum and Gas Engineering">Petroleum and Gas Engineering</option>
                      <option value="Systems Engineering">Systems Engineering</option>
                      <option value="Structural Engineering">Structural Engineering</option>
                      <option value="Production and Industrial Engineering">Production and Industrial Engineering</option>
                    </select>
                  </div>
                )}

                {category === "Environmental Sciences" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Estate Management">Estate Management</option>
                      <option value="Quantity Surveying">Quantity Surveying</option>
                      <option value="Building">Building</option>
                      <option value="Geoinformatics and Surveying">Geoinformatics and Surveying</option>
                      <option value="Urban and Regional Planning">Urban and Regional Planning</option>
                    </select>
                  </div>
                )}
                {category === "Health Sciences & Technology" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Health Administration and Management">Health Administration and Management</option>
                      <option value="Medical Laboratory Sciences">Medical Laboratory Sciences</option>
                      <option value="Medical Radiography and Radiological Sciences">Medical Radiography and Radiological Sciences</option>
                      <option value="Medical Rehabilitation">Medical Rehabilitation</option>
                      <option value="Nursing Sciences">Nursing Sciences</option>
                    </select>
                  </div>
                )}

                {category === "Law" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Commercial and Property Law">Commercial and Property Law</option>
                      <option value="International and Jurisprudence">International and Jurisprudence</option>
                      <option value="Private and Public Law">Private and Public Law</option>
                    </select>
                  </div>
                )}
                {category === "Medical Sciences" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Anatomy">Anatomy</option>
                      <option value="Anesthesia">Anesthesia</option>
                      <option value="Chemical Pathology">Chemical Pathology</option>
                      <option value="Community Medicine">Community Medicine</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Hematology and Immunology">Hematology and Immunology</option>
                      <option value="Medical Biochemistry">Medical Biochemistry</option>
                      <option value="Medical Microbiology">Medical Microbiology</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Morbid Anatomy">Morbid Anatomy</option>
                      <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Otolaryngology">Otolaryngology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Pharmacology and Therapeutics">Pharmacology and Therapeutics</option>
                      <option value="Physiology">Physiology</option>
                      <option value="Radiation Medicine">Radiation Medicine</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Psychological Medicine">Psychological Medicine</option>
                      {/**<option value="Child Dental Health">Child Dental Health</option>*/}
                    </select>
                  </div>
                )}

                {category === "Pharmaceutical Sciences" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Clinical Pharmacy and Pharmacy Management">Clinical Pharmacy and Pharmacy Management</option>
                      <option value="Pharmaceutical Chemistry and Industrial Pharmacy">Pharmaceutical Chemistry and Industrial Pharmacy</option>
                      <option value="Pharmaceutical Technology and Industrial Pharmacy">Pharmaceutical Technology and Industrial Pharmacy</option>
                      <option value="Pharmaceutics">Pharmaceutics</option>
                      <option value="Pharmacognosy">Pharmacognosy</option>
                      <option value="Department of Pharmacology and Toxicology">Department of Pharmacology and Toxicology</option>
                    </select>
                  </div>
                )}

                {category === "Physical Sciences" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Geology">Geology</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics and Astronomy">Physics and Astronomy</option>
                      <option value="Geophysics">Geophysics</option>
                      <option value="Pure and Industrial Chemistry">Pure and Industrial Chemistry</option>
                      <option value="Statistics">Statistics</option>
                    </select>
                  </div>
                )}

                {category === "Social Sciences" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Economics">Economics</option>
                      <option value="Geography">Geography</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Political Science">Political Science</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Public Administration and Local Government">Public Administration and Local Government</option>
                      <option value="Religion">Religion</option>
                      <option value="Social Work">Social Work</option>
                      <option value="Sociology/Anthropology">Sociology/Anthropology</option>
                    </select>
                  </div>
                )}

                {category === "Veterinary Medicine" && (
                  <div>
                    <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      id="subcategory"
                      name="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select subcategory</option>
                      <option value="Veterinary Physiology/Pharmacology">Veterinary Physiology/Pharmacology</option>
                      <option value="Veterinary Anatomy">Veterinary Anatomy</option>
                      <option value="Animal Health and Production">Animal Health and Production</option>
                      <option value="Veterinary Parasitology and Entomology">Veterinary Parasitology and Entomology</option>
                      <option value="Veterinary Pathology and Microbiology">Veterinary Pathology and Microbiology</option>
                      <option value="Veterinary Public Health and Preventive Medicine">Veterinary Public Health and Preventive Medicine</option>
                      <option value="Veterinary Surgery">Veterinary Surgery</option>
                      <option value="Veterinary Medicine">Veterinary Medicine</option>
                      <option value="Veterinary Obstetrics and Reproductive Diseases">Veterinary Obstetrics and Reproductive Diseases</option>
                      <option value="Veterinary Teaching Hospital">Veterinary Teaching Hospital</option>
                    </select>
                  </div>
                )}



                <div>
                  <label htmlFor="abstract" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Abstract</label>
                  <textarea type="text" value={abstract} onChange={(e) => setAbstract(e.target.value)} id="abstract" name='type' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your abstract here..." required />
                </div>
                <div className="mb-5 flex">
                  <label htmlFor="" className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-500"
                      value="openAccess"
                      checked={uploadedOption === 'openAccess'}
                      onChange={() => {
                        setUploadedOption('openAccess');

                      }}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Open-Access</span>

                  </label>

                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-500"
                      value="subscriptionBased"
                      checked={uploadedOption === 'subscriptionBased'}
                      onChange={() => {
                        setUploadedOption('subscriptionBased');

                      }}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Subscription based</span>
                  </label>
                </div>


              </div>


              {/*<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
           */} </form>



            {/**file upload form */}
            <div className='flex'>
              {/* PDF Upload Section */}
              <div className="flex flex-col items-center justify-center w-full file-upload">
                {/* Display the selected file name if a file is uploaded */}
                {selectedFile && (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Selected file: <span className="font-semibold">{selectedFile.name}</span>
                  </p>
                )}
                <label htmlFor="pdf-dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 800x400px)</p>
                  </div>
                  <input id="pdf-dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept='application/pdf' />
                </label>
              </div>

              {/* Image Upload Section */}
              <div className="flex flex-col items-center justify-center w-full image-upload">
                {/* Display the selected image preview if an image is uploaded */}
                {selectedImage && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Selected image: <span className="font-semibold">{selectedImage.name}</span>
                    </p>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Image Preview"
                      className="w-32 h-32 object-cover mt-2 rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                )}
                <label
                  htmlFor="image-dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 7.5L6.5 10 9 7.5l2.5 2.5 3.5-3.5"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Image files (MAX. 800x800px)</p>
                  </div>
                  <input
                    id="image-dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>


            <div className="mt-4 flex items-center justify-between w-full bg-white dark:bg-gray-700 p-4 rounded-lg">

              <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={Upload}
                disabled={!selectedFile} //disable if no file is selectedor modal is open
              >
                Confirm Upload
              </button>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default adminUploadPopup;

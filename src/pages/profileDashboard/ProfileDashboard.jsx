import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../../Context/GlobalState'
import { supabase } from '../../supaBaseClient'
import stripe_img from '../../assets/stripe.png'
import interswitch_img from '../../assets/interswitch.png'
import flutterwave_img from '../../assets/flutterwave.png'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { MdDateRange } from "react-icons/md";


const ProfileDashboard = () => {

  const { user, setUser, bookClicked, setBookClicked, loggedIn, setLoggedIn } = useContext(GlobalStateContext)

  const [activeTab, setActiveTab] = useState('profile')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadedOption, setUploadedOption] = useState('')//initial radio state
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [isPopover, setIsPopover] = useState(false)

  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [date, setDate] = useState(new Date())
  const [yearP, setYearP] = useState('')
  const [type, setType] = useState('')
  const [abstract, setAbstract] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')



  const navigate = useNavigate()
  const timerRef = useRef(null)

  const handleMouseEnter = () => {

    timerRef.current = setTimeout(() => {
      setIsPopover(true);
    }, 150)
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current)
    setIsPopover(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const catalogue = () => {
    navigate('/research-resources')
  }
  const home = () => {
    navigate('/')
  }



  const ForgotPassword = () => {
    navigate('/Forgot-Password')
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      alert('Please upload a PDF file.')
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const toggleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen)
  }



  const closeUploadModal = () => {
    setIsUploadModalOpen(false)
    //setSelectedFile(null)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleUploadConfirm = async () => {

    if (selectedFile) {
      toggleUploadModal()
    } else {
      alert('Please select a file to upload')
    }

  }

  const handleFinaliseUpload = async () => {

    let fileUrl = ''

      //extracting file name
      const fileExt = selectedFile.name.split('.').pop()
      //genrating a unique filename by appending current timestamp to file extension
      const fileName = `${Date.now()}.${fileExt}`
      //const filePath = `public/${fileName}`
      const filePath = selectedFile.name
      console.log(fileExt)
      console.log(filePath)

      console.log(filePath)
      console.log(selectedFile.name)
      fileUrl = `https://moozotwbqobybcbidade.supabase.co/storage/v1/object/public/book_file/${filePath}`
      console.log(fileUrl)



    ///storing file info for later use in other components
    const formData = {
      title,
      authors,
      yearP,
      date,
      type,
      uploadedOption,
      fileUrl
    }



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

        const newFile = {
          name: selectedFile.name,
          size: (selectedFile.size / 1024).toFixed(2) + 'KB',
          date: new Date().toLocaleString(),
          option: uploadedOption
        };
        setUploadedFiles([...uploadedFiles, newFile])
        closeUploadModal()

      } catch (error) {
        console.error('Error uploading book:', error)
        alert('Failed to upload book. Please try again')
      }

      


      const { data, error } = await supabase
        .storage
        .from('book_file')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        toast.error('Error uploading file:', error);
        alert(error)
        return
      }

      


      let categoryId = null

      if (type === 'Journal') {
        categoryId = 1
      } else if (type === 'Thesis & Dissertations') {
        categoryId = 2
      } else if (type === 'Academic Textbooks') {
        categoryId = 3
      } else if (type === 'Conference Papers') {
        categoryId = 4
      }


      try {
        const { data, error } = await supabase
          .from('api_book')
          .insert([
            {
              name: title,
              author: authors,
              abstract: abstract,
              year_published: yearP,
              date_uploaded: date,
              category_id: categoryId,
              is_open_access: false,
              file_url: fileUrl,
            }
          ])


        if (error) {
          toast.error('Error pushinf field names to databse', error)
        } else {
          console.log('FIeld names pushed to supabase:', data)
        }
      } catch (error) {
          console.log(error)
      }


    } else if (uploadedOption === 'openAccess') {

      localStorage.setItem('formData', JSON.stringify(formData))

      /**const { data, error } = await supabase
        .from('api_book')
        .insert([
          {
            name: title,
            author: authors,
            year_published: yearP,
            date_uploaded: date,
            category: type,
            file_url: fileUrl,
            is_open_access: true,

          }
        ])

      if (error) {
        toast.error('Error pushinf field names to databse', error)
      } else {
        console.log('FIeld names pushed to supabase:', data)
      } */




      const product = {
        name: 'Open Access Product',
        price: 100
      };
      localStorage.setItem('product', JSON.stringify(product))
      navigate('/payment', { state: { products: [product] } })
    }
    else {
      alert('Please select an option before finalising option')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('supabaseSession')
    setLoggedIn(false)
    home()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            {user && user.user_metadata && (<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hello {user.user_metadata.firstName} {user.user_metadata.lastName}
              (not {user.user_metadata.email} ?
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('logout') }}>Log out</a> )
            </h3>)}
            <p className="mb-2">From your profile page you can view your{' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('orders') }} >recent orders</a>, {' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('paymentMethods') }}>manage payment methods</a> , and {' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('accountDetails') }}>edit your password and acount details</a>
            </p>

          </div>
        );
      case 'uploads':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Uploads</h3>

            <form>
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
                    <option value="Thesis">Thesis</option>
                    <option value="Dissertation">Dissertation</option>
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

                <div>
                  <label htmlFor="abstract" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Abstract</label>
                  <textarea type="text" value={abstract} onChange={(e) => setAbstract(e.target.value)} id="abstract" name='type' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your abstract here..." required />
                </div>

              </div>


              {/*<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
           */} </form>

            {uploadedFiles.length === 0 ? (
              <p>You haven't uploaded any research resource/document</p>
            ) : (
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="mb-2">
                    {file.name} - {file.date}
                  </li>
                ))}
              </ul>
            )}
            {/**file upload form */}

            <div className="flex items-center justify-center w-full file-upload">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept='application/pdf' />
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4 flex items-center justify-between w-full bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleUploadConfirm}
                  disabled={!selectedFile || isUploadModalOpen} //disable if no file is selectedor modal is open
                >
                  Confirm Upload
                </button>
              </div>

            )}

            {isUploadModalOpen && (<div
              id="popup-modal"
              tabIndex="-1"
              className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    onClick={closeUploadModal}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center dark">

                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Choose an option
                    </h3>
                    <div className="mb-5">
                      <label htmlFor="" className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-500"
                          value="openAccess"
                          checked={uploadedOption === 'openAccess'}
                          onChange={() => {
                            setUploadedOption('openAccess');
                            setIsOptionSelected(true); // Set option selected to true on change
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
                            setIsOptionSelected(true); // Set option selected to true on change
                          }}
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Subscriptiopn based</span>
                      </label>
                    </div>
                    {isOptionSelected && uploadedOption === 'openAccess' && (
                      <div className="mt-2 text-gray-700 dark:text-gray-300">
                        A sum of $100 is to be paid...click finalise to begin payment
                      </div>
                    )}





                    <br />
                    <button
                      onClick={handleFinaliseUpload}
                      type="button"
                      className={`text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ${!isOptionSelected ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      disabled={!isOptionSelected} // Disable button if no option is selected
                    >
                      Finalise Upload
                    </button>

                    <div className='relative inline-block'>
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        Don't know what those words mean?
                        <button
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          className='relative ml-2'
                          type="button">
                          <svg className="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd">
                            </path>
                          </svg>
                          <span className="sr-only">Show information</span>
                        </button>
                      </p>
                      {isPopover && (<div role="tooltip" className="absolute z-10  inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-1 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                        <div className="p-3 ">
                          <h3 className="font-semibold text-gray-900 dark:text-white">Open Access</h3>
                          <p>Means that you pay $100 for upload and people can access your resource for free</p>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Subscription based</h3>
                          <p>You upload for free and people have to pay to access your resouces. 40% of that money will be sent back you</p>

                        </div>
                        <div data-popper-arrow></div>
                      </div>)}
                    </div>



                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        );
      case 'orders':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Orders</h3>
            <p>No order has been made yet</p>
            <button className="make-order bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
              onClick={(e) => {
                e.preventDefault();
                home()
              }}
            >
              Return to home
            </button>
          </div>
        );
      case 'paymentMethods':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Payment Methods</h3>
            <p>No saved Methods found</p>
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className=" block add-payment-method bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 px-5 py-2.5"
              type='button'
              onClick={toggleModal}
            >
              Add Payment Method
            </button>


            {isModalOpen && (<div
              id="popup-modal"
              tabIndex="-1"
              className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center dark">

                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Pick Payment Method
                    </h3>

                    <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2 payment-button">
                      <img src={stripe_img} className='w-10 h-3 payment-logo' alt="" />
                      Pay with Stripes
                    </button>

                    <button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 payment-button">
                      <img src={flutterwave_img} className='w-10 h-3 payment-logo' alt="" />
                      Check out with Flutterwave
                    </button>

                    <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 payment-button">
                      <img src={interswitch_img} className='w-10 h-3 payment-logo' alt="" />
                      Pay with Interswitch
                    </button>






                    <br />
                    <button
                      onClick={closeModal}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        );
      case 'accountDetails':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Account Details</h3>



            <form className="max-w-sm mx-auto">
              <div className="mb-5">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name <span className="text-red-500">*</span></label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </div>
              <div className="mb-5">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name <span className="text-red-500">*</span></label>
                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

            </form>

            <form className="max-w-sm mx-auto">
              <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username <span className="text-red-500">*</span></label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </div>
            </form>

            <form className="max-w-sm mx-auto update-email">
              <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Update your email"
                  required />
              </div>
            </form>

            <form className="max-w-sm mx-auto password-change">
              <div className='mb-5'>
                <h2>Confirm with Password</h2>
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={(e) => {
                    e.preventDefault();
                    ForgotPassword()
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="mb-5">
                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
            </form>

          </div>
        );
      case 'logout':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Are you sure you want to log out ? <a href="" onClick={(e) => {
              e.preventDefault();
              handleLogout()
              setLoggedIn(false)
            }}>Confirm and log out</a> </h3>
            <p className="mb-2">From your profile page you can view your{' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('orders') }} >recent orders</a>, {' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('paymentMethods') }}>manage payment methods</a> , and {' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('accountDetails') }}>edit your password and acount details</a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };




  return (
    <div className='flex flex-col profile-container'>
      <Navbar />
      <div className="profile-page flex flex-col">
        <div className="profile-page-title">
          My account
        </div>
        <div className="profile-page-content">

          <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
              <li>
                <a href="#" className={`inline-flex items-center px-4 py-3 ${activeTab === 'profile' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'} w-full`} onClick={() => setActiveTab('profile')} aria-current={activeTab === 'profile' ? 'page' : undefined}>
                  <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className={`inline-flex items-center px-4 py-3 ${activeTab === 'uploads' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'} w-full`} onClick={() => setActiveTab('uploads')}>
                  <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M17.707 11.293l-7-7a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 2.707 12.707L3.414 12H7v5H4v2h4a1 1 0 0 0 1-1v-6h2v6a1 1 0 0 0 1 1h4v-2h-3v-5h3.586l.707.707a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Uploads
                </a>
              </li>
              <li>
                <a href="#" className={`inline-flex items-center px-4 py-3 ${activeTab === 'orders' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'} w-full`} onClick={() => setActiveTab('orders')}>
                  <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a2 2 0 0 0-2 2v2h4V2a2 2 0 0 0-2-2Zm4 4h-2v2h4V4h-2ZM4 4v2h4V4H4Zm10 4h-2v2h4V8h-2ZM4 8v2h4V8H4Zm10 4h-2v2h4v-2h-2ZM4 12v2h4v-2H4Zm8-10H8v4h4V2Zm0 8H8v4h4v-4Z" />
                  </svg>
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className={`inline-flex items-center px-4 py-3 ${activeTab === 'paymentMethods' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'} w-full`} onClick={() => setActiveTab('paymentMethods')}>
                  <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4h4v4H2V4Zm6 0h4v4H8V4Zm6 0h4v4h-4V4ZM2 10h4v4H2v-4Zm6 0h4v4H8v-4Zm6 0h4v4h-4v-4ZM2 16h4v4H2v-4Zm6 0h4v4H8v-4Zm6 0h4v4h-4v-4Z" />
                  </svg>
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className={`inline-flex items-center px-4 py-3 ${activeTab === 'accountDetails' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'} w-full`} onClick={() => setActiveTab('accountDetails')}>
                  <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                  </svg>
                  Account Details
                </a>
              </li>
              <li>
                <a href="#" className={`inline-flex items-center px-4 py-3 ${activeTab === 'logout' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'} w-full`} onClick={() => setActiveTab('logout')}>
                  <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4V3a1 1 0 1 1 2 0v1h6V3a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zm-1 4v10h12V8H4zm6 1a1 1 0 0 1 1 1v3h3v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1h-4v-3a1 1 0 0 1-1-1 1 1 0 0 1-1-1z" />
                  </svg>
                  Logout
                </a>
              </li>

            </ul>
            {renderContent()}
          </div>


        </div>
      </div>
      <div className='dark'>
        <Footer />
      </div>

    </div>
  )
}

export default ProfileDashboard
import { useContext, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { MdDateRange } from "react-icons/md"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import flutterwave_img from '../../assets/flutterwave.png'
import interswitch_img from '../../assets/interswitch.png'
import stripe_img from '../../assets/stripe.png'
import HomeBookCards from '../../components/BookCards/HomeBookCards'
import { GlobalStateContext } from '../../Context/GlobalState'


const ProfileDashboard = () => {

  const { user, userId, setUser, setLoggedIn, results, setResults, isSearch, setIsSearch, uploadedFiles, setUploadedFiles } = useContext(GlobalStateContext)


  const location = useLocation()
  //reset search on route change
  useEffect(() => {
    setIsSearch(false)
    setResults([])
  }, [location, setIsSearch, setResults])

  const [updatedName, setUpdatedName] = useState("")
  const [updatedEmail, setUpdatedEmail] = useState("")
  const [updatedPassword, setUpdatedPassword] = useState("")
  const [updatedPassword2, setUpdatedPassword2] = useState("")
  const [updatedLastName, setUpdatedLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowconfirmPassword] = useState(false)


  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedFile, setSelectedFile] = useState(null)
  //const [uploadedFiles, setUploadedFiles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadedOption, setUploadedOption] = useState('')//initial radio state
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [isPopover, setIsPopover] = useState(false)
  const [showUploadButton, setShowUploadButton] = useState(false)

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

  const home = () => {
    navigate('/')
  }





  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setShowUploadButton(true)
    } else {
      alert('Please upload a PDF file.')
    }
  }

  const updateUserProfile = async (e) => {
    e.preventDefault()
   toast.info("Updating...",{
      autoClose:1000
   })

    const formData = new FormData()
    if (updatedPassword) {
      formData.append("password1", updatedPassword);
    } else {
      // Handle case where password is not provided (e.g., show an error message)
      toast.error("Password is required")
      return; // Exit the function or perform an appropriate action
    }
    if (updatedName) {
      formData.append("name", updatedName);
    }
    
    if (updatedLastName) {
      formData.append("last_name", updatedLastName);
    }
    
    if (updatedEmail) {
      formData.append("email", updatedEmail);
    }

    try {
      const Token = localStorage.getItem('accessToken');
      if (!Token) {
        setUser(null);
        setLoggedIn(false);
        return;
      }


      const response = await fetch('https://api.iwemiresearch.org/api/auth/profile/', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: formData
      });

      if (!response.ok) {
        toast.error("Try again")
      }
      else {
        toast.success("Successfully updated")
        navigate(-1)
        setActiveTab('profile')
      }
    } catch (error) {
      console.error(error);
    }

  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleConfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword)
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

  const handleFinaliseUpload = async (e) => {
    e.preventDefault()

    toast.info("Upload Started")
    let fileUrl = ''

    //extracting file name
    const fileExt = selectedFile.name.split('.').pop()
    //genrating a unique filename by appending current timestamp to file extension
    //const fileName = `${Date.now()}.${fileExt}`
    //const filePath = `public/${fileName}`
    console.log(selectedFile)
    const filePath = selectedFile.name
    console.log(fileExt)


    console.log(filePath)
    console.log(selectedFile.name)
    fileUrl = `https://moozotwbqobybcbidade.supabase.co/storage/v1/object/public/book_file/${filePath}`
    console.log(fileUrl)



    ///storing file info for later use in other components7
    /**  const formData = {
      title,
      authors,
      yearP,
      date,
      type,
      uploadedOption,
      fileUrl,
      category,
      subcategory
    }*/

    const openFormData = {
      title,
      authors,
      yearP,
      type,
      uploadedOption,
      selectedFile,
      category,
      subcategory,
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
      let resourceId = null

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
        console.log('File path:', filePath);

        const uploadData = new FormData()
        uploadData.append("name", title)
        uploadData.append("type", type)
        uploadData.append("category", category)
        uploadData.append("subcategory", subcategory)
        uploadData.append("author", authors)
        uploadData.append("abstract", abstract)
        uploadData.append("year_published", yearP)
        uploadData.append("resource_id", resourceId)
        uploadData.append("is_open_access", false)
        uploadData.append("file", selectedFile)

        const response2 = await fetch("https://api.iwemiresearch.org/api/papers/", {
          method: 'POST',
          body: uploadData
        })

        const responseText = await response2.text();
        console.log(responseText); // This will show you the detailed error message


        if (!response2.ok) {
          throw new Error('Failed to upload the book')
        }

        /**
         *  const { error: storageError } = await supabase
          .storage
          .from('book_file')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: true
          })

        if (storageError) {
          toast.error('Error uploading file:', storageError);
          alert(storageError)
          return
        }
        //data: dbData
        const { error: dbError } = await supabase
          .from('api_book')
          .insert([
            {
              name: title,
              author: authors,
              abstract: abstract,
              year_published: yearP,
              date_uploaded: date,
              category_id: categoryId,
              sub_category_id: subcategory_id,
              discipline_id: discipline_id,
              is_open_access: false,
              file_url: fileUrl,
              resource_id: resourceId
            }
          ])
         
        //const { data: storageData, error: storageError } = await supabase



        if (dbError) {
          toast.error('Error pushing field names to databse', dbError)
          console.log(dbError)
        } else {
          console.log('Field names pushed to supabase:', data)
          toast.success('Upload succesful')
        }*/
        const newFile = {
          name: formData.name,
          size: (selectedFile.size / 1024).toFixed(2) + 'KB',
          date: new Date().toLocaleString(),
          option: uploadedOption
        };
        const upadatedUploadedFiles = [...uploadedFiles, newFile]
        setUploadedFiles(upadatedUploadedFiles)
        //save to loacl storage
        localStorage.setItem(`uploadedFiles_${userId}`, JSON.stringify(upadatedUploadedFiles))
        setShowUploadButton(false)
        closeUploadModal()
      } catch (error) {
        console.error('Error uploading book:', error)
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
      uploadData.append("year_published", yearP)
      // uploadData.append("resource_id", resourceId)
      uploadData.append("is_open_access", false)
      uploadData.append("file", selectedFile)

      localStorage.setItem('openFormData', JSON.stringify(uploadData))

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
        quantity: 1,
        price: 159600,
        total: 159600
      };
      localStorage.setItem('product', JSON.stringify(product))
      navigate('/payment', { state: { products: [product], total: 159600, fromUploadPage: true } })
    }
    else {
      alert('Please select an option before finalising option')
    }
  }

  const handleLogout = async () => {



    //await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('session')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    setLoggedIn(false)
    home()
  }

  //console.log(user)

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  max-w-[40vw]">
            {user && (<h1 className="text-[24px] font-bold text-gray-900 dark:text-white mb-8">Hello, {user.name}!
              {/* {user.user_metadata.lastName} */}
            </h1>)}

            <p className="mb-2">From your profile page you can view your{' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('orders') }} >recent orders</a>, {' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('accountDetails') }}>edit your password and account details</a>
            </p>


            {user && (<p className='mt-10'>(Not
              <span className='font-bold'> {user.email}</span>
              ?)</p>)}

            <button className='px-5 py-3 bg-blue-700 rounded-lg text-white mt-5'>
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('logout') }}>Log out</a>
            </button>

          </div>
        );
      case 'uploads':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  min-w-[40vw]">
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

            {/**file upload form */}
            <div className='flex items-center'>
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

            {selectedFile && showUploadButton && (
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
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Subscription based</span>
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
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  min-w-[40vw]">
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

        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  min-w-[40vw]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Payment Methods</h3>
            <p>No saved Methods found</p>
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className=" block add-payment-method bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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
                      Pay with Stripe
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
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  max-w-[40vw]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Account Details</h3>



            <form className="max-w-sm mx-auto">
              <div className="mb-5">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name </label>
                <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  />
              </div>
              <div className="mb-5">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name </label>
                <input type="text" value={updatedLastName} onChange={(e) => setUpdatedLastName(e.target.value)} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
              </div>

            </form>



            <form className="max-w-sm mx-auto update-email">
              <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)}
                  type="text"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Update your email"
                   />
              </div>
            </form>

            <form className="max-w-sm mx-auto password-change">
              <div className='mb-5'>
                <h2>Confirm with Password</h2>
              </div>
              <div className="mb-5 relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  value={updatedPassword}
                  onChange={(e) => setUpdatedPassword(e.target.value)}  // Corrected here
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3  text-black flex items-center text-sm leading-5 "
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <Link to='/password-reset'  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                 
                >
                  Forgot password?
                </Link>
              </div>

              <div className="mb-5 relative">
                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input value={updatedPassword2}
                  onChange={(e) => setUpdatedPassword2(e.target.value)}
                  placeholder="••••••••" // Corrected here
                  type={showconfirmPassword ? "text" : "password"}
                  id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 mt-6  text-black flex items-center text-sm leading-5 "
                  >
                    {showconfirmPassword ? 'Hide' : 'Show'}
                  </button>
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                  
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
              </div>
              <button onClick={updateUserProfile} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
            </form>

          </div>
        );
      case 'logout':
        return (
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg break-words  max-w-[30vw]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Are you sure you want to log out ? </h3>
            <p className="mb-2">From your profile page you can view your{' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('orders') }} >recent orders</a>, {' '}
              <a href="" onClick={(e) => { e.preventDefault(); setActiveTab('accountDetails') }}>edit your password and account details</a>
            </p>


            <button className='px-5 py-3 bg-blue-700 rounded-lg text-white mt-5'>

              <a href="" onClick={(e) => {
                e.preventDefault();
                handleLogout()
                setLoggedIn(false)
              }}>
                Confirm and log out
              </a>
            </button>

          </div>
        );
      default:
        return null;
    }
  };




  return (
    <div className='flex flex-col profile-container flex-grow'>

      {isSearch ? (<section className="dark:bg-gray-900 features" data-aos="fade-up">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16 features-text">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Search Results</h2>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:space-y-0">
            {results.length > 0 ? (
              results.map(book => (
                <HomeBookCards key={book.id} book={book} />
              ))
            ) : (
              <p className="text-gray-500 sm:text-xl dark:text-gray-400">No results found</p>
            )}
          </div>
        </div>
      </section>)
        :
        (<div className="profile-page flex flex-col ">
          <div className="profile-page-title">
            My account
          </div>
          <div className="profile-page-content">

            <div className="md:flex sm:">
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
        </div>)}


    </div>
  )
}

export default ProfileDashboard
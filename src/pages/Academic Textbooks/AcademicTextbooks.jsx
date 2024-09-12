/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../Context/CartContext';
import { GlobalStateContext } from '../../Context/GlobalState';
import BookItem from '../../components/BookCards/BookItem';
import HomeBookCards from '../../components/BookCards/HomeBookCards';

const ITEMS_PER_PAGE = 15

const AcademicTextbooks = () => {
    const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();
    const matchesFirstThreeLetters = (source, target) =>
        source.toLowerCase().startsWith(target.toLowerCase().slice(0, 3));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isEachCategoryOpen, setIsEachCategoryOpen] = useState({
        agriculture: false,
        arts: false,
        biologicalSciences: false,
        administration: false,
        dentistry: false,
        engineering: false,
        environmentalSciences: false,
        healthSciences: false,
        law: false,
        medicalSciences: false,
        pharmaceuticalSciences: false,
        physicalSciences: false,
        socialSciences: false,
        veterinaryMedicine: false,
    })
    const [loading, setLoading] = useState(false)
    const [accessType, setAccessType] = useState('all')
    const [checkboxValues, setCheckboxValues] = useState({
        agriculturalEconomics: false,
        agriculturalExtension: false,
        agronomy: false,
        animalScience: false,
        cropScience: false,
        foodScience: false,
        fisheries: false,
        forestry: false,
        homeScience: false,
        soilScience: false,
        archeology: false,
        arabicStudies: false,
        christianStudies: false,
        englishStudies: false,
        fineArts: false,
        foreignLanguages: false,
        history: false,
        linguistics: false,
        massCommunication: false,
        music: false,
        theatreStudies: false,
        biochemistry: false,
        botany: false,
        microbiology: false,
        marineBiology: false,
        cellBiology: false,
        zoology: false,
        accountancy: false,
        actuarialScience: false,
        businessAdministration: false,
        businessManagement: false,
        bankingFinance: false,
        hospitalityTourism: false,
        marketing: false,
        insurance: false,
        industrialRelations: false,
        childDentalHealth: false,
        maxillofacialSurgery: false,
        preventiveDentistry: false,
        restorativeDentistry: false,
        adultEducation: false,
        artsEducation: false,
        educationAccountancy: false,
        educationComputerScience: false,
        educationEconomics: false,
        educationMathematics: false,
        educationPhysics: false,
        educationReligiousStudies: false,
        educationSocialScience: false,
        educationBiology: false,
        educationChemistry: false,
        educationEnglish: false,
        educationFrench: false,
        educationGeography: false,
        educationPoliticalScience: false,
        educationalFoundations: false,
        educationalPsychology: false,
        healthEducation: false,
        libraryScience: false,
        scienceEducation: false,
        socialScienceEducation: false,
        vocationalEducation: false,
        religion: false,
        igboLinguistics: false,
        agriculturalEngineering: false,
        civilEngineering: false,
        chemicalEngineering: false,
        computerEngineering: false,
        electricalEngineering: false,
        electronicEngineering: false,
        marineEngineering: false,
        mechanicalEngineering: false,
        metallurgicalEngineering: false,
        petroleumEngineering: false,
        systemsEngineering: false,
        structuralEngineering: false,
        productionEngineering: false,
        architecture: false,
        estateManagement: false,
        quantitySurveying: false,
        building: false,
        geoinformatics: false,
        urbanPlanning: false,
        healthAdministration: false,
        medicalLaboratory: false,
        medicalRadiography: false,
        medicalRehabilitation: false,
        nursingSciences: false,
        commercialLaw: false,
        internationalLaw: false,
        privateLaw: false,
        anatomy: false,
        anesthesia: false,
        chemicalPathology: false,
        communityMedicine: false,
        dermatology: false,
        hematology: false,
        medicalBiochemistry: false,
        medicalMicrobiology: false,
        medicine: false,
        morbidAnatomy: false,
        obstetrics: false,
        ophthalmology: false,
        otolaryngology: false,
        pediatrics: false,
        pharmacology: false,
        physiology: false,
        radiationMedicine: false,
        surgery: false,
        psychologicalMedicine: false,
        clinicalPharmacy: false,
        pharmaceuticalChemistry: false,
        pharmaceuticalTechnology: false,
        pharmaceutics: false,
        pharmacognosy: false,
        departmentPharmacology: false,
        computerScience: false,
        geology: false,
        mathematics: false,
        physicsAstronomy: false,
        geophysics: false,
        industrialChemistry: false,
        statistics: false,
        economics: false,
        geography: false,
        philosophy: false,
        politicalScience: false,
        psychology: false,
        publicAdministration: false,
        socialWork: false,
        sociology: false,
        veterinaryPhysiology: false,
        veterinaryAnatomy: false,
        animalHealth: false,
        veterinaryParasitology: false,
        veterinaryPathology: false,
        veterinaryPublicHealth: false,
        veterinarySurgery: false,
        veterinaryMedicine: false,
        veterinaryObstetrics: false,
        veterinaryTeachingHospital: false,

    });
    const [categoryCheckValues, setCategoryCheckValues] = useState({
        agriculture: false,
        arts: false,
        biologicalSciences: false,
        administration: false,
        dentistry: false,
        education: false,
        engineering: false,
        environmentalSciences: false,
        healthSciences: false,
        law: false,
        medicalSciences: false,
        pharmaceuticalSciences: false,
        physicalSciences: false,
        socialSciences: false,
        veterinaryMedicine: false,
    })
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [academic, setAcademic] = useState([]);
    const [expandedBookId, setExpandedBookId] = useState(null)

    const handleToggleExpand = (bookId) => {
        setExpandedBookId((prevId) => (prevId === bookId ? null : bookId))
    }


    const handleCategoryCheckboxChange = (e) => {
        const { id, checked } = e.target
        setCategoryCheckValues((prevState) => ({
            ...prevState,
            [id]: checked,
        }))
    }



    const toggleSidebar = () => {

        setIsOpen(!isOpen)
        console.log(isOpen)
        if (isOpen) {
            removeBackdrop()
        }
    }


    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)
    const menuRef = useRef(null)

    const removeBackdrop = () => {
        const backdrop = document.querySelector('div[drawer-backdrop]');
        if (backdrop) {
            backdrop.remove();
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const categoryDropDown = () => {
        setIsCategoryOpen(!isCategoryOpen)
    }

    const eachCategoryDropDown = (category) => {
        setIsEachCategoryOpen((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }))
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleClickOutsideMenu = (e) => {
        if (isOpen) {
            if (buttonRef.current && !buttonRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false)
                removeBackdrop()
            }
        }

    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutsideMenu);


        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setIsOpen(true)
                removeBackdrop()
            } else {

            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()



        return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutsideMenu);
        };
    }, []);

    useEffect(() => {
        if (!isOpen) {
            removeBackdrop();
        }
    }, [isOpen]);

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target
        setCheckboxValues((prevState) => ({
            ...prevState,
            [id]: checked,
        }))
    }
    const [filters, setFilters] = useState({
        citationCount: false,
        name: false,
        createdOn: false
    })

    const { results, setResults, isSearch, setIsSearch } = useContext(GlobalStateContext)
    const location = useLocation()
    //reset search on route change
    useEffect(() => {
        setIsSearch(false)
        setResults([])
    }, [location])



    useEffect(() => {


        const fetchAcademic = async () => {
            setLoading(true)
            try {

                const response2 = await fetch("https://api.iwemiresearch.org/api/papers/", {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    },

                })

                if (!response2.ok) {
                    throw new Error('Failed to fetch journals')
                }

                const academics = await response2.json()
                //console.log(academics)

                const academicPapers = academics.filter(paper => paper.type === 'Academic Textbooks' && paper.is_approved === true)
                setAcademic(academicPapers)
                console.log(academicPapers)

                const totalItems = academicPapers.length
                setTotalPage(Math.ceil(totalItems / ITEMS_PER_PAGE))
                //console.log('count', count)
            } catch (error) {
                console.error('Error in academicT:', error);
            }
            setLoading(false)

        }

        fetchAcademic()


    }, [currentPage, ITEMS_PER_PAGE, accessType])

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedAcademic = academic.slice(startIndex, endIndex);

    const handleFitlerChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }))
    }

    const applyFilters = (books) => {
        let filteredBooks = [...books]




        if (Object.values(categoryCheckValues).some(value => value)) {
            filteredBooks = filteredBooks.filter(book =>
                Object.keys(categoryCheckValues).some(category =>
                    categoryCheckValues[category] && matchesFirstThreeLetters(book.category, category)
                )
            );
        }

        // Filter by subcategory
        if (Object.values(checkboxValues).some(value => value)) {
            filteredBooks = filteredBooks.filter(book =>
                Object.keys(checkboxValues).some(subcategory =>
                    checkboxValues[subcategory] && matchesFirstThreeLetters(book.subcategory, subcategory)
                )
            );
        }
        if (accessType === 'open') {
            filteredBooks = filteredBooks.filter(book => book.is_open_access);
        } else if (accessType === 'non-open') {
            filteredBooks = filteredBooks.filter(book => !book.is_open_access);
        }

        if (filters.name) {
            filteredBooks.sort((a, b) => a.name.toString().localeCompare(b.name.toString()))
        }

        if (filters.createdOn) {
            filteredBooks.sort((a, b) => new Date(b.year_published) - new Date(a.year_published));
        }

        if (filters.citationCount) {
            filteredBooks.sort((a, b) => b.citationCount - a.citationCount);
        }

        return filteredBooks
    }

    const filteredPapers = applyFilters(paginatedAcademic)

    const { state, dispatch } = useCart()

    const handleAddToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item })
        // toast.error('Added to Shopping Cart')
        toast.success('Added to Shopping Cart')
    }

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAccessTypeChange = (type) => {
        setAccessType(type)
        setCurrentPage(1)
        applyFilters(filteredPapers)
    }




    return loading ?
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

            </div>
        </div>
        : (
            <div>


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
                    (<div className="thesis type flex flex-col items-center">
                        <div className="thesis-hero flex items-center w-full p-5">
                            <h1>
                                Academic Textbooks
                            </h1>
                        </div>
                        <div className="empty w-full">

                        </div>
                        <div className="thesis-content flex  ">
                            <div className="sidebar flex flex-col  relative">

                                <button
                                    ref={buttonRef}
                                    onClick={toggleSidebar}
                                    data-drawer-target="sidebar-multi-level-sidebar"
                                    data-drawer-toggle="sidebar-multi-level-sidebar"
                                    aria-controls="sidebar-multi-level-sidebar"
                                    type="button"
                                    className="inline-flex items-center p-2 mt-2 mx-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none 
                                focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sidebar-button">
                                    <span className="sr-only">Open sidebar</span>
                                    <HiMenuAlt2 size={24} />

                                </button>

                                <aside ref={menuRef} id="sidebar-multi-level-sidebar" className={` w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full fixed left-0 top-0'} `} aria-label="Sidebar">
                                    <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
                                        <ul className="space-y-2 font-medium">


                                            <li>
                                                <div onClick={categoryDropDown} className="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
                                                    <span>{isCategoryOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>

                                                </div>
                                                {isCategoryOpen && (
                                                    <ul className='type-category' >
                                                        <li className="flex flex-col  mb-4 " onClick={() => eachCategoryDropDown('agriculture')}>
                                                            <div className='flex items-center  hover:bg-gray-100 dark:hover:bg-gray-700  '>
                                                                <input id="agriculture" type="checkbox" value="" checked={categoryCheckValues.agriculture} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="agriculture" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agriculture</label>
                                                                <span className='ml-6'>{isEachCategoryOpen.agriculture ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.agriculture &&
                                                                (<div className='ms-3'>
                                                                    <ul className="">
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="agriculture-checkbox" type="checkbox" checked={checkboxValues.agriculture} onChange={handleCheckboxChange} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="agriculture-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agriculture</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="agriculturalEconomics" type="checkbox" checked={checkboxValues.agriculturalEconomics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="agriculturalEconomics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agricultural Economics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="agriculturalExtension" type="checkbox" checked={checkboxValues.agriculturalExtension} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="agriculturalExtension" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agricultural Extension</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="agronomy" type="checkbox" checked={checkboxValues.agronomy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="agronomy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agronomy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="animalScience" type="checkbox" checked={checkboxValues.animalScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="animalScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Animal Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="cropScience" type="checkbox" checked={checkboxValues.cropScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="cropScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Crop Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="foodScience" type="checkbox" checked={checkboxValues.foodScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="foodScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Food Science and Technology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="fisheries" type="checkbox" checked={checkboxValues.fisheries} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="fisheries" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fisheries</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="forestry" type="checkbox" checked={checkboxValues.forestry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="forestry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Forest Resources Management (Forestry)</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="homeScience" type="checkbox" checked={checkboxValues.homeScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="homeScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Science, Nutrition and Dietetics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="soilScience" type="checkbox" checked={checkboxValues.soilScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="soilScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Soil Science</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>)
                                                            }

                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('arts')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="arts" type="checkbox" value="" checked={categoryCheckValues.arts} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="arts" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arts</label>
                                                                <span className="ml-6">{isEachCategoryOpen.arts ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.arts && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="archeology" type="checkbox" checked={checkboxValues.archeology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="archeology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Archeology and Tourism</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="arabicStudies" type="checkbox" checked={checkboxValues.arabicStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="arabicStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arabic and Islamic Studies</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="christianStudies" type="checkbox" checked={checkboxValues.christianStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="christianStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Christian Religious Studies</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="englishStudies" type="checkbox" checked={checkboxValues.englishStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="englishStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">English and Literary Studies</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="fineArts" type="checkbox" checked={checkboxValues.fineArts} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="fineArts" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fine and Applied Arts (Creative Arts)</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="foreignLanguages" type="checkbox" checked={checkboxValues.foreignLanguages} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="foreignLanguages" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Foreign Languages and Literature</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="history" type="checkbox" checked={checkboxValues.history} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="history" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">History and International Studies</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="linguistics" type="checkbox" checked={checkboxValues.linguistics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="linguistics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Linguistics and Nigerian Languages</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="massCommunication" type="checkbox" checked={checkboxValues.massCommunication} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="massCommunication" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mass Communication (Communication and Language Arts)</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="music" type="checkbox" checked={checkboxValues.music} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="music" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Music</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="theatreStudies" type="checkbox" checked={checkboxValues.theatreStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="theatreStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Theatre and Film Studies</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        {/* Similarly, create lists for each remaining category */}
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('biologicalSciences')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="biologicalSciences" type="checkbox" value="" checked={categoryCheckValues.biologicalSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="biologicalSciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biological Sciences</label>
                                                                <span className="ml-6">{isEachCategoryOpen.biologicalSciences ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.biologicalSciences && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="biochemistry" type="checkbox" checked={checkboxValues.biochemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="biochemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biochemistry</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="botany" type="checkbox" checked={checkboxValues.botany} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="botany" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Botany</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="microbiology" type="checkbox" checked={checkboxValues.microbiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="microbiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Microbiology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="marineBiology" type="checkbox" checked={checkboxValues.marineBiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="marineBiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marine Biology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="cellBiology" type="checkbox" checked={checkboxValues.cellBiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="cellBiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cell Biology & Genetics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="zoology" type="checkbox" checked={checkboxValues.zoology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="zoology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zoology</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('administration')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="administration" type="checkbox" value="" checked={categoryCheckValues.administration} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="administration" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Administration</label>
                                                                <span className="ml-6">{isEachCategoryOpen.administration ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.administration && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="accountancy" type="checkbox" checked={checkboxValues.accountancy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="accountancy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Accountancy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="actuarial-science" type="checkbox" checked={checkboxValues.actuarialScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="actuarial-science" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Actuarial Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="business-administration" type="checkbox" checked={checkboxValues.businessAdministration} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="business-administration" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Business Administration</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="business-management" type="checkbox" checked={checkboxValues.businessManagement} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="business-management" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Business Management</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="banking-finance" type="checkbox" checked={checkboxValues.bankingFinance} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="banking-finance" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Banking and Finance</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="hospitality-tourism" type="checkbox" checked={checkboxValues.hospitalityTourism} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="hospitality-tourism" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hospitality and Tourism</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="marketing" type="checkbox" checked={checkboxValues.marketing} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="marketing" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marketing</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="insurance" type="checkbox" checked={checkboxValues.insurance} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="insurance" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Insurance</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="industrial-relations" type="checkbox" checked={checkboxValues.industrialRelations} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="industrial-relations" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Industrial Relations and Personnel Management</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('dentistry')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="dentistry" type="checkbox" value="" checked={categoryCheckValues.dentistry} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="dentistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dentistry</label>
                                                                <span className="ml-6">{isEachCategoryOpen.dentistry ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.dentistry && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="child-dental-health" type="checkbox" checked={checkboxValues.childDentalHealth} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="child-dental-health" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Child Dental Health</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="oral-maxillofacial-surgery" type="checkbox" checked={checkboxValues.maxillofacialSurgery} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="oral-maxillofacial-surgery" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oral and Maxillofacial Surgery</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="preventive-dentistry" type="checkbox" checked={checkboxValues.preventiveDentistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="preventive-dentistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Preventive Dentistry</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="restorative-dentistry" type="checkbox" checked={checkboxValues.restorativeDentistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="restorative-dentistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Restorative Dentistry</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('education')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="education" type="checkbox" value="" checked={categoryCheckValues.education} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education</label>
                                                                <span className="ml-6">{isEachCategoryOpen.education ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.education && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="adult-education" type="checkbox" checked={checkboxValues.adultEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="adult-education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adult Education and Extra-Mural Studies</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="arts-education" type="checkbox" checked={checkboxValues.artsEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="arts-education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arts Education</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-accountancy" type="checkbox" checked={checkboxValues.educationAccountancy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-accountancy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Accountancy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-computer-science" type="checkbox" checked={checkboxValues.educationComputerScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-computer-science" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Computer Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-economics" type="checkbox" checked={checkboxValues.educationEconomics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-economics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Economics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-mathematics" type="checkbox" checked={checkboxValues.educationMathematics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-mathematics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Mathematics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-physics" type="checkbox" checked={checkboxValues.educationPhysics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-physics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Physics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-religious-studies" type="checkbox" checked={checkboxValues.educationReligiousStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-religious-studies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Religious Studies</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-social-science" type="checkbox" checked={checkboxValues.educationSocialScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-social-science" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education &amp; Social Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-biology" type="checkbox" checked={checkboxValues.educationBiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-biology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education And Biology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-chemistry" type="checkbox" checked={checkboxValues.educationChemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-chemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education And Chemistry</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-english" type="checkbox" checked={checkboxValues.educationEnglish} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-english" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education And English Language</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-french" type="checkbox" checked={checkboxValues.educationFrench} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-french" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education And French</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-geography-physics" type="checkbox" checked={checkboxValues.educationGeography} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-geography-physics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education And Geography/Physics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="education-political-science" type="checkbox" checked={checkboxValues.educationPoliticalScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="education-political-science" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education And Political Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="educational-foundations" type="checkbox" checked={checkboxValues.educationalFoundations} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="educational-foundations" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Educational Foundations</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="educational-psychology" type="checkbox" checked={checkboxValues.educationalPsychology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="educational-psychology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Educational / Psychology Guidance And Counselling</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="health-physical-education" type="checkbox" checked={checkboxValues.healthPhysicalEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="health-physical-education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Health and Physical Education</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="library-information-science" type="checkbox" checked={checkboxValues.libraryInformationScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="library-information-science" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Library and Information Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="science-education" type="checkbox" checked={checkboxValues.scienceEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="science-education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Science Education</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="social-sciences-education" type="checkbox" checked={checkboxValues.socialScienceEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="social-sciences-education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Sciences Education</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="vocational-teacher-education" type="checkbox" checked={checkboxValues.vocationalEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="vocational-teacher-education" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vocational Teacher Education (Technical Education)</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="religion" type="checkbox" checked={checkboxValues.religion} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="religion" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Religion</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="igbo-linguistics" type="checkbox" checked={checkboxValues.igboLinguistics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="igbo-linguistics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Igbo Linguistics</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('engineering')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="engineering" type="checkbox" value="" checked={categoryCheckValues.engineering} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Engineering</label>
                                                                <span className="ml-6">{isEachCategoryOpen.engineering ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.engineering && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="agricultural-bioresources-engineering" type="checkbox" checked={checkboxValues.agriculturalBioresourcesEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="agricultural-bioresources-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agricultural and Bioresources Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="civil-engineering" type="checkbox" checked={checkboxValues.civilEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="civil-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Civil Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="chemical-engineering" type="checkbox" checked={checkboxValues.chemicalEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="chemical-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chemical Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="computer-engineering" type="checkbox" checked={checkboxValues.computerEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="computer-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Computer Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="electrical-engineering" type="checkbox" checked={checkboxValues.electricalEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="electrical-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Electrical Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="electronic-engineering" type="checkbox" checked={checkboxValues.electronicEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="electronic-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Electronic Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="marine-engineering" type="checkbox" checked={checkboxValues.marineEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="marine-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marine Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="mechanical-engineering" type="checkbox" checked={checkboxValues.mechanicalEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="mechanical-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mechanical Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="metallurgical-materials-engineering" type="checkbox" checked={checkboxValues.metallurgicalEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="metallurgical-materials-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Metallurgical and Materials Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="petroleum-gas-engineering" type="checkbox" checked={checkboxValues.petroleumEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="petroleum-gas-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Petroleum and Gas Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="systems-engineering" type="checkbox" checked={checkboxValues.systemsEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="systems-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Systems Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="structural-engineering" type="checkbox" checked={checkboxValues.structuralEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="structural-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Structural Engineering</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="production-industrial-engineering" type="checkbox" checked={checkboxValues.productionEngineering} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="production-industrial-engineering" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Production and Industrial Engineering</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('environmentalSciences')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="environmentalSciences" type="checkbox" value="" checked={categoryCheckValues.environmentalSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="environmentalSciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Environmental Sciences</label>
                                                                <span className="ml-6">{isEachCategoryOpen.environmentalSciences ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.environmentalSciences && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="architecture" type="checkbox" checked={checkboxValues.architecture} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="architecture" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Architecture</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="estate-management" type="checkbox" checked={checkboxValues.estateManagement} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="estate-management" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estate Management</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="quantity-surveying" type="checkbox" checked={checkboxValues.quantitySurveying} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="quantity-surveying" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity Surveying</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="building" type="checkbox" checked={checkboxValues.building} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="building" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Building</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="geoinformatics-surveying" type="checkbox" checked={checkboxValues.geoinformatics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="geoinformatics-surveying" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geoinformatics and Surveying</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="urban-regional-planning" type="checkbox" checked={checkboxValues.urbanPlanning} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="urban-regional-planning" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Urban and Regional Planning</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('healthSciencesTechnology')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="health-sciencesTechnology" type="checkbox" value="" checked={categoryCheckValues.healthSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="health-sciencesTechnology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Health Sciences &amp; Technology</label>
                                                                <span className="ml-6">{isEachCategoryOpen.healthSciencesTechnology ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.healthSciencesTechnology && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="health-administration-management" type="checkbox" checked={checkboxValues.healthAdministration} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="health-administration-management" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Health Administration and Management</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="medical-laboratory-sciences" type="checkbox" checked={checkboxValues.medicalLaboratory} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="medical-laboratory-sciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Laboratory Sciences</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="medical-radiography-radiological-sciences" type="checkbox" checked={checkboxValues.medicalRadiography} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="medical-radiography-radiological-sciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Radiography and Radiological Sciences</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="medical-rehabilitation" type="checkbox" checked={checkboxValues.medicalRehabilitation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="medical-rehabilitation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Rehabilitation</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="nursing-sciences" type="checkbox" checked={checkboxValues.nursingSciences} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="nursing-sciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nursing Sciences</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('law')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="law" type="checkbox" value="" checked={categoryCheckValues.law} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="law" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Law</label>
                                                                <span className="ml-6">{isEachCategoryOpen.law ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.law && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="commercial-property-law" type="checkbox" checked={checkboxValues.commercialLaw} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="commercial-property-law" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Commercial and Property Law</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="international-jurisprudence" type="checkbox" checked={checkboxValues.internationalLaw} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="international-jurisprudence" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">International and Jurisprudence</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="private-public-law" type="checkbox" checked={checkboxValues.privateLaw} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="private-public-law" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private and Public Law</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('medicalSciences')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="medicalSciences" type="checkbox" value="" checked={categoryCheckValues.medicalSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="medicalSciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Sciences</label>
                                                                <span className="ml-6">{isEachCategoryOpen.medicalSciences ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.medicalSciences && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="anatomy" type="checkbox" checked={checkboxValues.anatomy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="anatomy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Anatomy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="anesthesia" type="checkbox" checked={checkboxValues.anesthesia} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="anesthesia" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Anesthesia</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="chemicalPathology" type="checkbox" checked={checkboxValues.chemicalPathology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="chemicalPathology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chemical Pathology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="communityMedicine" type="checkbox" checked={checkboxValues.communityMedicine} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="communityMedicine" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Community Medicine</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="dermatology" type="checkbox" checked={checkboxValues.dermatology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="dermatology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dermatology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="hematologyAndImmunology" type="checkbox" checked={checkboxValues.hematology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="hematologyAndImmunology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hematology and Immunology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="medicalBiochemistry" type="checkbox" checked={checkboxValues.medicalBiochemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="medicalBiochemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Biochemistry</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="medicalMicrobiology" type="checkbox" checked={checkboxValues.medicalMicrobiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="medicalMicrobiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Microbiology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="medicine" type="checkbox" checked={checkboxValues.medicine} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="medicine" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medicine</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="morbidAnatomy" type="checkbox" checked={checkboxValues.morbidAnatomy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="morbidAnatomy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Morbid Anatomy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="obstetricsAndGynecology" type="checkbox" checked={checkboxValues.obstetrics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="obstetricsAndGynecology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Obstetrics and Gynecology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="ophthalmology" type="checkbox" checked={checkboxValues.ophthalmology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="ophthalmology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ophthalmology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="otolaryngology" type="checkbox" checked={checkboxValues.otolaryngology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="otolaryngology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Otolaryngology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pediatrics" type="checkbox" checked={checkboxValues.pediatrics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pediatrics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pediatrics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pharmacologyAndTherapeutics" type="checkbox" checked={checkboxValues.pharmacology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pharmacologyAndTherapeutics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmacology and Therapeutics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="physiology" type="checkbox" checked={checkboxValues.physiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="physiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physiology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="radiationMedicine" type="checkbox" checked={checkboxValues.radiationMedicine} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="radiationMedicine" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Radiation Medicine</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="surgery" type="checkbox" checked={checkboxValues.surgery} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="surgery" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Surgery</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="psychologicalMedicine" type="checkbox" checked={checkboxValues.psychologicalMedicine} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="psychologicalMedicine" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Psychological Medicine</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="childDentalHealth" type="checkbox" checked={checkboxValues.childDentalHealth} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="childDentalHealth" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Child Dental Health</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('pharmaceuticalSciences')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="pharmaceuticalSciences" type="checkbox" value="" checked={categoryCheckValues.pharmaceuticalSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="pharmaceuticalSciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmaceutical Sciences</label>
                                                                <span className="ml-6">{isEachCategoryOpen.pharmaceuticalSciences ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.pharmaceuticalSciences && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="clinicalPharmacyAndPharmacyManagement" type="checkbox" checked={checkboxValues.clinicalPharmacy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="clinicalPharmacyAndPharmacyManagement" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clinical Pharmacy and Pharmacy Management</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pharmaceuticalChemistryAndIndustrialPharmacy" type="checkbox" checked={checkboxValues.pharmaceuticalChemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pharmaceuticalChemistryAndIndustrialPharmacy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmaceutical Chemistry and Industrial Pharmacy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pharmaceuticalTechnologyAndIndustrialPharmacy" type="checkbox" checked={checkboxValues.pharmaceuticalTechnology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pharmaceuticalTechnologyAndIndustrialPharmacy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmaceutical Technology and Industrial Pharmacy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pharmaceutics" type="checkbox" checked={checkboxValues.pharmaceutics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pharmaceutics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmaceutics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pharmacognosy" type="checkbox" checked={checkboxValues.pharmacognosy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pharmacognosy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmacognosy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="departmentOfPharmacologyAndToxicology" type="checkbox" checked={checkboxValues.departmentPharmacology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="departmentOfPharmacologyAndToxicology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department of Pharmacology and Toxicology</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('physicalSciences')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="physicalSciences" type="checkbox" value="" checked={categoryCheckValues.physicalSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="physicalSciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Sciences</label>
                                                                <span className="ml-6">{isEachCategoryOpen.physicalSciences ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.physicalSciences && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="computerScience" type="checkbox" checked={checkboxValues.computerScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="computerScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Computer Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="geology" type="checkbox" checked={checkboxValues.geology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="geology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="mathematics" type="checkbox" checked={checkboxValues.mathematics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="mathematics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mathematics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="physicsAndAstronomy" type="checkbox" checked={checkboxValues.physicsAstronomy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="physicsAndAstronomy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physics and Astronomy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="geophysics" type="checkbox" checked={checkboxValues.geophysics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="geophysics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geophysics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="pureAndIndustrialChemistry" type="checkbox" checked={checkboxValues.industrialChemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="pureAndIndustrialChemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pure and Industrial Chemistry</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="statistics" type="checkbox" checked={checkboxValues.statistics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="statistics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Statistics</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('socialSciences')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="socialSciences" type="checkbox" value="" checked={categoryCheckValues.socialSciences} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="socialSciences" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Sciences</label>
                                                                <span className="ml-6">{isEachCategoryOpen.socialSciences ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.socialSciences && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="economics" type="checkbox" checked={checkboxValues.economics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="economics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Economics</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="geography" type="checkbox" checked={checkboxValues.geography} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="geography" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geography</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="philosophy" type="checkbox" checked={checkboxValues.philosophy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="philosophy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Philosophy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="politicalScience" type="checkbox" checked={checkboxValues.politicalScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="politicalScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Political Science</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="psychology" type="checkbox" checked={checkboxValues.psychology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="psychology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Psychology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="publicAdministration" type="checkbox" checked={checkboxValues.publicAdministration} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="publicAdministration" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public Administration and Local Government</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="religion" type="checkbox" checked={checkboxValues.religion} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="religion" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Religion</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="socialWork" type="checkbox" checked={checkboxValues.socialWork} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="socialWork" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Work</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="sociologyAnthropology" type="checkbox" checked={checkboxValues.sociology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="sociologyAnthropology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sociology/Anthropology</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('veterinaryMedicine')}>
                                                            <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                <input id="veterinaryMedicine" type="checkbox" value="" checked={categoryCheckValues.veterinaryMedicine} onChange={handleCategoryCheckboxChange} onClick={(e) => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="veterinaryMedicine" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Medicine</label>
                                                                <span className="ml-6">{isEachCategoryOpen.veterinaryMedicine ? '▼' : '>'}</span>
                                                            </div>
                                                            {isEachCategoryOpen.veterinaryMedicine && (
                                                                <div className="ms-3">
                                                                    <ul>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryPhysiologyPharmacology" type="checkbox" checked={checkboxValues.veterinaryPhysiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryPhysiologyPharmacology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Physiology/Pharmacology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryAnatomy" type="checkbox" checked={checkboxValues.veterinaryAnatomy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryAnatomy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Anatomy</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="animalHealthProduction" type="checkbox" checked={checkboxValues.animalHealth} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="animalHealthProduction" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Animal Health and Production</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryParasitologyEntomology" type="checkbox" checked={checkboxValues.veterinaryParasitology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryParasitologyEntomology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Parasitology and Entomology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryPathologyMicrobiology" type="checkbox" checked={checkboxValues.veterinaryPathology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryPathologyMicrobiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Pathology and Microbiology</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryPublicHealth" type="checkbox" checked={checkboxValues.veterinaryPublicHealth} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryPublicHealth" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Public Health and Preventive Medicine</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinarySurgery" type="checkbox" checked={checkboxValues.veterinarySurgery} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinarySurgery" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Surgery</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryMedicine" type="checkbox" checked={checkboxValues.veterinaryMedicine} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryMedicine" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Medicine</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryObstetricsReproductiveDiseases" type="checkbox" checked={checkboxValues.veterinaryObstetrics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryObstetricsReproductiveDiseases" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Obstetrics and Reproductive Diseases</label>
                                                                        </li>
                                                                        <li className="flex items-center mb-4">
                                                                            <input id="veterinaryTeachingHospital" type="checkbox" checked={checkboxValues.veterinaryTeachingHospital} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                            <label htmlFor="veterinaryTeachingHospital" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Veterinary Teaching Hospital</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </li>






                                                    </ul>)}
                                            </li>
                                            <li>

                                                <div className="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Access Type</span>
                                                </div>

                                                <div className="flex items-center mb-4 ms-4">
                                                    <input
                                                        id="default-radio-1"
                                                        type="radio"
                                                        value="all"
                                                        name="access-type"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        onChange={() => handleAccessTypeChange('all')}
                                                        checked={accessType === 'all'}
                                                    />
                                                    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                                                </div>

                                                <div className="flex items-center mb-4 ms-4">
                                                    <input
                                                        id="default-radio-2"
                                                        type="radio"
                                                        value="open"
                                                        name="access-type"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        onChange={() => handleAccessTypeChange('open')}
                                                        checked={accessType === 'open'}
                                                    />
                                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Open-Access</label>
                                                </div>
                                                <div className="flex items-center ms-4">
                                                    <input
                                                        id="default-radio-3"
                                                        type="radio"
                                                        value="non-open"
                                                        name="access-type"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        onChange={() => handleAccessTypeChange('non-open')}
                                                        checked={accessType === 'non-open'}
                                                    />
                                                    <label htmlFor="default-radio-3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non Open-Access</label>
                                                </div>

                                            </li>
                                            {/** <li>
                                    <div className="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Language</span>

                                    </div>
                                    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="vue-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="react-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">French</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="angular-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Espanol</label>
                                            </div>
                                        </li>
                                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input id="laravel-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="laravel-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laravel</label>
                                            </div>
                                        </li>
                                    </ul>
                                </li>*/}




                                        </ul>
                                    </div>
                                </aside>



                            </div>
                            <div className="thesis-papers ">

                                <section className="  dark dark:bg-gray-900 p-3 sm:p-5">
                                    <div ref={dropdownRef}>
                                        <button
                                            onClick={toggleDropdown}
                                            id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full dark md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                            </svg>
                                            Filter
                                            <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </button>

                                        {isDropdownOpen && <div id="filterDropdown" className="z-10 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                                Sort by:
                                            </h6>
                                            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                                <li className="flex items-center">
                                                    <input
                                                        name="citationCount"
                                                        checked={filters.citationCount}
                                                        onChange={handleFitlerChange}
                                                        id="apple" type="checkbox" value=""
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        Citation Count
                                                    </label>
                                                </li>
                                                <li className="flex items-center">
                                                    <input
                                                        name='name'
                                                        checked={filters.name}
                                                        onChange={handleFitlerChange}
                                                        id="" type="checkbox" value=""
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        Name: A to Z
                                                    </label>
                                                </li>
                                                <li className="flex items-center">
                                                    <input
                                                        name='createdOn'
                                                        checked={filters.createdOn}
                                                        onChange={handleFitlerChange}
                                                        id="fitbit" type="checkbox" value=""
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        Created On
                                                    </label>
                                                </li>

                                            </ul>
                                        </div>}
                                    </div>

                                    <div className="type-papers flex flex-col">

                                        {filteredPapers.map((academic) => (
                                            <BookItem
                                                key={academic.id}
                                                book={academic}
                                                isExpanded={expandedBookId === academic.id}
                                                handleToggleExpand={handleToggleExpand}
                                                handleAddToCart={handleAddToCart}
                                            />
                                        ))
                                        }



                                    </div>
                                    <span>Page {currentPage} of {totalPage}</span>
                                    <div className="next-button flex gap-10">
                                        <button
                                            onClick={handlePreviousPage}
                                            disabled={currentPage === 1}
                                        >
                                            {'< Previous'}
                                        </button>
                                        {''}
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPage}
                                        >Next {'>'}</button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>)}

            </div>
        )
}

export default AcademicTextbooks
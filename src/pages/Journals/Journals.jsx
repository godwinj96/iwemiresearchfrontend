import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'


const Journals = () => {

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


    const dropdownRef = useRef(null)

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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target
        setCheckboxValues((prevState) => ({
            ...prevState,
            [id]: checked,
        }))
    }


    return (
        <div>
            <Navbar />
            <div className="thesis type flex flex-col items-center">
                <div className="thesis-hero flex items-center w-full">
                    <h1>
                        Journals
                    </h1>
                </div>
                <div className="empty w-full">

                </div>
                <div className="thesis-content flex w-full">
                    <div className="sidebar">

                        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span class="sr-only">Open sidebar</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>

                        <aside id="sidebar-multi-level-sidebar" class=" w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                            <div class="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
                                <ul class="space-y-2 font-medium">


                                    <li>
                                        <div onClick={categoryDropDown} class="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Category</span>
                                            <span>{isCategoryOpen ? '▼' : '>'}</span>

                                        </div>
                                        {isCategoryOpen && (
                                            <ul className='type-category' >
                                                <li class="flex flex-col  mb-4 " onClick={() => eachCategoryDropDown('agriculture')}>
                                                    <div className='flex items-center  hover:bg-gray-100 dark:hover:bg-gray-700  '>
                                                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agriculture</label>
                                                        <span className='ml-6'>{isEachCategoryOpen.agriculture ? '▼' : '>'}</span>
                                                    </div>
                                                    {isEachCategoryOpen.agriculture &&
                                                        (<div className='ms-3'>
                                                            <ul className="">
                                                                <li class="flex items-center mb-4">
                                                                    <input id="agriculture-checkbox" type="checkbox" checked={checkboxValues.agriculture} onChange={handleCheckboxChange} value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="agriculture-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agriculture</label>
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
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arts</label>
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
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biological Sciences</label>
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
                                                                    <input id="molecularBiology" type="checkbox" checked={checkboxValues.molecularBiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="molecularBiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Molecular Biology</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="zoology" type="checkbox" checked={checkboxValues.zoology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="zoology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zoology</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                                <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('education')}>
                                                    <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Education</label>
                                                        <span className="ml-6">{isEachCategoryOpen.education ? '▼' : '>'}</span>
                                                    </div>
                                                    {isEachCategoryOpen.education && (
                                                        <div className="ms-3">
                                                            <ul>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="adultEducation" type="checkbox" checked={checkboxValues.adultEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="adultEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adult Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="artEducation" type="checkbox" checked={checkboxValues.artEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="artEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Art Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="businessEducation" type="checkbox" checked={checkboxValues.businessEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="businessEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Business Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="curriculumStudies" type="checkbox" checked={checkboxValues.curriculumStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="curriculumStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Curriculum Studies</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="earlyChildhood" type="checkbox" checked={checkboxValues.earlyChildhood} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="earlyChildhood" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Early Childhood Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="guidanceAndCounseling" type="checkbox" checked={checkboxValues.guidanceAndCounseling} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="guidanceAndCounseling" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Guidance and Counseling</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="healthEducation" type="checkbox" checked={checkboxValues.healthEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="healthEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Health Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="homeEconomics" type="checkbox" checked={checkboxValues.homeEconomics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="homeEconomics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home Economics Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="libraryStudies" type="checkbox" checked={checkboxValues.libraryStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="libraryStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Library and Information Science</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="physicalEducation" type="checkbox" checked={checkboxValues.physicalEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="physicalEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="scienceEducation" type="checkbox" checked={checkboxValues.scienceEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="scienceEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Science Education</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="socialStudies" type="checkbox" checked={checkboxValues.socialStudies} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="socialStudies" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Studies</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="specialEducation" type="checkbox" checked={checkboxValues.specialEducation} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="specialEducation" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special Education</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                                <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('physicalSciences')}>
                                                    <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Sciences</label>
                                                        <span className="ml-6">{isEachCategoryOpen.physicalSciences ? '▼' : '>'}</span>
                                                    </div>
                                                    {isEachCategoryOpen.physicalSciences && (
                                                        <div className="ms-3">
                                                            <ul>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="chemistry" type="checkbox" checked={checkboxValues.chemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="chemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chemistry</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="computerScience" type="checkbox" checked={checkboxValues.computerScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="computerScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Computer Science</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="geology" type="checkbox" checked={checkboxValues.geology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="geology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geology</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="industrialChemistry" type="checkbox" checked={checkboxValues.industrialChemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="industrialChemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Industrial Chemistry</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="mathematics" type="checkbox" checked={checkboxValues.mathematics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="mathematics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mathematics</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="physics" type="checkbox" checked={checkboxValues.physics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="physics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physics</label>
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
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Sciences</label>
                                                        <span className="ml-6">{isEachCategoryOpen.socialSciences ? '▼' : '>'}</span>
                                                    </div>
                                                    {isEachCategoryOpen.socialSciences && (
                                                        <div className="ms-3">
                                                            <ul>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="criminology" type="checkbox" checked={checkboxValues.criminology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="criminology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Criminology</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="economics" type="checkbox" checked={checkboxValues.economics} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="economics" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Economics</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="geography" type="checkbox" checked={checkboxValues.geography} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="geography" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geography</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="internationalRelations" type="checkbox" checked={checkboxValues.internationalRelations} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="internationalRelations" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">International Relations</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="law" type="checkbox" checked={checkboxValues.law} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="law" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Law</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="massCommunication" type="checkbox" checked={checkboxValues.massCommunication} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="massCommunication" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mass Communication</label>
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
                                                                    <input id="sociology" type="checkbox" checked={checkboxValues.sociology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="sociology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sociology</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="socialWork" type="checkbox" checked={checkboxValues.socialWork} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="socialWork" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Work</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                                <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('medicalSciences')}>
                                                    <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Sciences</label>
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
                                                                    <input id="biochemistry" type="checkbox" checked={checkboxValues.biochemistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="biochemistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biochemistry</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="physiology" type="checkbox" checked={checkboxValues.physiology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="physiology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physiology</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="pharmacology" type="checkbox" checked={checkboxValues.pharmacology} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="pharmacology" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pharmacology</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="medicalLaboratoryScience" type="checkbox" checked={checkboxValues.medicalLaboratoryScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="medicalLaboratoryScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical Laboratory Science</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="medicineAndSurgery" type="checkbox" checked={checkboxValues.medicineAndSurgery} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="medicineAndSurgery" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medicine and Surgery</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="dentistry" type="checkbox" checked={checkboxValues.dentistry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="dentistry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dentistry</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="nursingScience" type="checkbox" checked={checkboxValues.nursingScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="nursingScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nursing Science</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="physiotherapy" type="checkbox" checked={checkboxValues.physiotherapy} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="physiotherapy" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physiotherapy</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="publicHealth" type="checkbox" checked={checkboxValues.publicHealth} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="publicHealth" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public Health</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                                <li className="flex flex-col mb-4" onClick={() => eachCategoryDropDown('environmentalSciences')}>
                                                    <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Environmental Sciences</label>
                                                        <span className="ml-6">{isEachCategoryOpen.environmentalSciences ? '▼' : '>'}</span>
                                                    </div>
                                                    {isEachCategoryOpen.environmentalSciences && (
                                                        <div className="ms-3">
                                                            <ul>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="environmentalManagement" type="checkbox" checked={checkboxValues.environmentalManagement} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="environmentalManagement" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Environmental Management</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="forestry" type="checkbox" checked={checkboxValues.forestry} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="forestry" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Forestry</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="wildlifeManagement" type="checkbox" checked={checkboxValues.wildlifeManagement} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="wildlifeManagement" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wildlife Management</label>
                                                                </li>
                                                                <li className="flex items-center mb-4">
                                                                    <input id="environmentalScience" type="checkbox" checked={checkboxValues.environmentalScience} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => e.stopPropagation()} />
                                                                    <label htmlFor="environmentalScience" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Environmental Science</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>



                                            </ul>)}
                                    </li>
                                    <li>
                                        <div class="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Access Type</span>
                                        </div>

                                        <div class="flex items-center mb-4">
                                            <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Open-Access</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non Open-Access</label>
                                        </div>

                                    </li>
                                    {/** <li>
                                        <div class="flex items-center  text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group type-sidebar-left">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Language</span>

                                        </div>
                                        <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">French</label>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Espanol</label>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div class="flex items-center ps-3">
                                                    <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laravel</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>*/}




                                </ul>
                            </div>
                        </aside>



                    </div>
                    <div className="thesis-papers ">

                        <section class="  dark dark:bg-gray-900 p-3 sm:p-5">
                            <div ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full dark md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                    </svg>
                                    Filter
                                    <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>

                                {isDropdownOpen && <div id="filterDropdown" class="z-10 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                        Sort by:
                                    </h6>
                                    <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                        <li class="flex items-center">
                                            <input id="apple" type="checkbox" value=""
                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Name: Z to A
                                            </label>
                                        </li>
                                        <li class="flex items-center">
                                            <input id="apple" type="checkbox" value=""
                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Name: A to Z
                                            </label>
                                        </li>
                                        <li class="flex items-center">
                                            <input id="fitbit" type="checkbox" value=""
                                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Created On
                                            </label>
                                        </li>

                                    </ul>
                                </div>}
                            </div>

                            <div className="type-papers flex flex-col">

                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Journal Articles</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>

                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>
                                <div className='each flex'>
                                    <div className="papers-left ">
                                        <h3>Thesis Article</h3>
                                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit-voluptate quibusdam vel vero. </h1>
                                        <text>
                                            <span>Sean Matt</span>{'  '},
                                            <span>Christopher Columbus</span> ,
                                            <span>Reggie Jackson</span>
                                        </text>

                                        <p className="abstract">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Distinctio, possimus sint! Ipsam ex repellat expedita atque laboriosam
                                            animi quod dolores beatae architecto, aliquam ipsa eos neque accusamus
                                            blanditiis ab vitae.
                                        </p>
                                    </div>
                                    <div className="papers-right flex flex-col">
                                        <button>Cite</button>
                                        <button>Save</button>
                                        <button className='download'>Download</button>
                                    </div>
                                </div>



                            </div>
                            <div className="next-button">
                                <a href="">Next {'>'}</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Journals

import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { AdminContext } from '../../Context/AdminContext';
import { GlobalStateContext } from '../../Context/GlobalState';
import './Admin.css';
import AdminFooter from "./AdminFooter";
import AdminHeading from "./AdminHeading";
import AdminNav from "./AdminNav";
import AdminSidebar from './AdminSidebar';
import AdminUploadPopup from "./adminUploadPopup/AdminUploadPopup";
import EditUploadPopup from "./adminUploadPopup/EditUploadPopup";
import OrderCharts from './OrderCharts';



const ITEMS_PER_PAGE = 12
const Admin = () => {

  const location = useLocation()
  const isAdminHomepage = location.pathname === '/admin' || location.pathname === '/admin/';
  const [papers, setPapers] = useState([])
  const [showUpload, setShowUpload] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const approved = true
  const { searchInput } = useContext(AdminContext)
  const { user } = useContext(GlobalStateContext)
  const { showEdit, setShowEdit, selectedPaper, setSelectedPaper, loading } = useContext(AdminContext)


  const getPapers = async () => {
    try {
      const papersResponse = await fetch("https://api.iwemiresearch.org/api/papers/", {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },
      })

      if (!papersResponse.ok) {
        throw new Error('Failed to fetch journals')
      }

      const Papers = await papersResponse.json()
      //console.log(Papers)

      const sortedPapers = Papers.sort(
        (a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded)
      )

      setPapers(sortedPapers)
      const totalItems = Papers.length
      setTotalPage(Math.ceil(totalItems / ITEMS_PER_PAGE))
    } catch (err) {
      console.log(err)
      console.log("Error")
    }



  }

  const publishPaper = async (papername) => {


    try {

      const form = {
        'is_approved': approved
      }

      const Token = localStorage.getItem('accessToken');
      if (!Token) {
        setUser(null);
        setLoggedIn(false);
        return;
      }
      const publish = await fetch(`https://api.iwemiresearch.org/api/papers/paper/${papername}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${Token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)

      })

      if (!publish.ok) {
        console.log(await publish.json())
        toast.error("Failed to publish")
        return;
      }

      toast.success("Book Published")
      getPapers()
    } catch (err) {

    }

  }

  const deletePaper = async (papername) => {
    const deleteRes = await fetch(`https://api.iwemiresearch.org/api/papers/paper/${papername}/`, {
      method: 'DELETE',
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },


    })

    if (!deleteRes.ok) {
      console.log(await deleteRes.json())
      toast.error("Failed to delete")
      return;
    }

    toast.success("Book Deleted")
    getPapers()
  }

  useEffect(() => {
    getPapers()
    console.log(papers)
  }, [])


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPapers = papers.slice(startIndex, endIndex)

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

  const filteredPapers = paginatedPapers.filter(item =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.author.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.type.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.category.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(searchInput.toLowerCase())
  );




  return (
    <div className="mx-auto relative">
      {showUpload && <AdminUploadPopup setShowUpload={setShowUpload} />}
      {showEdit && <EditUploadPopup paper={selectedPaper} setShowEdit={setShowEdit} />}

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col admin-container">
        <div className="nav">
          <AdminNav />
        </div>

        <div className="main flex overflow-x-auto">
          <div className='fixed flex-shrink-0'>
            <AdminSidebar />
          </div>
          <div className='flex-1 ml-[400px]'>
            <AdminHeading setShowUpload={setShowUpload} />
            <hr></hr>
            {isAdminHomepage && <OrderCharts />} {/* Conditionally render OrderCharts */}
            <Outlet />
          </div>
        </div>

        <AdminFooter />
      </div>
    </div>
  );

}

export default Admin;


import { useContext, useEffect, useState } from 'react';
import { CiBookmarkPlus } from "react-icons/ci";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { AdminContext } from '../../Context/AdminContext';
import './Admin.css';
import AdminFooter from "./AdminFooter";
import AdminHeading from "./AdminHeading";
import AdminNav from "./AdminNav";
import AdminUploadPopup from "./adminUploadPopup/AdminUploadPopup";
import EditUploadPopup from "./adminUploadPopup/EditUploadPopup";



const ITEMS_PER_PAGE = 10
const Admin = () => {

  const [papers, setPapers] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const approved = true
  const { searchInput } = useContext(AdminContext)

  const getPapers = async () => {
    try {
      const papersResponse = await fetch("https://localhost:8014/api/papers/", {
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

      setPapers(Papers)
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
      const publish = await fetch(`https://localhost:8014/api/papers/paper/${papername}/`, {
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
    const deleteRes = await fetch(`https://localhost:8014/api/papers/paper/${papername}/`, {
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
  }, [])
  useEffect(() => {
    getPapers()
  }, [papers, currentPage, ITEMS_PER_PAGE,])

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
    <div className="mx-auto  ">
      {showUpload ? <AdminUploadPopup setShowUpload={setShowUpload} /> : <></>}
      {showEdit ? <EditUploadPopup paper={selectedPaper} setShowEdit={setShowEdit} /> : <></>}
      <div className="flex flex-col admin-container">
        <div className="nav">
          <AdminNav />

        </div>

        <div className="main ">
          <AdminHeading setShowUpload={setShowUpload} />
          <div className='px-12 overflow-x-auto flex flex-col justify-between'>
            <table className="mt-6 w-full text-left table-auto whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll ">
              <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-4/12 hidden lg:table-cell" />
                <col className="lg:w-2/12 hidden lg:table-cell" />
                <col className="lg:w-1/12 hidden lg:table-cell" />
                <col className="lg:w-1/12 hidden lg:table-cell" />
                <col className="lg:w-1/12 lg:table-cell" />
                <col className="lg:w-1/12 lg:table-cell" />
                <col className="lg:w-1/12 lg:table-cell" />
              </colgroup>
              <thead className="border-b border-white/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                <tr>
                  <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                    Product
                  </th>
                  <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8 hidden lg:table-cell">
                    Author
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell hidden lg:table-cell">
                    Type
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell hidden lg:table-cell">
                    Category
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell hidden lg:table-cell">
                    SubCategory
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell hidden lg:table-cell">
                    Year Published
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20">
                    Price
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20">
                    Status
                  </th>
                  <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPapers.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={item.cover_page}
                          alt=""
                          className="h-8 w-8 rounded-full bg-gray-800"
                        />
                        <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                          {item.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 table-cell pr-8 hidden lg:table-cell">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                          {item.author}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 table-cell pr-8 hidden lg:table-cell">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                          {item.type}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 table-cell pr-8 hidden lg:table-cell">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                          {item.category}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 table-cell pr-8 hidden lg:table-cell">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                          {item.subcategory}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 table-cell pr-8 hidden lg:table-cell">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                          {item.year_published ? item.year_published : "2000"}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-rose-200 text-rose-600 font-medium table-cell lg:pr-20">
                      {item.price ? item.price : 0}
                    </td>
                    <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-green text-green font-medium table-cell lg:pr-20">
                      {item.is_approved ? "Published" : "Not Published"}
                    </td>
                    <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                      <div className="flex gap-x-1 justify-end">
                        <button
                          onClick={() => {
                            setSelectedPaper(item)
                            setShowEdit(true)

                          }}
                          className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 block flex justify-center items-center cursor-pointer hover:border-gray-400"
                        >
                          <HiOutlinePencil className="text-lg" />
                        </button>
                        <button
                          disabled={item.is_approved}
                          onClick={() => publishPaper(item.name)}
                          className={`dark:bg-blackPrimary ${item.is_approved ? " bg-green-300" : "bg-red-300 hover:border-gray-400 cursor-pointer "} dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 block flex justify-center items-center  `}
                        >
                          <CiBookmarkPlus className="text-lg" />
                        </button>


                        <button
                          onClick={() => deletePaper(item.name)}
                          className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 block flex justify-center items-center cursor-pointer hover:border-gray-400"
                        >
                          <HiOutlineTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>


            </table>
            <div className='flex flex-col items-center justify-center'>
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
            </div>

          </div>

        </div>

        <AdminFooter />
      </div>


    </div>


  );
}

export default Admin;

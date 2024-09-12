import { useContext, useEffect, useState } from 'react';
import { CiBookmarkPlus } from "react-icons/ci";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { AdminContext } from '../../Context/AdminContext';
import { GlobalStateContext } from '../../Context/GlobalState';

const ITEMS_PER_PAGE = 12

const AdminProduct = () => {

    const [papers, setPapers] = useState([])
    const [showUpload, setShowUpload] = useState(false)
        ;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const approved = true
    const { searchInput } = useContext(AdminContext)
    const { user} = useContext(GlobalStateContext)
    const { showEdit, setShowEdit, selectedPaper, setSelectedPaper } = useContext(AdminContext)

    const getPapers = async () => {
        setLoading(true)
        try {
            const papersResponse = await fetch("https://api.iwemiresearch.org/api/papers/", {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                },
            })

            if (!papersResponse.ok) {
                throw new Error('Failed to fetch journals')
                setLoading(false)
            }

            const Papers = await papersResponse.json()
            //console.log(Papers)

            const sortedPapers = Papers.sort(
                (a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded)
            )

            setPapers(sortedPapers)
            const totalItems = Papers.length
            setTotalPage(Math.ceil(totalItems / ITEMS_PER_PAGE))
            setLoading(false)
        } catch (err) {
            console.log(err)
            console.log("Error")
        }

        setLoading(false)

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




    return loading ?
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-content-center border-4 border-gray-400 border-t-orange-800 rounded-full animate-spin">

            </div>
        </div>
        : (
            <div>
                <div className="px-12 overflow-x-auto flex flex-col justify-between">
                    <table className="mt-6 w-full text-left table-auto whitespace-nowrap max-lg:block max-lg:overflow-x-scroll border border-gray-200 rounded-lg shadow-sm">
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
                        <thead className="bg-gray-100 border-b border-gray-300 text-sm leading-6 text-gray-700">
                            <tr>
                                <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                                    Product
                                </th>
                                <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8 hidden lg:table-cell">
                                    Author
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-8 font-semibold hidden lg:table-cell">
                                    Type
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-8 font-semibold hidden lg:table-cell">
                                    Category
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-8 font-semibold hidden lg:table-cell">
                                    SubCategory
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-8 font-semibold hidden lg:table-cell">
                                    Year Published
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-8 font-semibold lg:pr-20">
                                    Price
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-8 font-semibold lg:pr-20">
                                    Status
                                </th>
                                <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-6 lg:pr-8">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPapers.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                        <div className="flex items-center gap-x-4">
                                            <img
                                                src={item.cover_page}
                                                alt=""
                                                className="h-8 w-8 rounded-full bg-gray-200"
                                            />
                                            <div className="truncate text-sm font-medium text-gray-800">
                                                {item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 hidden lg:table-cell">
                                        <div className="flex gap-x-3">
                                            <div className="font-mono text-sm text-gray-600">
                                                {item.author.length > 30 ? `${item.author.slice(0, 30)}...` : item.author}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 hidden lg:table-cell">
                                        <div className="flex gap-x-3">
                                            <div className="font-mono text-sm text-gray-600">{item.type}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 hidden lg:table-cell">
                                        <div className="flex gap-x-3">
                                            <div className="font-mono text-sm text-gray-600">{item.category}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 hidden lg:table-cell">
                                        <div className="flex gap-x-3">
                                            <div className="font-mono text-sm text-gray-600">{item.subcategory}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 hidden lg:table-cell">
                                        <div className="flex gap-x-3">
                                            <div className="font-mono text-sm text-gray-600">
                                                {item.year_published || "2000"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pl-0 pr-8 text-sm font-medium text-rose-600 lg:pr-20">
                                        {item.price || 0}
                                    </td>
                                    <td className="py-4 pl-0 pr-8 text-sm font-medium text-green-600 lg:pr-20">
                                        {item.is_approved ? "Published" : "Not Published"}
                                    </td>
                                    <td className="py-4 pl-0 pr-4 text-right text-sm table-cell sm:pr-6 lg:pr-8">
                                        <div className="flex gap-x-1 justify-end">
                                            <button
                                                onClick={() => {
                                                    setSelectedPaper(item);
                                                    setShowEdit(true);
                                                }}
                                                className="bg-white text-gray-800 border border-gray-300 w-8 h-8 flex justify-center items-center rounded hover:border-gray-400"
                                            >
                                                <HiOutlinePencil className="text-lg" />
                                            </button>

                                            {user.is_publisher && (
                                                <button
                                                    disabled={item.is_approved}
                                                    onClick={() => publishPaper(item.name)}
                                                    className={`${item.is_approved
                                                        ? "bg-green-300 cursor-not-allowed"
                                                        : "bg-red-300 hover:border-gray-400 cursor-pointer"
                                                        } border border-gray-300 w-8 h-8 flex justify-center items-center rounded`}
                                                >
                                                    <CiBookmarkPlus className="text-lg" />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => deletePaper(item.name)}
                                                className="bg-white text-gray-800 border border-gray-300 w-8 h-8 flex justify-center items-center rounded hover:border-gray-400"
                                            >
                                                <HiOutlineTrash className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-7">
                    <span>Page {currentPage} of {totalPage}</span>
                    <div className="next-button flex gap-10">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            {'< Previous'}
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPage}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Next {'>'}
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default AdminProduct;

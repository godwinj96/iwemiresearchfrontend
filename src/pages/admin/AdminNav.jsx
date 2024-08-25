import { useContext } from "react";
import { GlobalStateContext } from "../../Context/GlobalState";
import { SearchBar } from "../../components/SearchBar/components/SearchBar";
import { AdminSearchBar } from "../../components/SearchBar/components/AdminSearchBar";


const AdminNav = () => {

  const {setLoggedIn,setUser} = useContext(GlobalStateContext)

  const handleLogout = async () => {
    //await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('session')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    setLoggedIn(false)
  }

  return (
    <div className="flex justify-between px-3 py-1 bg-black/80 text-white items-center">
      <div>
        <h1 className="font-bold mb-4 text-3xl mt-2">Iwemi Research</h1>
        <p>Admin Page</p>
      </div>
      <div className="search-container text-black flex items-center">
        <div className="mr-3">
          <h3 className="text-white">
            Search
          </h3>
        </div>
        <AdminSearchBar />
      </div>
      <div>
        <button className='px-5 py-3 bg-blue-800 rounded-lg text-white '>

          <a href="" onClick={(e) => {
            e.preventDefault();
            handleLogout()
            setLoggedIn(false)
          }}>
            Log out
          </a>
        </button>
      </div>


      
    </div>
  );
}

export default AdminNav;

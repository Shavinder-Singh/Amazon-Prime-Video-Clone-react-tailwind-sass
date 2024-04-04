import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/image/Logo.png'
import './header.scss'
import Sidebar from './sidebar/sidebar.jsx'
import { Link } from 'react-router-dom'
import '../../components/searchresults/searchscroller.jsx'
import SearchScroller from '../../components/searchresults/searchscroller.jsx'
import Accountsidebar from './accountsidebar/accountsidebar.jsx'


const header = () => {
    const [inputValue, setInputValue] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleinput = async (e) => {
        const { value } = e.target;
        setInputValue(value);
        try {
            const response = await fetch(`https://omdbapi.com/?s=${value}&apikey=eae86d55`);
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
                console.log(data);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlechange = async (imdbID) => {
        try {
            const response = await fetch(`https://omdbapi.com/?i=${imdbID}&apikey=eae86d55`);
            const data = await response.json();
            if (data.Response === 'True') {
                navigate(`/searchresults/${imdbID}`);
            } else {
                // setSelectedMovie(null);
            }
        } catch (error) {
            console.log(error);
        }
        setopenSearch(false);
        setInputValue( )

    }
    // Opening SearchBar
    const [openSearch, setopenSearch] = useState(false);
    const openSearchBar = () => {
        setopenSearch(!openSearch);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openSearch && !event.target.closest('.search_drop_down')) {
                setopenSearch(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        // return () => {
        // document.removeEventListener('click', handleClickOutside);
        // };
    }, [openSearch]);

    //redirect to allmoviespage

    const handleRedirect = async (genre) => {
        try {
            const response = await fetch(`https://omdbapi.com/?s=${genre}&apikey=eae86d55`);
            const data = await response.json();
            const imdb = data.imdbID;
            if (data.Response === 'True') {
                navigate(`/allmovies/${genre}`);

            } else {
                // setSelectedMovie(null);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // open sidebar
    const [sidebar, setsidebar] = useState();
    const opensidebar = () => {
        setsidebar(!sidebar);
    }

    return (
        <div>
            <header className='header_mobile z-10 '>
                <div className='mobile_menu hover:bg-secondary relative '>
                    <h1 className='menu' onClick={() => opensidebar()}>Menu
                        {sidebar && (
                            <Sidebar />

                        )}
                    </h1>
                    <div className='menu_bar_arrow'>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64.000000 64.000000"
                            preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                fill="white" stroke="none">
                                <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className='mobile_logo'>
                    <Link to='/' ><img src={Logo} alt="logo" /></Link>
                </div>
                <div className='mobile_user_options relative'>
                    <div className='search_drop_down'>
                        <div className='search_icon p-3' onClick={() => openSearchBar()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={openSearch ? 'hidden' : 'search_icon_active'} ><path d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" className={openSearch ? 'search_icon_active' : 'hidden'}>    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" /></svg>
                        </div>
                        {openSearch && (
                            <div className='search_bar  bg-secondary absolute top-10 z-10 flex flex-col items-start'>
                                <div className='search_bar_wrapper p-3 rounded-md'>
                                    <span className=' w-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" ><path d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z" /></svg>
                                    </span>
                                    <input type='search' placeholder='Search' value={inputValue} onChange={handleinput} className='bg-inputbgcolor font-bold tracking-wide text-white w-full'></input>
                                </div>
                                <div className='flex flex-col gap-10 mt-[12px] w-full font-bold text-left text-white'>
                                    {movies.length > 0 ? (
                                        movies.map((movie) => (
                                            <div
                                                className='titles_input w-full cursor-pointer p-3 rounded-xl hover:bg-white hover:text-primarycolor' onClick={() => handlechange(movie.imdbID)}
                                                key={movie.imdbID}
                                            >
                                                <p>{movie.Title}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Search Movies</p>
                                    )}
                                    {/* {selectedMovie && <SelectedMovieDetails selectedMovie={selectedMovie} />} */}
                                </div>
                            </div>

                        )}
                        <div className='account_icon p-3'>
                            <svg fill="#191849" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3.19 -3.19 51.91 51.91" xml:space="preserve" stroke="#191849" stroke-width="0.00045531999999999994" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg>
                            <Accountsidebar />
                        </div>
                    </div>
                </div>
            </header >
            {/* For big screen */}
            <header  >
                <div>
                    <div className='logo'>
                        <Link to='/'> <img src={Logo} alt="logo" /></Link>
                    </div>
                    <div className='nav_list_wrapper'>
                        <nav>
                            <ul className='nav_container'>
                                <li className='nav_list_item relative'>Home
                                    <ul className='navitemdrop absolute top-[44px] flex flex-col items-s z-10 bg-secondary rounded-b-md hidden'>
                                        <Link to="/"> <li className='p-2'>All</li></Link>
                                        <Link to="movies"> <li className='p-2'>Movies</li></Link>
                                        <li className='p-2' onClick={() => handleRedirect('tv shows')}>TV shows</li>
                                    </ul>
                                    <div>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64.000000 64.000000"
                                            preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                fill="white" stroke="none">
                                                <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </li>
                                <li className='nav_list_item relative'>Store
                                    <ul className='navitemdrop absolute top-[44px] flex flex-col items-s z-10 bg-secondary rounded-b-md hidden'>
                                        <Link to="/"><li className='p-2'> All</li></Link>
                                        <Link to="rent"><li className='p-2'>Rent</li></Link>
                                        <li className='p-2' onClick={() => handleRedirect('channels')}>Channels</li>
                                    </ul>
                                    <div>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64.000000 64.000000"
                                            preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                fill="white" stroke="none">
                                                <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </li>
                                <li className='nav_list_item'>Live TV
                                </li>
                                <li className='nav_list_item relative'><Link to="/categories">Categories</Link>
                                    <div className='navitemdrop absolute top-[44px] right-[-252px] flex items-start gap-24 z-10 bg-secondary rounded-b-md pt-5 pb-3 px-14 hidden'>
                                        <div className='Genres flex flex-col items-start justify-center gap-4'>
                                            <div className=''>Genres</div>
                                            <div className='text-[15px] flex items-start'>
                                                <ul>
                                                    <li className='p-2' onClick={() => handleRedirect('action')}>Action and adventure</li>
                                                    <li className='p-2' onClick={() => handleRedirect('anime')}>Anime</li>
                                                    <li className='p-2' onClick={() => handleRedirect('comedy')}>Comedy</li>
                                                    <li className='p-2' onClick={() => handleRedirect('documentary')}>Documentary</li>
                                                    <li className='p-2' onClick={() => handleRedirect('drama')}>Drama</li>
                                                    <li className='p-2' onClick={() => handleRedirect('fantasy')}>Fantasy</li>
                                                </ul>
                                                <ul>
                                                    <li className='p-2' onClick={() => handleRedirect('horror')}>Horror</li>
                                                    <li className='p-2' onClick={() => handleRedirect('kids')}>Kids</li>
                                                    <li className='p-2' onClick={() => handleRedirect('mystery')}>Mystery and thrillers</li>
                                                    <li className='p-2' onClick={() => handleRedirect('romance')}>Romance</li>
                                                    <li className='p-2' onClick={() => handleRedirect('science')}>Science fiction</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='featured_collections flex flex-col items-start '>
                                            <div className=''>Fetaured Collections</div>
                                            <div className='text-[15px]'>
                                                <ul>
                                                    <li className='p-2' onClick={() => handleRedirect('Hindi')}>Hindi</li>
                                                    <li className='p-2' onClick={() => handleRedirect('English')}>English</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Telugu')}>Telugu</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Tamil')}>Tamil</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Malayalam')}>Malayalam</li>
                                                </ul>
                                                <ul>
                                                    <li className='p-2' onClick={() => handleRedirect('Kannada')}>Kannada</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Marathi')}>Marathi</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Punjabi')}>Punjabi</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Gujarati')}>Gujarati</li>
                                                    <li className='p-2' onClick={() => handleRedirect('Bengali')}>Bengali</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64.000000 64.000000"
                                            preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                fill="white" stroke="none">
                                                <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='user_options'>
                        <div className='search_icon search_drop_down relative'>
                            <div className=' hover:bg-secondary'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" onClick={() => openSearchBar()} className={openSearch ? 'hidden' : 'search_icon_active'} ><path d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" onClick={() => openSearchBar()} width="30px" height="30px" className={openSearch ? 'search_icon_active' : 'hidden'}>    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" /></svg>
                            </div>
                            {openSearch && (
                                <div className='search_bar bg-secondary absolute top-10 z-10  rounded-md flex flex-col  items-start'>
                                    <div className='search_bar_wrapper'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" ><path d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z" /></svg>
                                        </span>
                                        <input type='search' placeholder='Search' value={inputValue} onChange={handleinput} className='bg-inputbgcolor font-bold tracking-wide text-white w-full'></input>
                                    </div>
                                    <div className='flex flex-col gap-0 mt-[px] w-full font-bold text-left text-white'>
                                        {movies.length > 0 ? (
                                            movies.map((movie) => (
                                                <div
                                                    className='titles_input w-full rounded-xl hover:bg-white hover:text-primarycolor cursor-pointer'
                                                    key={movie.imdbID} onClick={() => handlechange(movie.imdbID)}
                                                >
                                                    <p className='p-3 '>{movie.Title}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='Try_for_free '>
                            <h1 className='p-3 hover:bg-secondary hover:text-white transition duration-500 font-bold'>Try for free</h1>
                        </div>
                        <div className='languages_option '>
                            <h1 className='relative p-1'>EN
                                <div className='navitemdrop absolute top-[33px] right-0 flex justify-start items-start bg-secondary rounded-b-md z-10 py-5 px-10 pr-20 text-nowrap hidden'>
                                    <ul >
                                        <li className='p-2'><a href="#">Bahasa Indonesia</a></li>
                                        <li className='p-2'><a href="#">Bahasa Melayu</a></li>
                                        <li className='p-2'><a href="#">Dansk</a></li>
                                        <li className='p-2'><a href="#">Deutsch</a></li>
                                        <li className='p-2'><a href="#">English</a></li>
                                        <li className='p-2'><a href="#">Espanol</a></li>
                                        <li className='p-2'><a href="#">Francais</a></li>
                                        <li className='p-2'><a href="#">Italiano</a></li>
                                    </ul>
                                    <ul>
                                        <li className='p-2'><a href="#">Magyar</a></li>
                                        <li className='p-2'><a href="#">Nederlands</a></li>
                                        <li className='p-2'><a href="#">Norsk</a></li>
                                        <li className='p-2'><a href="#">Polaski</a></li>
                                        <li className='p-2'><a href="#">Portugues (Brasil) </a></li>
                                        <li className='p-2'><a href="#">Portugues (Portugal)</a></li>
                                        <li className='p-2'><a href="#">Romana</a></li>
                                        <li className='p-2'><a href="#">Suomi</a></li>
                                    </ul>
                                    <ul>
                                        <li className='p-2'><a href="#">Svenska</a></li>
                                        <li className='p-2'><a href="#">Turkce</a></li>
                                        <li className='p-2'><a href="#">Wikang Filipino</a></li>
                                        <li className='p-2'><a href="#">Cestina</a></li>
                                        <li className='p-2'><a href="#">Ελληνικά</a></li>
                                        <li className='p-2'><a href="#">Русский</a></li>
                                        <li className='p-2'><a href="#">עברית</a></li>
                                        <li className='p-2'><a href="#">العربية</a></li>
                                    </ul>
                                    <ul>
                                        <li className='p-2'><a href="#">हिन्दी</a></li>
                                        <li className='p-2'><a href="#">தமிழ்</a></li>
                                        <li className='p-2'><a href="#">తెలుగు</a></li>
                                        <li className='p-2'><a href="#">ไทย</a></li>
                                        <li className='p-2'><a href="#">日本語</a></li>
                                        <li className='p-2'><a href="#">简体中文</a></li>
                                        <li className='p-2'><a href="#">繁體中文</a></li>
                                        <li className='p-2'><a href="#">한국어</a></li>
                                    </ul>
                                </div>
                            </h1>
                            <div className='pl-1'>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 64.000000 64.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                        fill="white" stroke="none">
                                        <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className='account_icon'>
                            <div className='relative p-1'>
                                <svg className='' fill="#191849" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3.19 -3.19 51.91 51.91" xml:space="preserve" stroke="#191849" stroke-width="0.00045531999999999994" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg>
                                <ul className='navitemdrop absolute top-[37px] right-0 flex flex-col z-10 bg-secondary rounded-b-md p-5 pr-9 text-nowrap hidden'>
                                    <li className='p-2'><Link to="/signinpage">Sign In</Link></li>
                                    <li className='p-2'>Help</li>
                                    <li className='p-2'>Watch Anywhere</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </div >
    )
}

export default header


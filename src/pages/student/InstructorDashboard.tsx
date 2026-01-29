import { useNavigate } from "react-router-dom";
import homeBg from "../../images/homeBg.png";
import std1 from "../../images/std1.png";
import std2 from "../../images/std2.png";
import std3 from "../../images/std3.png";
import std4 from "../../images/std4.png";
import std5 from "../../images/std5.png";
import std6 from "../../images/std6.png";
import std7 from "../../images/std7.png";
import std8 from "../../images/std8.png";
import std9 from "../../images/std9.png";
import biology from "../../images/biology.png";
import statistics from "../../images/statistics.png";
import publicSpeaking from "../../images/publicSpeaking.png";
import instructor8 from "../../images/instructor8.jpeg";
import instructor9 from "../../images/instructor9.jpeg";
import instructor14 from "../../images/instructor14.jpeg";

// CSS for keyframes and animation
const style = {
  animation: `slide 20s linear infinite`
};

const InstructorDashboard = () => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/student/sessions');
    };

  return (
    <div className='w-full h-auto overflow-x-hidden'>

            {/*   BG-IMAGE SECTION   */}
            <div className="w-full bg-cover bg-center h-auto" style={{ backgroundImage: `url(${homeBg})` }}>

                {/* header - never remove */} 
                <div className="flex justify-between items-center px-8 mx-16">
                </div>

                {/* body part */}
                <div className='mt-[30vh] flex justify-center items-center flex-col'>
                    <div className='h-auto'>
                        <h1 className="text-6xl md:text-8xl lg:text-8xl font-normal font-serif text-black text-center">
                            An Easier, More Powerful
                            <br className="mt-14" /> 
                            Platform To Grow 
                            <span className="relative inline-block text-black ml-5">
                                <span className="relative z-10">Skills</span>
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform translate-y-2"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform translate-y-3"></span>
                            </span>
                        </h1>
                    </div>

                    <p className='text-black mt-10 text-2xl font-normal'>Learn in-demand skills, gain practical knowledge, and advance your career</p>
                    <p className='text-black text-2xl font-normal'>with a platform built for modern learners.</p>

                    <button 
                        onClick={() => {
                            handleExploreClick(); 
                        }}
                        className="w-40 h-14 mt-28 bg-[#3ee1a6] text-black font-semibold flex items-center justify-center rounded-full shadow-md border border-black relative overflow-hidden group transition duration-700">
                        <span className="relative z-10">Explore</span>
                        <span className="absolute inset-0 bg-[#ff5c4c] transition-all duration-600 group-hover:w-full group-hover:left-0 w-0 left-[-100%] h-full"></span>
                    </button>

                    {/* Iimages with Horizontal Slide Animation */}
                    <div className='mt-28 mb-20 overflow-hidden'>
                        <div className="flex space-x-10" style={style}>
                            {/* First Set of Images */}
                            <img src={std1} alt="Student 1" className="object-cover" />
                            <img src={std2} alt="Student 2" className="object-cover" />
                            <img src={std3} alt="Student 3" className="object-cover" />
                            <img src={std4} alt="Student 4" className="object-cover" />
                            <img src={std5} alt="Student 5" className="object-cover" />
                            <img src={std6} alt="Student 6" className="object-cover" />
                            <img src={std7} alt="Student 7" className="object-cover" />

                            {/* duplicate the Images for Infinite Loop */}
                            <img src={std1} alt="Student 1" className="object-cover" />
                            <img src={std2} alt="Student 2" className="object-cover" />
                            <img src={std3} alt="Student 3" className="object-cover" />
                            <img src={std4} alt="Student 4" className="object-cover" />
                            <img src={std5} alt="Student 5" className="object-cover" />
                            <img src={std6} alt="Student 6" className="object-cover" />
                            <img src={std7} alt="Student 7" className="object-cover" />   
                        </div>
                    </div>
                </div>

            </div>
            {/*   /BG-IMAGE SECTION   */}

            <div className='h-[80vh] w-full mt-32 text-2xl md:text-2xl lg:text-6xl font-serif flex'>
                <p className='text-black ml-32'>
                    Get enrolled in the<br/>
                    courses<br/>
                    made by industry<br/>
                    experts!
                </p>

                {/* Right Arrow Button with Hover Effect for Background Color Change */}
                <button className="mt-40 mr-28 w-20 h-20 border-2 border-black text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#3ee1a6] transition duration-300 ml-auto">
                    <span className="text-2xl">→</span>
                </button>
            </div>

            {/* CARDS */}
            <div className='-mt-60 mb-32 h-auto px-32 flex space-x-14'>
                {/* Card 1 */}
                <div className='relative w-[380px] h-[460px] rounded-2xl border-2 border-black'>
                    <div className='absolute inset-0 bg-black opacity-50 rounded-2xl'></div> {/* Black overlay */}
                    <div className='w-full h-full rounded-2xl' style={{ backgroundImage: `url(${biology})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className='absolute bottom-0 left-0 w-full  bg-opacity-60 py-4 px-7 text-white rounded-b-2xl'>
                        <h3 className='mb-3 text-2xl font-bold font-serif'>The Hidden World of Microbiomes!</h3>
                        <p className='text-lg mb-5'>Discover how tiny organisms shape our health and the world around us!</p>
                        <button className='mt-2 mb-7 py-1 px-4 bg-[#f4c857] text-black rounded-full hover:bg-[#2cc58a] transition duration-300 transform hover:scale-105 active:scale-95'>
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='relative w-[380px] h-[460px] rounded-2xl border-2 border-black'>
                    <div className='absolute inset-0 bg-black opacity-60 rounded-2xl'></div> {/* Black overlay */}
                    <div className='w-full h-full rounded-2xl' style={{ backgroundImage: `url(${statistics})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className='absolute bottom-0 left-0 w-full  bg-opacity-60 py-4 px-7 text-white rounded-b-2xl'>
                        <h3 className='mb-3 text-2xl font-bold font-serif'>Master the Language of Statistics!</h3>
                        <p className='text-lg mb-5'>Turn numbers into insights and make data-driven decisions with ease!</p>
                        <button className='mt-2 mb-7 py-1 px-4 bg-[#ff9e4f] text-black rounded-full hover:bg-[#2cc58a] transition duration-300 transform hover:scale-105 active:scale-95'>
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Card 3 */}
                <div className='relative w-[380px] h-[460px] rounded-2xl border-2 border-black'>
                    <div className='absolute inset-0 bg-black opacity-60 rounded-2xl'></div> {/* Black overlay */}
                    <div className='w-full h-full rounded-2xl' style={{ backgroundImage: `url(${publicSpeaking})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className='absolute bottom-0 left-0 w-full  bg-opacity-60 py-4 px-7 text-white rounded-b-2xl'>
                        <h3 className='mb-3 text-2xl font-bold font-serif'>Speak Your Mind, Shape Your World!</h3>
                        <p className='text-lg mb-5'>Unleash the power of language to connect, inspire, and express yourself like never before!</p>
                        <button className='mt-2 mb-7 py-1 px-4 bg-[#c291fe] text-black rounded-full hover:bg-[#2cc58a] transition-transform duration-300 transform hover:scale-105 active:scale-95'>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* 1st FEATURES */}
            <div className='ml-32 mr-36  shadow h-[90vh]  flex '>
                {/* LEFT SIDE */}
                <div className="h-full w-6/12  pl-14 pt-36">
                    <div className='w-4/12 h-14 py-1 px-4 border border-black bg-[#c291fe] text-black font-semibold rounded-full flex items-center justify-center'>
                        Get Started
                    </div>
                    <h3 className='mt-7 mb-3 text-5xl font-serif text-black'>
                        Make the most of your time for your enhancement!
                    </h3>
                    <p className='mt-10 mr-14 text-lg mb-5 text-black'>Time is your most valuable resource. Invest it in personal growth and self-improvement to unlock your true potential and create the future you desire.</p>
                </div>

                {/* RIGHT SIDE */}
                <div className="h-full w-6/12 bg-gray-100 relative">
                    <div className="mt-44 ml-[85px] h-[445px] w-[450px] bg-orange-400 rounded-full relative border-2 border-black"></div>
                    <img src={std9} alt="Student 7" className="object-cover absolute top-[20px] left-0 right-0 mx-auto z-2" />
                </div>
            </div>

            {/* 2nd FEATURES */}
            <div className="ml-32 mr-36 mb-32 h-[90vh] flex shadow">
                {/* LEFT SIDE */}
                <div className="h-full w-6/12 bg-gray-100 relative">
                    <div className="mt-44 ml-[85px] h-[445px] w-[450px] bg-[#3ee1a6;] rounded-full relative border-2 border-black "></div>
                    <img src={std8} alt="Student 7" className="object-cover absolute top-[20px] left-0 right-0 mx-auto z-2" />
                </div>

                {/* RIGHT SIDE */}
                <div className="h-full w-6/12  pl-14 pt-36">
                    <div className='w-4/12 h-14 py-1 px-4 border border-black bg-orange-400 text-black font-semibold rounded-full flex items-center justify-center'>
                        Our Features
                    </div>
                    <h3 className='mt-7 mb-3 text-5xl font-serif text-black'>
                        You can join anytime from anywhere
                    </h3>
                    <p className='mt-10 mr-14 text-lg mb-5 text-black'>
                        Our platform is designed for your convenience, offering seamless access from any location, at any time. Whether you're at home, in the office, or traveling, you can effortlessly engage with our resources to enhance your personal and professional growth.
                    </p>
                </div>
            </div>

            <div className='ml-32 mr-36  pt-40 pl-14 pb-64 shadow h-auto  bg-[#fbcfb1]'> 
                <div className='w-full flex'>
                    <div>
                        <p className='mb-3 text-6xl font-serif text-black'>
                            Creative peoples 
                        </p>
                        <p className='mt-3 mb-3 text-6xl font-serif text-black'>
                            Make us Skillful
                        </p>
                    </div>
                    {/* RIGHT ARROW */}
                    <button className="mr-16 mt-10 w-20 h-20 border-2 border-black text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#3ee1a6] transition duration-300 ml-auto">
                        <span className="text-2xl">→</span>
                    </button>
                </div>

                {/* BEST MENTORS */}
                <div className="mt-10 flex space-x-6">
                    {/* mentor 1 */}
                    <div className="bg-red-400 w-[365px] h-[460px] rounded-2xl border-2 border-black">
                        <img 
                            src={instructor8} 
                            alt="tutor" 
                            className="w-full h-full rounded-2xl border-2 border-black object-cover transform hover:scale-105 transition-all duration-300" 
                        />
                        <button className="mt-5 py-1 px-4 border border-black text-black rounded-full">
                            Washington
                        </button>
                        <p className="mt-4 text-black text-2xl font-bold">John David</p>
                        <p className="mt-2 text-black text-lg">IT and Technology expert</p>
                    </div>

                    {/* mentor 3 */}
                    <div className="bg-red-400 w-[365px] h-[460px] rounded-2xl border-2 border-black">
                        <img src={instructor14} 
                            alt="tutor" 
                            className="w-full h-full rounded-2xl border-2 border-black object-cover transform hover:scale-105 transition-all duration-300" 
                        />   
                        <button className="mt-5 py-1 px-4 border border-black text-black rounded-full">
                            Australia
                        </button>
                        <p className="mt-4 text-black text-2xl font-bold">Sophia Williams</p>
                        <p className="mt-2 text-black text-lg">Communication Expert</p>
                    </div>

                    {/* mentor 2 */}
                    <div className="bg-red-400 w-[365px] h-[460px] rounded-2xl border-2 border-black">
                        <img src={instructor9} 
                            alt="tutor" 
                            className="w-full h-full rounded-2xl border-2 border-black object-cover transform hover:scale-105 transition-all duration-300" 
                        />   
                        <button className="mt-5 py-1 px-4 border border-black text-black rounded-full">
                            Canada
                        </button>
                        <p className="mt-4 text-black text-2xl font-bold">Alexander Thomas</p>
                        <p className="mt-2 text-black text-lg">Health and Medicine Specialist</p>
                    </div>
                </div>

            </div>

            {/* COMMUNITY GROUPS */}
            <div className='ml-32 mr-36 mb-32 pt-44 pl-14 pb-14 h-auto shadow flex  bg-[#2cc58a]'> 

                {/* LEFT SIDE */}
                <div className="h-full w-6/12 pl-14">
                    <h3 className='mb-3 text-6xl font-serif text-black'>
                        The community
                        welcomes you!
                    </h3>

                    <p className='mt-10 mr-14 text-lg mb-5 text-black'>
                        Be a member of this wonderful , to learn , to share<br />  
                        and to grow. We can do so much together,<br />
                        than being alone!
                    </p>
                    
                    <button className="w-64 h-14 bg-white text-black font-semibold flex items-center justify-center rounded-full shadow-md border border-black relative overflow-hidden group transition duration-700">
                        <span className="relative z-10">Join the Discussion</span>
                        <span className="absolute inset-0 bg-[#ff5c4c] transition-all duration-600 group-hover:w-full group-hover:left-0 w-0 left-[-100%] h-full"></span>
                    </button>
                </div>

                {/* comminity group cards */}
                <div className="mr-12 h-full w-6/12 relative space-y-7 ">
                    <div className="p-2 pl-4 w-full h-44 bg-white rounded-3xl border border-black flex">
                        <img src={statistics} alt="" className="mt-10 w-20 h-20 rounded-full" />
                        <div className="ml-4 mt-0 w-5/12 space-y-2">
                            <p className="mt-3 text-black">@scienceCommunity</p>
                            <p className=" text-black font-serif font-bold">Join us to explore, experiment, and ignite your curiosity in science!</p>
                            <p className="text-gray-500 text-[13px]">200 members</p>
                        </div>
                        <button className='mt-16 ml-20 space-y-7 py-1 px-4 h-10 w-28 text-black font-semibold rounded-full border border-black hover:bg-[#c291fe] transition duration-300 transform hover:scale-105 active:scale-95'>
                            Join now
                        </button>
                    </div>

                    <div className="p-2 pl-4 w-full h-44 bg-white rounded-3xl border border-black flex">
                        <img src={statistics} alt="" className="mt-10 w-20 h-20 rounded-full" />
                        <div className="ml-4 mt-0 w-5/12 space-y-2">
                            <p className="mt-3 text-black">@scienceCommunity</p>
                            <p className=" text-black font-serif font-bold">Join us to explore, experiment, and ignite your curiosity in science!</p>
                            
                            <p className="text-gray-500 text-[13px]">200 members</p>
                        </div>
                        <button className='mt-16 ml-20 space-y-7 py-1 px-4 h-10 w-28 text-black font-semibold rounded-full border border-black hover:bg-[#c291fe] transition duration-300 transform hover:scale-105 active:scale-95'>
                            Join now
                        </button>
                    </div>

                    <div className="p-2 pl-4 w-full h-44 bg-white rounded-3xl border border-black flex">
                        <img src={statistics} alt="" className="mt-10 w-20 h-20 rounded-full" />
                        <div className="ml-4 mt-0 w-5/12 space-y-2">
                            <p className="mt-3 text-black">@scienceCommunity</p>
                            <p className=" text-black font-serif font-bold">Join us to explore, experiment, and ignite your curiosity in science!</p>
                            <p className="text-gray-500 text-[13px]">200 members</p>
                        </div>
                        <button className='mt-16 ml-20 space-y-7 py-1 px-4 h-10 w-28 text-black font-semibold rounded-full border border-black hover:bg-[#c291fe] transition duration-300 transform hover:scale-105 active:scale-95'>
                            Join now
                        </button>
                    </div>

                    <button className="ml-52 h-12 py-2 px-4 relative flex items-center rounded-full hover:border border-black">
                        <span className="mt-4 w-20 h-10 font-bold jumping text-white">See More</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 jumping stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {/* /comminity group cards */}
            </div>



            {/* CSS for animation */}
            <style>{`
                @keyframes slide {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                @keyframes jump {
                0%, 100% {
                transform: translateY(0);
                }
                50% {
                transform: translateY(-8px);
                }
            }

            .jumping {
                animation: jump 1s ease-in-out infinite;
            }
            `}</style>
        </div>
  )
}

export default InstructorDashboard

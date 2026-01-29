// // testing from another one
// // delete later

// import developerImage from "../../images/photo-hadi.jpg";
// import { IconParkOutlineHandleRound, IconParkOutlineLeft, MingcuteDownLine } from '../../icons/NavbarIcons';
// import { Link, useLocation } from 'react-router-dom';

// const AdminNavbar = () => {
//     const location = useLocation();

//     // Get the base of the current pathname to determine which section is active
//     const path = location.pathname.startsWith('/admin');

//     // Dynamically set the active navbar item based on the current URL
//     let activateItem = '';
//     if (location.pathname.includes('dashboard')) {
//         activateItem = 'dashboard';
//     } else if (location.pathname.includes('user-management')) {
//         activateItem = 'userManagement';
//     } else if (location.pathname.includes('community-management')) {
//         activateItem = 'communityManagement';
//     } else if (location.pathname.includes('reporting-analytics')) {
//         activateItem = 'reportingAnalytics';
//     } else if (location.pathname.includes('ai-management')) {
//         activateItem = 'aiManagement';
//     } else if (location.pathname.includes('account-management')) {
//         activateItem = 'accountTypeManagement';
//     } else if (location.pathname.includes('notification-management')) {
//         activateItem = 'notificationManagement';
//     } else if (location.pathname.includes('create-notification')) {
//         activateItem = 'notificationManagement';
//     } else if (location.pathname.includes('update-notification')) {
//         activateItem = 'notificationManagement';
//     } else if (location.pathname.includes('ai-management')) {
//         activateItem = 'aiManagement';
//     }
   


//     return (
//         <div className="">
//             <div className='bg-[#30305B] w-80 h-[1200px]'>
//                 <div className="space-y-11 pt-2">

//                     <div className='flex items-center ml-12'>
//                         <li className="flex items-center">
//                             <div className='w-12 h-12 flex items-center justify-center rounded-md bg-transparent overflow-hidden'>
//                                 <img src={developerImage} alt="My Local" className="w-full h-full object-cover" />
//                             </div>
//                         </li>
//                         <div className='ml-6'>
//                             <p className='font-sans text-white text-lg font-normal'>Hadi Risha</p>
//                             <p className='font-sans text-gray-300 text-sm font-normal'>Web Developer</p>
//                         </div>
//                     </div>

//                     <div className='space-y-0.5'>



//                         <div>
//                             {
//                                 activateItem === 'dashboard' ? (
//                                     <>
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>Dashboard</p>
//                                                 <div className='pl-28'><MingcuteDownLine /></div>
//                                             </li>
//                                         </div>

//                                         <div className='flex items-center w-5/6 h-12 px-8 bg-gray-800 ml-auto'>
//                                             <p className='text-gray-500'>Dashboard</p>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <>
                                    

//                                         <Link to="/admin/dashboard">
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue cursor-pointer'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>Dashboard</p>
//                                                 <div className='pl-28'><IconParkOutlineLeft /></div>
//                                             </li>
//                                         </div>
//                                         </Link>
//                                     </>
//                                 )
//                             }
//                         </div>



//                         <div>
//                             {
//                                 activateItem === 'userManagement' ? (
//                                     <>
//                                     <div>
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>User Management</p>
//                                                 <div className='pl-14'><MingcuteDownLine /></div>
//                                             </li>
//                                         </div>

//                                         <div className='flex items-center w-5/6 h-12 px-8 bg-gray-800 ml-auto'>
//                                             <p className='text-gray-500'>Users</p>
//                                         </div>
//                                     </div> 
//                                     </>
//                                 ) : (
//                                     <>
//                                     <div>
//                                         <Link to="/admin/user-management">
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue cursor-pointer'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>User Management</p>
//                                                 <div className='pl-14'><IconParkOutlineLeft /></div>
//                                             </li>
//                                         </div>
//                                         </Link>
//                                     </div>
//                                     </>
//                                 )
//                             }
//                         </div>
                        


//                         <div>
//                             {
//                                 activateItem == 'communityManagement' ? (
//                                     <>
//                                     <div>
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound className='w-7' />
//                                                 <p className='font-sans text-white text-md font-normal'>Community & group Management</p>
//                                                 <div className='pl-0'><MingcuteDownLine /></div>
//                                             </li>
//                                         </div>

//                                         <div className='flex items-center w-5/6 h-12 px-8 bg-gray-800 ml-auto'>
//                                             <p className='text-gray-500'>Community & group Management</p>
//                                         </div>
//                                     </div>  
//                                     </>
//                                 ) : (
//                                     <>  
//                                     <div>
//                                         <Link to="/admin/community-management">
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue cursor-pointer'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound className='w-7' />
//                                                 <p className='font-sans text-white text-md font-normal'>Community & group Management</p>
//                                                 <div className='pl-0'><IconParkOutlineLeft /></div>
//                                             </li>
//                                         </div>
//                                         </Link>
//                                     </div> 
//                                     </>
//                                 )
//                             }
//                         </div>





//                         <div>
//                             {
//                                 activateItem == 'aiManagement' ? (
//                                     <>
//                                     <div>
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>AI management</p>
//                                                 <div className='pl-16'><MingcuteDownLine /></div>
//                                             </li>
//                                         </div>

//                                         <div className='flex items-center w-5/6 h-12 px-8 bg-gray-800 ml-auto'>
//                                             <p className='text-gray-500'>AI management</p>
//                                         </div>
//                                     </div>  
//                                     </>
//                                 ) : (
//                                     <> 
//                                     <div>
//                                         <Link to="/admin/ai-management">
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue cursor-pointer'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound/>
//                                                 <p className='font-sans text-white text-md font-normal'>AI management</p>
//                                                 <div className='pl-16'><IconParkOutlineLeft className='ml-2' /></div>
//                                             </li>
//                                         </div>
//                                         </Link>
//                                     </div> 
//                                     </>
//                                 )
//                             }
//                         </div>



//                         <div>
//                             {
//                                 activateItem == 'accountTypeManagement' ? (
//                                     <>
//                                     <div>
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>Account type Management</p>
//                                                 <div className='pl-0'><MingcuteDownLine /></div>
//                                             </li>
//                                         </div>

//                                         <div className='flex items-center w-5/6 h-12 px-8 bg-gray-800 ml-auto'>
//                                             <p className='text-gray-500'>Account type Management</p>
//                                         </div>
//                                     </div>  
//                                     </>
//                                 ) : (
//                                     <> 
//                                     <div>
//                                         <Link to="/admin/account-management">
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue cursor-pointer'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound className='w-7' />
//                                                 <p className='font-sans text-white text-md font-normal'>Account type Management</p>
//                                                 <div className='pl-14'><IconParkOutlineLeft /></div>
//                                             </li>
//                                         </div>
//                                         </Link>
//                                     </div> 
//                                     </>
//                                 )
//                             }
//                         </div>



//                         <div>
//                             {
//                                 activateItem == 'notificationManagement' ? (
//                                     <>
//                                     <div>
//                                         <div className='flex items-center w-full h-14 px-8 bg-turquoise-blue'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound />
//                                                 <p className='font-sans text-white text-md font-normal'>Notification Management</p>
//                                                 <div className='pl-0'><MingcuteDownLine /></div>
//                                             </li>
//                                         </div>

//                                         <div className='flex items-center w-5/6 h-12 px-8 bg-gray-800 ml-auto'>
//                                             <p className='text-gray-500'>Notification Management</p>
//                                         </div>
//                                     </div>  
//                                     </>
//                                 ) : (
//                                     <> 
//                                     <div>
//                                         <Link to="/admin/notification-management">
//                                         <div className='flex items-center w-full h-14 px-7 bg-turquoise-blue cursor-pointer'>
//                                             <li className="flex items-center w-full space-x-3">
//                                                 <IconParkOutlineHandleRound className='w-7' />
//                                                 <p className='font-sans text-white text-md font-normal'>Notification Management</p>
//                                                 <div className='pl-0'><IconParkOutlineLeft /></div>
//                                             </li>
//                                         </div>
//                                         </Link>
//                                     </div> 
//                                     </>
//                                 )
//                             }
//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
//   }
  
//   export default AdminNavbar;
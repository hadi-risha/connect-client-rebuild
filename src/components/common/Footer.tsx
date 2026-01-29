import { FeTwitter, FlowbiteLinkedinSolid, GrommetIconsFacebookOption } from "../../icons/Footer.icons";

const Footer = () => {
    return (

        <div className='ml-20 mr-36 mb-10 pt-10 pl-14 pb-20 h-auto flex space-x-52'> 
            <div className="w-3/12">
                <p className='text-black font-mono font-bold text-4xl'>C<span className='text-orange-600'>o</span>nnect</p>
                <p className="mt-6  text-black">Build your network, share skills, and open up on the Learning platform where you can be your whole self Forward Arrow</p>
            </div>
            
            <div className="space-x-32 flex">
                <div className="space-y-5">
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        About
                    </p>
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Team & Career
                    </p>
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Solutions
                    </p>
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Contact
                    </p>
                </div>

                <div className="space-y-5">
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Health & Fitness
                    </p>
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Business Coach
                    </p>
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Leadership
                    </p>
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        Programming
                    </p>
                </div>

                <div className="space-y-5 text-right"> 
                    <p className="text-black text-lg font-semibold hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        +91 8456785434
                    </p>
                    <p className="pb-8 text-black text-lg font-semibold underline hover:text-orange-600 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                        contact@connect.com
                    </p>

                    {/* icons */}
                    <div className="flex gap-4 justify-end">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-200 transition-all duration-200">
                                <GrommetIconsFacebookOption />
                            </div>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-200 transition-all duration-200">
                                <FeTwitter />
                            </div>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-200 transition-all duration-200">
                                <FlowbiteLinkedinSolid />
                            </div>
                        </a>
                    </div>
                    {/* /icons */}
                </div>
            </div>
        </div>
                
    );
};

export default Footer;

import gamepad from '../../assets/gamepad.svg';

function Footer() {
  return (   
    <footer className="bg-[#2b2b31ff] text-neutral-50">        
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

            <div className="md:flex md:justify-between">
        {/**************************ICON***************************************** */}
            <div className="flex flex-col items-center justify-center">
                <a href="#" className="mb-4">
                    <img src={gamepad} className="h-30 me-3" alt="Gamepad Logo" />
                </a> 
                <p>MH Finder</p>               
            </div>
        {/**************************information***************************************** */}
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">              
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Contact</h2>
                    <ul className="text-body font-medium">
                        <li>
                            <a href="https://github.com/Anannash" className="hover:underline ">Github</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/andreamoralesch/" className="hover:underline">Linkedin</a>
                        </li>
                        <li>
                            <a href="mailto:andrea2003.morales24@gmail.com" className="hover:underline">E-Mail</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
                    <ul className="text-body font-medium">
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            <hr className="my-6 border-default sm:mx-auto lg:my-2" />
            <span className="text-sm text-center">© 2026 <a href="#" className="hover:underline ml-1">
                Monster High Finder</a>. Personal Project. All Rights Reserved.
            </span>
        </div>
    </footer>  

    
  );
}
export default Footer;


import gamepad from '../../assets/gamepad.svg';

function Footer() {
  return (   
    <footer class="bg-[#2b2b31ff] text-neutral-50">        
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

            <div class="md:flex md:justify-between">
        {/**************************ICON***************************************** */}
            <div class="flex flex-col items-center justify-center">
                <a href="#" class="mb-4">
                    <img src={gamepad} class="h-30 me-3" alt="Gamepad Logo" />
                </a> 
                <p>MH Finder</p>               
            </div>
        {/**************************information***************************************** */}
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">              
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-heading uppercase">Contact</h2>
                    <ul class="text-body font-medium">
                        <li>
                            <a href="https://github.com/Anannash" class="hover:underline ">Github</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/andreamoralesch/" class="hover:underline">Linkedin</a>
                        </li>
                        <li>
                            <a href="mailto:andrea2003.morales24@gmail.com" class="hover:underline">E-Mail</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
                    <ul class="text-body font-medium">
                        <li class="mb-4">
                            <a href="#" class="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            <hr class="my-6 border-default sm:mx-auto lg:my-2" />
            <span class="text-sm text-center">© 2026 <a href="#" class="hover:underline ml-1">
                Monster High Finder</a>. Personal Project. All Rights Reserved.
            </span>
        </div>
    </footer>  

    
  );
}
export default Footer;


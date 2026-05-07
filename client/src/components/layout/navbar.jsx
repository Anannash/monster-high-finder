import gamepad from '../../assets/gamepad.svg';
export default function Navbar() {
  return (
    <nav class="bg-[#2b2b31ff] text-neutral-50 flex justify-between align-center p-2">
      <div className="flex align-center gap-1" >
        <a href="#" class="text-2xl">
                            <img src={gamepad} class="h-10 me-3" alt="Gamepad Logo" />
                        </a> 
        <span className='font-bold text-xl'>Monster High Finder</span>
      </div>
      
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
                <a href="#" class="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">About </a>            
            </li>
        </ul>
    </nav>
  );
}

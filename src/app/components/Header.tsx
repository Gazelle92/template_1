import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  { label: "COMPANY", href: "#company" },
  { label: "SERVICES", href: "#services" },
  { label: "NEWSROOM", href: "#newsroom" },
];
export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-black mix-blend-mode-difference">
      <Link href="/" className="flex flex-col w-[183px] h-14 items-start gap-2.5 px-4 py-3.5 relative bg-[#ffffff1a] rounded-xl">
        <div className="relative w-[149.76px] h-7" >
          <Image src="/logo.svg" alt="Logo" width={149.76} height={28} className="w-full h-full object-contain" />
          </div>
      </Link>

      <nav
        className="relative h-[56px] pr-[6px] pl-[36px] text-[15px] tracking-[0] leading-[21.0px] bg-[#ffffff1a] rounded-xl absolute flex items-center gap-10"
        role="navigation"
        aria-label="Main navigation"
      >

        <ul className="flex items-center gap-10 rounded-[8px]">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="relative w-fit mt-[-1.00px] [font-family:'Barlow-Medium',Helvetica] font-medium text-white  whitespace-nowrap no-underline hover:opacity-80 transition-opacity "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="[font-family: 'Pretendard'] leading-[1] font-medium text-black whitespace-nowrap flex items-center justify-center no-underline bg-[#f60952] px-[22px] py-[12px] rounded-[8px] text-bold"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  { label: "COMPANY", href: "#company" },
  { label: "SERVICES", href: "#services" },
  { label: "NEWSROOM", href: "#newsroom" },
];
export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-black">
      <Link href="/" className="flex flex-col w-[183px] h-14 items-start gap-2.5 px-4 py-3.5 relative bg-[#ffffff1a] rounded-xl">
        <div className="relative w-[149.76px] h-7" >
          <Image src="/logo.svg" alt="Logo" width={149.76} height={28} className="w-full h-full object-contain" />
          </div>
      </Link>

      <nav
        className="relative w-[489px] h-14 bg-[#ffffff1a] rounded-xl backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="absolute w-[24.54%] h-[78.57%] top-[10.71%] left-[74.23%] bg-variable-collection-accent rounded-lg"
          aria-hidden="true"
        />

        <ul className="inline-flex items-center gap-10 absolute w-[59.92%] h-[37.50%] top-[32.14%] left-[7.36%] list-none m-0 p-0">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="relative w-fit mt-[-1.00px] [font-family:'Barlow-Medium',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[21.0px] whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="absolute w-[14.31%] h-[37.50%] top-[32.14%] left-[79.96%] [font-family:'Pretendard_Variable-Medium',Helvetica] font-medium text-black text-[15px] tracking-[0] leading-[21.0px] whitespace-nowrap flex items-center justify-center no-underline hover:opacity-80 transition-opacity"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}

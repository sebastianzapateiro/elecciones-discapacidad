import Image from "next/image";
import logo from "../../public/img/logo-alcaldia.svg";

export function Logos({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center rounded-r-full bg-white/95 py-2 pl-4 pr-8 shadow-md ${className}`}>
      <Image
        src={logo}
        alt="Alcaldía de Cartagena de Indias · Salvemos Juntos a Cartagena"
        className="h-12 w-auto sm:h-14"
        priority
      />
    </div>
  );
}

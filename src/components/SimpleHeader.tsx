import Link from "next/link";
import Image from "next/image";

export default function SimpleHeader() {
    return (
        <header className="bg-gradient-to-r from-[#FFD310] to-[#FF5900] text-primary-foreground py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-center items-center">
                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <Image
                        src="/images/logo.svg"
                        alt="Exhausted Rocket"
                        width={105}
                        height={48}
                        className="h-12 w-auto"
                        priority
                    />
                </Link>
            </div>
        </header>
    );
}

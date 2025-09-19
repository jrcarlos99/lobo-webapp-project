import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageContent() {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen w-full">
        <Image
          alt="bg-image"
          src="/FrontPage.svg"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-start p-8 m-10 md:p-16">
        <Button
          asChild
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 w-48 h-14 rounded-lg transition-colors"
        >
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}

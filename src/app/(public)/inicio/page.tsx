import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageContent() {
  return (
    <div className="relative min-h-0 w-full flex flex-col">
      <div
        className="relative w-full"
        style={{ minHeight: "calc(100vh - 69px)" }}
      >
        <Image
          alt="bg-image"
          src="/FrontPage.svg"
          fill
          priority
          className="object-cover object-right"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-start p-8 md:p-16 pointer-events-none">
        <div className="pointer-events-auto">
          <Button
            asChild
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 w-48 h-14 rounded-lg transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

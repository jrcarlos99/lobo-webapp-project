import { LoginForm } from "@/components/AppLoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Imagem */}
      <div className="bg-muted relative hidden lg:block">
        <Image
          layout="fill"
          src="/frontImg.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Formulário de Login */}
      <div className="flex flex-col gap-4 p-6 md:p-10 justify-center ">
        <div className="flex justify-end gap-2 md:justify-end ">
          <a href="#" className="flex items-center gap-2 font-medium">
            L.O.B.O
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full  h-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

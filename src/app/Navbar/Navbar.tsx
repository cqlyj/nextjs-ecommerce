import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/card";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/authOptions";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

const Navbar = async () => {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src={logo}
              height={40}
              width={40}
              alt="Flowmazon logo"
            ></Image>
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart}></ShoppingCartButton>
          <UserMenuButton session={session}></UserMenuButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/authOptions";

export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className=" mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          className=" input input-bordered mb-3 w-full"
          required
          name="name"
          placeholder="name"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          className=" input input-bordered mb-3 w-full"
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
        />
        <input
          className=" input input-bordered mb-3 w-full"
          required
          name="price"
          placeholder="price"
          type="number"
        />
        <FormSubmitButton type="submit" className="  btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default page;

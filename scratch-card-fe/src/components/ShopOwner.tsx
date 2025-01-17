import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TOnsubmitData = {
  fresh?: boolean;
  used?: boolean;
  mobileNumber: string;
};

function ShopOwner() {
  const [loading, isLoading] = useState<boolean>(false);
  const formSchema = z.object({
    fresh: z.boolean().optional(),
    used: z.boolean().optional(),
    mobileNumber: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .max(10, "Mobile number must be exactly 10 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOnsubmitData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: TOnsubmitData) => {
    // isLoading(true)
    console.log(data);
    const message = `Here is your Scratch card link :${
      import.meta.env.VITE_APP_URL
    } `;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/send-whatsapp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNumber: data.mobileNumber,
            message,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // perform success
      } else {
        // perform failed
      }
    } catch (error) {
      console.error("Error sending whatsapp message:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/bg-new.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* Logo Section */}
      <div className="text-center mb-2 flex flex-col  justify-center items-center">
        <img src="./logo.jpg" className="w-44" alt="logo" />
      </div>

      {/* Scratch Card Section */}
      <div className="text-center mb-6">
        <img src="./scratch-card.jpg" className="w-60 rounded-full " alt="" />
      </div>

      {/* form section */}

      <form
        className="flex justify-center flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Select Mobile Section */}
        <div className="flex justify-center items-center gap-x-2">
          <div className="mb-5 rounded-full flex justify-center items-center border border-[#d2ae60] p-1">
            <button className="bg-[#d2ae60] rounded-full text-md w-32 h-32 flex justify-center items-center  text-black font-semibold ">
              <span>Select Mobile</span>
            </button>
          </div>

          <div className="border rounded-full flex justify-center items-center  border-[#d2ae60]">
            <div className=" flex-col rounded-full w-24 h-24 flex justify-center items-start ps-4 bg-[#d2ae60] m-1">
              <label className="flex   space-x-2">
                <input
                  {...register("fresh")}
                  type="checkbox"
                  className="form-checkbox text-yellow-500"
                />
                <span className="text-md text-black font-medium ">Fresh</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  {...register("used")}
                  type="checkbox"
                  className="form-checkbox text-yellow-500"
                />
                <span className="text-md text-black font-medium">Used</span>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Number Input Section */}
        <div className=" border rounded-full p-1 mb-6  border-[#d2ae60]  ">
          <input
            type="text"
            {...register("mobileNumber")}
            placeholder="Enter Your Mobile Number"
            className="bg-[#d2ae60] placeholder:text-black  text-center text-black text-xl font-semibold py-3 px-2 rounded-full focus:outline-none"
          />
        </div>

        {errors.mobileNumber && (
          <div className="my-4">
            <p className="text-red-500 text-sm text-center">
              {errors?.mobileNumber?.message}
            </p>
          </div>
        )}

        {/* Send Link Button */}
        <div className="border rounded-full p-1 border-[#d2ae60]">
          <button
            type="submit"
            className="bg-[#d2ae60] text-black text-xl font-semibold py-3 px-12 rounded-full"
          >
            {loading ? "Sending..." : " Send Link"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShopOwner;

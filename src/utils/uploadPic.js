import dotenv from "dotenv";

dotenv.config();

const uploadPic = async (file, fullName) => {
  try {
    if (!file) {
      return {
        url: `https://api.dicebear.com/9.x/avataaars/svg/seed=${fullName}`,
        deleteUrl: "",
      };
    }

    const formData = new FormData();

    // Check if file is Base64 string (starts with 'data:')
    if (typeof file === "string" && file.startsWith("data:")) {
      // Extract just the Base64 part (remove "data:image/...;base64," prefix)
      const base64Data = file.split(",")[1];
      formData.append("image", base64Data);
    } else {
      // Regular file object
      formData.append("image", file);
    }

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMAGEBB_API}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const resErr = await res.json();
      return {
        url: `https://api.dicebear.com/9.x/avataaars/svg/seed=${fullName}`,
        deleteUrl: "",
      };
    }

    const data = await res.json();
    return {
      url: data?.data?.url,
      deleteUrl: data?.data?.delete_url,
    };
  } catch (error) {
    throw error || "Upload failed";
  }
};

export default uploadPic;

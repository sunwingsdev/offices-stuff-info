export const imageUpload = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

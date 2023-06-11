import apiRequest from ".";

export const UploadImage = async (payload) => {
  return apiRequest({
    method: "post",
    endpoint: "/api/images/upload-image",
    payload,
  });
};

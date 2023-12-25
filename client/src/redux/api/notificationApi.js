import axiosInstance from "./axiosInstance";

/* add new notification*/
export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post("notification/notify", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/* get all notifications by user*/
export const FetchAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      "notification/fetchAllNotifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/* delete a existing notification  by id*/
export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `notification/deleteNotification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/* read/seen/visited all notifications by user */
export const SeenAllNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      "notification/seenAllNotifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

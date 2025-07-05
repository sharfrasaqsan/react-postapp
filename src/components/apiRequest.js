const apiRequest = async (url = "", objMethod = null, errMsg = null) => {
  try {
    const response = await fetch(url, objMethod);
    if (!response.ok) throw Error("Please reload the App");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return;
  }
};

export default apiRequest;

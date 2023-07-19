export default async function getAuth() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(
      "https://house-hunter-server-tawny.vercel.app/api/v1/auth/getAuth",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.data.user;
    } else {
      console.error("Request failed");
    }
  } catch (error) {
    console.error("Error during request:", error);
  }
}

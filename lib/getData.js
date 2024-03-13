export const getData = async (url) => {
  try {
    const response = await fetch(url, {
      next: { revalidate: 100 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

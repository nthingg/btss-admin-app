// export default async function getDuration(latF, lgnF, latS, lngS, TOKEN) {
//   var response = await fetch(
//     `https://rsapi.goong.io/Direction?origin=${latF},${lgnF}&destination=${latS},${lngS}&vehicle=car&api_key=${TOKEN}`
//   )
//     .then(async (res) => {
//       var resData = await res.json();
//       console.log(resData);
//       return resData.routes.legs;
//     })
//     .catch((err) => console.error(err));

//   console.log(
//     `https://rsapi.goong.io/Direction?origin=${latF},${lgnF}&destination=${latS},${lngS}&vehicle=car&api_key=${TOKEN}`
//   );
//   return response;
// }

export const getDuration = async (latF, lgnF, latS, lngS, TOKEN) => {
  try {
    const response = await fetch(
      `https://rsapi.goong.io/Direction?origin=${latF},${lgnF}&destination=${latS},${lngS}&vehicle=bike&api_key=${TOKEN}`
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error adding post:", err);
  }
};

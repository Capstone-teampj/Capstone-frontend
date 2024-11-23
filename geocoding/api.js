import axios from "axios";

const url = "https://maps.googleapis.com/maps/api/geocode/json?";

export async function getLatLng(address) {
  //   console.log(process.env.EXPO_PUBLIC_Google_Map_API);
  console.log(address);
  try {
    const response = await axios.get(
      url +
        `address=${address}&language=ko&key=${process.env.EXPO_PUBLIC_Google_Map_API}`
    );
    return response.data.results;
  } catch (e) {
    console.error("주소를 찾는데 오류가 발생하였습니다");
  }
}

// response에서 result 배열로 전달
// 필요한 값 formatted_address, geometry.location

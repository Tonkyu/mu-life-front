const CurrentLocation = async (center) => {
  const lat = center.lat;
  const lon = center.lng;
  const GEOCODING_URL = 'https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress';
  var loc = "Loading";

  const parameter = {
    method: 'GET'
  };
  var url = new URL(GEOCODING_URL);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lon", lon);

  await fetch(url.href, parameter)
  .then(response => response.json())
  .then(data => data.results)
  .then(res => {
    loc = res.lv01Nm;
    console.log(loc)
  });

  console.log("loc : " + loc);
  return loc;
}

export default CurrentLocation
import axios from "axios";

export default async function getData(keyword) {
  let response;
  try{
    response = await axios.get(
      "/api/pinterest/resource/SearchResource/get/",
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-Pinterest-AppState": "active",
        },
        params: {
          rs: "typed",
          source_url: "/search/pins/?q=" + encodeURIComponent(keyword),
          data: JSON.stringify({
            options: {
              bookmarks: [
                "Y2JVSG81V2sxcmNHRlpWM1J5VFVad1YxWlVSbGhXTVZwSlZGWlZNVlV3TVZkalJFSlhUVzVTVkZWWGN6RldNa3BKVW14S1YxSnNjR2hYVm1ONFpXc3hWMVZ1U2xaaE0wSnpWVzAxUTJWR1pIRlVibVJXVW10d1NGa3dhRWRXVjBWNFUyeFNXbFpGV2pOV01GcExWMWRPUms5V1pGTmhNMEl5Vm1wSmQyVkdUblJXYkdScVVsWmFWMWxzYUVOaFJteFlaRVphYkdKSFVucFhhMXAzVkRGS2RHVkVRbGRXZWtJMFZrZDRXbVF4V2xWUmJGWnBWa1ZhV1ZkV1ZtRmtNVTVIVm14c1lWSlViRlJWYWtwUFRrWmFTR1ZHVGxWTmEzQlhWREZhVjFWc1pFaFVWR3hRWWtaYVNsbHVjRk5pUmtsNFkwVmFWazFxUm5wV1IzaEtaVVprZFZGc1ZtbFNNVXBOVjFaV1ZrMVdaRWRVYmxKT1ZqQmFXRlZ0ZEhkTlJscEZVbXhPYW1GNlZsZFVNVlpYVmtaa1NWRnNSbGRoTVhCSFZGWmFVMVpzY0VkVGJYaFRWa1phU2xaVVNYZGxSbEp6VjJ0YVYyRnNXbGxaYTFwTFVURndXR042VmxSU2EzQXdXVlZWTVdKSFJYZGpTR2hYVFc1U1ZGVnFTa2RXTWs1SFZteGFWMUpyY0ZKV1YzUnJWVEpPYzFWdVVtcFNWWEJ6V1Zod1IyVkdWbk5WYTA1WVlYcEdlVlJWVWtkV1YwWnlZMFpDV21KR1ZqUmFSVnBoVmxVeFJVMVVhR0ZoYTJ0M1ZGVmtVbVZHY0VoU2JURk9aVzF6ZDFkWE1WWk5SVFZGV2tkNFlXRnNSVEZVVmxKYVpWWndWV0pIYUdGaVZtdDRWMnhTYjJGc2NIRmhSM1JhWld4V00xUlZVbk5pUlRWeFZGUk9ZVlpHUlhsVU1HUkxZV3N4TmxGVVFrNVNSVlV3Vkd0U1QySkZNWEZYYldoYVZWUXdPV1pIVW1wWmVrbDZUVlJWTkU0eVVtMVpiVkUwVGpKWmVFOVVXbWhPYlVsNlRucGpNRTFIU1RKTlZFRTBXWHBDYUU5VVFYaFphbFV4V1hwV2JGa3lSbXROUjBsNlQxUmplRTVFVG14T2VrSnBUV3BhYkZwWFVUMD06VUhvNVQySXlOV3htUkU1clQxUk5NRnBVUVRKUFJHczFUVEpSZUU0eVZUVmFSRVV6VDBkT2JGbFVTVFJaVjFwdFRsUm5OVTU2U1hoYWFscG9UbnBzYkU1RVFYaGFWRUY1V2tkWk1rNHlSVFJOZW1ocVdWUmFhMDlYVVhoYVJGazl8ZmQyYWVhMzUwMjEyNzUzMTVhZTdmNDIxNzJkZjU0NDk0N2IxNjZmNTViOTkxOTQ0N2FjYTczZmE3OGJlMjliZg=="
              ],
              filters: "",
              query: keyword,
              scope: "pins"
            },
            context: {}
          })
        }
      }
    );
  }catch(e){
    console.log("Pinterest API error!");
    console.log(e.response.status, e.response.data);
    return [];
  }

  //console.log(response.data);
  //console.log(response.data.resource_response.data[0].rich_summary.display_name);

  let result = [];

  if(typeof response.data.resource_response === "undefined" || typeof response.data.resource_response.data === "undefined"){
    return [];
  }

  response.data.resource_response.data.map((record, i) => {
    try{
      let obj;
      if(typeof record.rich_summary !== "undefined" && record.rich_summary !== null){
        obj = {
          title: record.rich_summary.display_name,
          description: record.rich_summary.display_description,
          photo: record.images["736x"].url,
          datetime: record.created_at,
        }
      }else{
        obj = {
          title: record.description,
          description: "",
          photo: record.images["736x"].url,
          datetime: record.created_at,
        }
      }

      result.push(obj);
    }catch(e){
      console.log("========================");
      console.log(e);
      console.log(record);
      return true;
    }
  });

  return result;
}

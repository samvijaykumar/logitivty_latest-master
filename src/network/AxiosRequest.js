import Axios from "axios";
import NetworkConstants from "./NetworkConstant";
import AppUtils from "../utils/AppUtils";
import AppStrings from "../utils/AppStrings";
import { checkInternet } from "../utils/InternetUtils";
import UserSession from "../utils/UserSession";
const demoToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzQxOTU4ZDBjYTExMDRhM2E1NmU4NDRiZjFkZTc2NDQyNzMyMmRkYzg0YmIzNmQ3NmI0YTg5OWUyZTczYjIzYmZjMTlhMmZlMjQ0Mjk2NWEiLCJpYXQiOjE3MTk2NjUwNTUuNjc0MDY0LCJuYmYiOjE3MTk2NjUwNTUuNjc0MDY4LCJleHAiOjE3NTEyMDEwNTUuNjY1OTcxLCJzdWIiOiI2MTciLCJzY29wZXMiOltdfQ.mo62rUCASFEYczoGeLTOjdr3qFbt7WIaZbSz8RdI8NBgoc_N10UGgHqBBhpj7oxdEdC_2Np3VE44Fvt5M7s_e5m76AQT1h07L0D3ca9G3L_Ice-LuHBDzLEJLuGiyPZyGWFqZ8hocUADKmeuDl7gOGYHYJdYESGmTdWqIQee1SvkrfGonlBRGNg7TExA78aApZ3rQ7TlWSihyQx_NWEAAB8JWgIEUrhV6mPTcssQ5aYdDl0OXy1SsygkEJGoM7qqbh7vznC_K6n0Sd6e2FZOa-ZiAQcFdlvgJDF1u2iYYS6fsBnZoteOlWu3WgNECEAcjsAWKKw1jU881wb-RXSPQx1caLJio-QAMAvOu0Qq3QmprMiM3_FjjAfU_sy-kTY_kP0HPNI1HiKWtqRApj_bxLEKEyDSoGPjlomKMHT_3PM_mIxIa93oLUdmZvEEAATA6s8AUu13pRLpaMVWct4kW5tI-QTKCge6qJLf1lvtEEa6N7WbZBHDuYV-cymxmeD1H8nPlLu5qD3vqZmqtPVkn5LRAHez1RWoHn8hSsCeaIvI8nD5_i3EkBOHw7t_dClHbz0j21g_mYz8mtgif07DfsaiAJAkz_Ma9Fc_ol0Qcmflou6ht_T0PnRqIovRA7warwD4QBGFDgiZkY1hIZ_xhVAsDLPTJIa_RoUAYnSul-o";

const timeout = 60 * 2 * 1000;
export async function getApiRequest(url, params, baseUrl = null) {
  const connected = await checkInternet();
  const user = await UserSession.getUserSessionData();
  const isLoggedIn = await UserSession.isLoggedIn();
  // console.log("internet: " , connected)
  if (!connected) {
    AppUtils.showAlert(AppStrings.err_check_internet_connection);
    return Promise.reject(AppStrings.err_check_internet_connection);
  }

  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // header.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzU5OGVmNmIxNWQ0MTVhYzVlZTQ3M2M3YmQ4MGUxMGUzNGQ2NjlhNmU5YmUzNTNmYWIyYjNjZTAzNTNjZDMxMDNkYjM3MWRlY2UwNWEwMTciLCJpYXQiOjE3MTk2ODI0MjguMzcyNDAxOTUyNzQzNTMwMjczNDM3NSwibmJmIjoxNzE5NjgyNDI4LjM3MjQwNDA5ODUxMDc0MjE4NzUsImV4cCI6MTc1MTIxODQyOC4zNjY4NzgwMzI2ODQzMjYxNzE4NzUsInN1YiI6IjU5NiIsInNjb3BlcyI6W119.Zm-lEp3v8dsYhzkwTlbfyqFCujCGD-HYQsthzlaec4Ls4TOzlF0sk-U4p-vL86LSJ3CPUztfC1e4Z0gVpwhL87lD4g7maU2GXaeWQEqCVZwkb12fbstxAbYuUGnGWdfWgIAfMG7Ef4WV5AdAswIgS31gBXSBa497d0rQmHqmQjjLFLqI0sSAvyBXKzr6WI2z0_taWsSvw84Xr2Fo_kAqtD-fAqLFEWmpSA4IGQVHIEbnuzvuYN5heQl51ehaGwmTBbE9vB14CMSrTeJgd1gQUgA_zcbJvHcZn3gY-hpVQZvVdxFxjX9Vo_a7ShwlhorVdYJKcJ0OObgSTlMNCyx3ne9QpYQ5GQNPjQTAuk5KN476kl4QgBPVaoR0GN9Wagni_MNGKxhss4QCwfnyzUVO_Dcr7F0NUg_7fIJhKcjLVnIKzNx_HvLfcqMRs1m3VKkHhhbeFrspR0_wqMwusl4smHDSgLDandsy9x42NCeWL95hmDt2F2hNuAfrsUf6SuXKVI67jzWQsHNAZyIpWMq-SskBYBCgfVcybXXFdd4UZUMGmtPZ7jOVfbbDri0ro8-lb0OEHG8CiIVO1pPJzHNJjtonF0My_9inKkwT9EZ1Ig_zJ1sdyhlxyTy9jHGSYhhkq0vAmBgW11dAU7xEdeu-xDnZMsWZi06nLukcEV1dS-4`;
  if (isLoggedIn) {
    header.Authorization = `Bearer ${user.token}`;
    // header['Authorization'] = `Bearer ${demoToken}`
  }
  console.log(
    `'getRequest' ${url} ${params} Header: ${JSON.stringify(header)}`
  );
  console.log("BASE_URL", NetworkConstants.BASE_URL);
  return Axios({
    url: url,
    method: "get",
    baseURL: AppUtils.isNull(baseUrl) ? NetworkConstants.BASE_URL : baseUrl,
    params: params,
    timeout: timeout,
    headers: header,
  });
}

export async function postApiRequest(url, data, baseUrl = null) {
  const connected = await checkInternet();
  // const user  = await UserSession.getUserSession
  const userData = await UserSession.getUserSessionData();
  const isLoggedIn = await UserSession.isLoggedIn();
  // console.log("internet: " , connected)

  if (!connected) {
    AppUtils.showAlert(AppStrings.err_check_internet_connection);
    return Promise.reject(AppStrings.err_check_internet_connection);
  }
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // header.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzU5OGVmNmIxNWQ0MTVhYzVlZTQ3M2M3YmQ4MGUxMGUzNGQ2NjlhNmU5YmUzNTNmYWIyYjNjZTAzNTNjZDMxMDNkYjM3MWRlY2UwNWEwMTciLCJpYXQiOjE3MTk2ODI0MjguMzcyNDAxOTUyNzQzNTMwMjczNDM3NSwibmJmIjoxNzE5NjgyNDI4LjM3MjQwNDA5ODUxMDc0MjE4NzUsImV4cCI6MTc1MTIxODQyOC4zNjY4NzgwMzI2ODQzMjYxNzE4NzUsInN1YiI6IjU5NiIsInNjb3BlcyI6W119.Zm-lEp3v8dsYhzkwTlbfyqFCujCGD-HYQsthzlaec4Ls4TOzlF0sk-U4p-vL86LSJ3CPUztfC1e4Z0gVpwhL87lD4g7maU2GXaeWQEqCVZwkb12fbstxAbYuUGnGWdfWgIAfMG7Ef4WV5AdAswIgS31gBXSBa497d0rQmHqmQjjLFLqI0sSAvyBXKzr6WI2z0_taWsSvw84Xr2Fo_kAqtD-fAqLFEWmpSA4IGQVHIEbnuzvuYN5heQl51ehaGwmTBbE9vB14CMSrTeJgd1gQUgA_zcbJvHcZn3gY-hpVQZvVdxFxjX9Vo_a7ShwlhorVdYJKcJ0OObgSTlMNCyx3ne9QpYQ5GQNPjQTAuk5KN476kl4QgBPVaoR0GN9Wagni_MNGKxhss4QCwfnyzUVO_Dcr7F0NUg_7fIJhKcjLVnIKzNx_HvLfcqMRs1m3VKkHhhbeFrspR0_wqMwusl4smHDSgLDandsy9x42NCeWL95hmDt2F2hNuAfrsUf6SuXKVI67jzWQsHNAZyIpWMq-SskBYBCgfVcybXXFdd4UZUMGmtPZ7jOVfbbDri0ro8-lb0OEHG8CiIVO1pPJzHNJjtonF0My_9inKkwT9EZ1Ig_zJ1sdyhlxyTy9jHGSYhhkq0vAmBgW11dAU7xEdeu-xDnZMsWZi06nLukcEV1dS-4`;
  if (userData) {
    header.Authorization = `Bearer ${userData.token}`;
    // header['Authorization'] = `Bearer ${demoToken}`
  }

  console.log(
    `postApiRequest ${NetworkConstants.BASE_URL}${url} ${JSON.stringify(
      data
    )} ${JSON.stringify(header)}`
  );

  console.log(`baseUrlwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwsssssss ${url} ${data}, ${baseUrl}, `,);

  return Axios({
    url: url,
    method: "post",
    baseURL: AppUtils.isNull(baseUrl) ? NetworkConstants.BASE_URL : baseUrl,
    data: data,
    timeout: timeout,
    headers: header,
  });
}

export async function postApiMultipartRequest(url, formData) {
  const connected = await checkInternet();
  // const user  = await UserSession.getUserSession
  const userData = await UserSession.getUserSessionData();
  const isLoggedIn = await UserSession.isLoggedIn();

  // console.log("internet: " , connected)

  if (!connected) {
    AppUtils.showAlert(AppStrings.err_check_internet_connection);
    return Promise.reject(AppStrings.err_check_internet_connection);
  }
  let header = {
    Accept: "application/json",
    mimeType: "multipart/form-data",
    "Content-Type": "multipart/form-data",
  };
  // header.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzU5OGVmNmIxNWQ0MTVhYzVlZTQ3M2M3YmQ4MGUxMGUzNGQ2NjlhNmU5YmUzNTNmYWIyYjNjZTAzNTNjZDMxMDNkYjM3MWRlY2UwNWEwMTciLCJpYXQiOjE3MTk2ODI0MjguMzcyNDAxOTUyNzQzNTMwMjczNDM3NSwibmJmIjoxNzE5NjgyNDI4LjM3MjQwNDA5ODUxMDc0MjE4NzUsImV4cCI6MTc1MTIxODQyOC4zNjY4NzgwMzI2ODQzMjYxNzE4NzUsInN1YiI6IjU5NiIsInNjb3BlcyI6W119.Zm-lEp3v8dsYhzkwTlbfyqFCujCGD-HYQsthzlaec4Ls4TOzlF0sk-U4p-vL86LSJ3CPUztfC1e4Z0gVpwhL87lD4g7maU2GXaeWQEqCVZwkb12fbstxAbYuUGnGWdfWgIAfMG7Ef4WV5AdAswIgS31gBXSBa497d0rQmHqmQjjLFLqI0sSAvyBXKzr6WI2z0_taWsSvw84Xr2Fo_kAqtD-fAqLFEWmpSA4IGQVHIEbnuzvuYN5heQl51ehaGwmTBbE9vB14CMSrTeJgd1gQUgA_zcbJvHcZn3gY-hpVQZvVdxFxjX9Vo_a7ShwlhorVdYJKcJ0OObgSTlMNCyx3ne9QpYQ5GQNPjQTAuk5KN476kl4QgBPVaoR0GN9Wagni_MNGKxhss4QCwfnyzUVO_Dcr7F0NUg_7fIJhKcjLVnIKzNx_HvLfcqMRs1m3VKkHhhbeFrspR0_wqMwusl4smHDSgLDandsy9x42NCeWL95hmDt2F2hNuAfrsUf6SuXKVI67jzWQsHNAZyIpWMq-SskBYBCgfVcybXXFdd4UZUMGmtPZ7jOVfbbDri0ro8-lb0OEHG8CiIVO1pPJzHNJjtonF0My_9inKkwT9EZ1Ig_zJ1sdyhlxyTy9jHGSYhhkq0vAmBgW11dAU7xEdeu-xDnZMsWZi06nLukcEV1dS-4`;
  if (isLoggedIn) {
    header.Authorization = `Bearer ${userData.token}`;
    // header['Authorization'] = `Bearer ${demoToken}`
  }
  console.log(
    `postApiMultipartRequest ${url} ${JSON.stringify(
      formData
    )} ${JSON.stringify(header)}`
  );

  return Axios.post(NetworkConstants.BASE_URL + url, formData, {
    headers: header,
    timeout: timeout,
  });
}

import {
  getApiRequest,
  postApiMultipartRequest,
  postApiRequest,
} from "./AxiosRequest";
import NetworkConstants from "./NetworkConstant";

// login user
export async function doLoginUser(data) {
  return postApiRequest(NetworkConstants.VerifyMobile, data);
}

// login user with OTP
export async function doLoginUserWithOTP(data) {
  return postApiRequest(NetworkConstants.LoginWithOTP, data);
}

// register user
export async function doRegisterUserTemp(data) {
  return postApiRequest(NetworkConstants.RegisterTemp, data);
}

// register user
export async function doRegisterUserWithOTP(data) {
  return postApiRequest(NetworkConstants.Register1, data);
}

// forgot password
export async function doForgotPassword(data) {
  return postApiRequest(NetworkConstants.ForgetPassword, data);
}

//Verify Otp
export async function doVerifyOTP(data) {
  return postApiRequest(NetworkConstants.VerifyOTP, data);
}

//Home Data
export async function getHomeData(data) {
  return postApiRequest(NetworkConstants.Home_static, data);
}

//Subscription List
export async function subscriptionList(data) {
  return postApiRequest(NetworkConstants.subscriptionListApi, data);
}

//Subscription Details:
export async function subscriptionDetails(data) {
  return postApiRequest(NetworkConstants.subscriptionDetailsApi, data);
}

//Social login :
export async function doSocailLogin(data) {
  return postApiRequest(NetworkConstants.SocialLogin, data);
}
// Payment Setting
export async function getPaymentSetting(data) {
  return postApiRequest(NetworkConstants.PaymentSetting, data);
}
//create order :
export async function createOrderData(data) {
  return postApiRequest(NetworkConstants.createOrderId, data);
}
//Save PAyment Data :
export async function savePaymentData(data) {
  return postApiRequest(NetworkConstants.SavePaymentData, data);
}

//Save PAyment Data :
export async function getCityList(data) {
  return postApiRequest(NetworkConstants.GetCityData, data);
}

//Show Dashboard Data :
export async function getDashboardList(data) {
  return postApiRequest(NetworkConstants.Dashboard, data);
}

//get ai memography Data :
export async function getAiMemographyApi(data) {
  return postApiRequest(NetworkConstants.AiMemographyDetails, data);
}

//Calendar holiday Data :
export async function getCalendarholidayApiCall(data) {
  return postApiRequest(NetworkConstants.getCalendarholidayApi, data);
}

//Calendar holiday Data :
export async function getTimeSlotsApiCall(data) {
  return postApiRequest(NetworkConstants.getTimeSlotsApi, data);
}
//get Booking Details
export async function getBookingDetailsApiCall(data) {
  return postApiRequest(NetworkConstants.getBookingDetailsApi, data);
}
//Get User Profile Data :
export async function getProfileData(data) {
  return postApiRequest(NetworkConstants.GetProfile, data);
}

//get Franchisee Fees Api
export async function getFranchiseeFeesApiCall(data) {
  return postApiRequest(NetworkConstants.getFranchiseeFeesApi, data);
}

//get Booking Mammography Api
export async function getBookingMammographyApiCall(data) {
  return postApiRequest(NetworkConstants.getBookingMammographyApi, data);
}

//get User Family Members Api
export async function getUserFamilyMembersApiCall(data) {
  return postApiRequest(NetworkConstants.getUserFamilyMembersApi, data);
}
//get Relation Api
export async function getRelationApiCall(data) {
  return getApiRequest(NetworkConstants.getRelationApi, data);
}
//add family member
export async function addFamilyMemberApiCall(data) {
  return postApiRequest(NetworkConstants.AddFamilyMember, data);
}

//add family member
export async function updateUserProfile(data) {
  return postApiRequest(NetworkConstants.UpdateProfile, data);
}

//Save payment mamo data
export async function savePaymentMamoData(data) {
  return postApiRequest(
    NetworkConstants.savePaymentBookingMammographyApi,
    data
  );
}
//Get Share token data
export async function getShareTokenApiData(data) {
  return postApiRequest(NetworkConstants.getShareTokenApi, data);
}

//Booking Order List Data
export async function getBookingListData(data) {
  return postApiRequest(NetworkConstants.getBookingList, data);
}

//Get Booking Order Details Data
export async function getBookingDetailsData(data) {
  return postApiRequest(NetworkConstants.getBookingDetails, data);
}

//post Support Ticket Data
export async function postSupportTicketData(data) {
  return postApiRequest(NetworkConstants.submitSupportTicket, data);
}
//Update Notification
export async function updateNotification(data) {
  return postApiRequest(NetworkConstants.UpdateNotification, data);
}
//Get Notification
export async function getNotification(data) {
  return postApiRequest(NetworkConstants.GetNotification, data);
}
//Get CheckList Data
export async function getSettings(data) {
  return postApiRequest(NetworkConstants.GetAppSetting, data);
}

//get Support Categories Data
export async function getSupportCategoriesData(data) {
  return postApiRequest(NetworkConstants.getSupportCategories, data);
}
//get Refer code
export async function getReferCodeData(data) {
  return postApiRequest(NetworkConstants.getReferCode, data);
}

//get Faq Categories Data
export async function getFaqCategoriesData(data) {
  return postApiRequest(NetworkConstants.getFaqCategories, data);
}

//get Faqs Data
export async function getFaqsData(data) {
  return postApiRequest(NetworkConstants.getFaqs, data);
}
//Update Profile
export async function uploadProfileApi(data) {
  return postApiMultipartRequest(NetworkConstants.UploadProfileImage, data);
}
//Reschedule mammography
export async function rescheduleMammographyApi(data) {
  return postApiRequest(NetworkConstants.RescheduleMammography, data);
}
//Save Reschedule mammography details
export async function saveRescheduleMammographyDetailsApi(data) {
  return postApiRequest(
    NetworkConstants.SaveRescheduleMammographyDetails,
    data
  );
}
//Cancel Booking mammography details
export async function cancelBookingMammographyApiCall(data) {
  return postApiRequest(NetworkConstants.cancelBookingMammo, data);
}
//City List
export async function cityListApi(data) {
  return postApiRequest(NetworkConstants.cityList, data);
}
//State List
export async function stateListApi(data) {
  return postApiRequest(NetworkConstants.stateList, data);
}
// register Agent
export async function doRegisterAgentWithOTP(data) {
  return postApiRequest(NetworkConstants.AgentRegister, data);
}

// verifyReferralCode
export async function verifyReferralCodeData(data) {
  return postApiRequest(NetworkConstants.verifyReferralCode, data);
}
//create agent order :
export async function createAgentOrderData(data) {
  return postApiRequest(NetworkConstants.CreateAgentOrderId, data);
}
//Save agent PAyment Data :
export async function saveAgentPaymentData(data) {
  return postApiRequest(NetworkConstants.FetchPaymentDetails, data);
}
// saveReferralCode
export async function saveReferralCodeData(data) {
  return postApiRequest(NetworkConstants.saveReferralCode, data);
}
// cancel agent payment
export async function cancelAgentPayment(data) {
  return postApiRequest(NetworkConstants.cancelAgentPayment, data);
}
// Get Wellness Class data
export async function getWellnessClassData(data) {
  return postApiRequest(NetworkConstants.getWellnessClassApi, data);
}
// Get Product banners data
export async function getProductBannersData(data) {
  return postApiRequest(NetworkConstants.getProductBanners, data);
}
// Get Product categories data
export async function getProductCategoriesData(data) {
  return postApiRequest(NetworkConstants.getProductCategories, data);
}
// Get Dashboard Product  data
export async function getDashobardProductData(data) {
  return postApiRequest(NetworkConstants.getDashboardProduct, data);
}
// Get Sort option  data
export async function getSortOptionData(data) {
  return postApiRequest(NetworkConstants.sortOptions, data);
}
// Get Product  data
export async function getProductData(data) {
  return postApiRequest(NetworkConstants.getProducts, data);
}
// Call Filter api
export async function getFilterData(data) {
  return postApiRequest(NetworkConstants.getFilterOption, data);
}
// call manage wishlist api
export async function manageWishListData(data) {
  return postApiRequest(NetworkConstants.manageWishList, data);
}
// get Cart data api
export async function getCartData(data) {
  return postApiRequest(NetworkConstants.getCart, data);
}
// add product to cart api
export async function addProductToCartData(data) {
  return postApiRequest(NetworkConstants.addProductToCart, data);
}
// remove product from cart api
export async function removeProductFromCartData(data) {
  return postApiRequest(NetworkConstants.removeProductFromCart, data);
}
// get cart count data api
export async function getCartCountData(data) {
  return postApiRequest(NetworkConstants.getCartCount, data);
}
// get wishlist data api
export async function getWishListData(data) {
  return postApiRequest(NetworkConstants.getWishListData, data);
}
// get search List data api
export async function getSearchListData(data) {
  return postApiRequest(NetworkConstants.getSearchList, data);
}
// get product detail api
export async function getProductDetailApiData(data) {
  return postApiRequest(NetworkConstants.getProductDetails, data);
}

// Save Address
export async function saveAddressApiCall(data) {
  return postApiRequest(NetworkConstants.saveAddressData, data);
}

// Remove Address
export async function removeAddressApiCall(data) {
  return postApiRequest(NetworkConstants.removeAddressData, data);
}

// Edit Address
export async function getEditAddressApiCall(data) {
  return postApiRequest(NetworkConstants.getEditAddress, data);
}

// Addresses List
export async function getAddressesListApiCall(data) {
  return postApiRequest(NetworkConstants.getAddressesList, data);
}
// Cart checkout
export async function cartCheckoutApiCall(data) {
  return postApiRequest(NetworkConstants.cartCheckout, data);
}
// savePayment
export async function savePaymentEcomData(data) {
  return postApiRequest(NetworkConstants.processOrder, data);
}
// Cancel order
export async function cancelEcomOrderApiCall(data) {
  return postApiRequest(NetworkConstants.cancelOrder, data);
}
// get order details
export async function getOrderDetailsApiCall(data) {
  return postApiRequest(NetworkConstants.getOrderDetails, data);
}

// ecom order history
export async function getEComOrderHistoryList(data) {
  return postApiRequest(NetworkConstants.getEComOrderHistory, data);
}

// Deals banner
export async function getDealsBanner() {
  return postApiRequest(NetworkConstants.getDealsBanner, {});
}

// Get deals Product  data
export async function getDealsProductData(data) {
  return postApiRequest(NetworkConstants.getDealsProduct, data);
}
// Get deals Product  details
export async function getDealsProductDetails(data) {
  return postApiRequest(NetworkConstants.getDealProductDetails, data);
}
// Get deals cart count
export async function getDealsCartCountData(data) {
  return postApiRequest(NetworkConstants.getDealCartCount, data);
}
// Get deals cart  data
export async function getDealsCartData(data) {
  return postApiRequest(NetworkConstants.getDealCart, data);
}
// add deals cart  data
export async function addDealCartData(data) {
  return postApiRequest(NetworkConstants.addDealCart, data);
}
// remove deals cart
export async function removeDealCartData(data) {
  return postApiRequest(NetworkConstants.removeDealCart, data);
}
// deals cart checkout
export async function dealsCartCheckoutApi(data) {
  return postApiRequest(NetworkConstants.dealCartCheckout, data);
}

// savePayment Deals
export async function savePaymentDealsData(data) {
  return postApiRequest(NetworkConstants.processDealOrder, data);
}
// cancel Deals order
export async function cancelDealsOrderApiCall(data) {
  return postApiRequest(NetworkConstants.cancelDealOrder, data);
}
// get App Version
export async function getAppVersion() {
  return postApiRequest(NetworkConstants.getAppVersion, {});
}
// get App Version
export async function checkDealsCartApi(data) {
  return postApiRequest(NetworkConstants.checkDealsCart, data);
}

// get_welness_coaching_modules
export async function getWelnessCoachingModules(data) {
  return postApiRequest(NetworkConstants.welnessCoachingModules, data);
}

// get_zero_profit_diagnostics_module
export async function getZeroProfitDiagnosticsModule(data) {
  return postApiRequest(NetworkConstants.zeroProfitDiagnosticsModule, data);
}

//getReferalStats
export async function getReferalStatsApiCall(data) {
  return postApiRequest(NetworkConstants.getReferalStats, data);
}

// Get Community Events data
export async function getCommunityEventsApi(data) {
  return postApiRequest(NetworkConstants.getCommunityEventsApi, data);
}

// Get Helpline data
export async function getHelplineApiCall(data) {
  return postApiRequest(NetworkConstants.getHelplineApi, data);
}

//  (for zero-profit diagnostics list)
export async function getCheckupPackagesApiCall(data) {
  return postApiRequest(NetworkConstants.getCheckupPackagesApi, data);
}

// (for zero-profit diagnostics details)
export async function getCheckupPackagesDetailsApiCall(data) {
  return postApiRequest(NetworkConstants.getCheckupPackagesDetailsApi, data);
}

// (add user deal)
export async function getadduserdealApiCall(data) {
  return postApiMultipartRequest(NetworkConstants.adduserdealApi, data);
}

// (add business profile)
export async function getAddBussinessApiCall(data) {
  return postApiMultipartRequest(NetworkConstants.addBussinessApi, data);
}

// (get_all_deals)
export async function getAllDealsApiCalls(data) {
  return postApiRequest(NetworkConstants.getAllDeals, data);
}

// (get_deals)
export async function getDealApiCall(data) {
  return postApiRequest(NetworkConstants.getDeal, data);
}

// (get_business_profile)
export async function getBussinessApiCall(data) {
  return postApiRequest(NetworkConstants.getBussiness, data);
}

// (repost_deal)
export async function repostDealApiCall(data) {
  return postApiMultipartRequest(NetworkConstants.repostDeal, data);
}

// (update_live_deals)
export async function updateLiveDealApiCall(data) {
  return postApiMultipartRequest(NetworkConstants.updateLiveDeal, data);
}

// (update_business_profile)
export async function updateBussinessApiCall(data) {
  return postApiMultipartRequest(NetworkConstants.updateBussiness, data);
}

export async function getCityListApiData(data) {
  return postApiRequest(NetworkConstants.cityList, data);
}

//(GET COMMUNITY DEALS)
export async function getCommunityDealsApiCalls(data) {
  return postApiRequest(NetworkConstants.getCommunityDeals, data);
}

export async function deleteAccountApiCalls(data) {
  return postApiRequest(NetworkConstants.DeleteAccount, data);
}

export async function getBannersApiCalls(data) {
  return postApiRequest(NetworkConstants.GetBanners, data);
}

export async function getDealDetailsApiCalls(data) {
  return postApiRequest(NetworkConstants.GetDealDetails, data);
}

export async function AddUserReferalsApiCalls(data) {
  return postApiRequest(NetworkConstants.AddUserReferals, data);
}

export async function ShowUserReferalsApiCall(data) {
  return postApiRequest(NetworkConstants.ShowUserReferals, data);
}

export async function CheckVoucherCodeApiCall(data) {
  return postApiRequest(NetworkConstants.checkVoucherCode, data);
}

export async function ApplyvouchercodeApiCall(data) {
  return postApiRequest(NetworkConstants.applyvouchercode, data);
}
export async function getJourneyList(data) {
  return getApiRequest(NetworkConstants.getJourneyList, data);
}

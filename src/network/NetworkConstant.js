export default class NetworkConstants {
  //static BASE_URL = "http://fightpronew.24livehost.com/api/"
  //static BASE_URL = "https://1stopinstruction.com/longevity/"
  // static BASE_URL = "https://longevity.24livehost.com/api/"
  // static BASE_URL = "https://longevity.24livehost.com/api/V4/"
  //static LOGO_URL = 'https://longevity.24livehost.com/img/sitelogo.png'
  // static BASE_URL = "https://admin1.thelongevityclub.app/api/"
  //static BASE_URL = "https://admin1.thelongevityclub.app/api/V2/"
  //static BASE_URL = "https://admin1.thelongevityclub.app/api/V3/"
  // static BASE_URL = "https://admin1.thelongevityclub.app/api/V4/"
  // static BASE_URL = "https://longevity.24livehost.com/api/V5/"
  //  static BASE_URL = "https://admin1.thelongevityclub.app/api/"
  // static BASE_URL = "https://longevitynew.24livehost.com/api/V6";

  static BASE_URL = "https://demo.sgvproject.in/longetivity/api/V6/";
  static IMAGE_URL =
    "https://demo.sgvproject.in/longetivity/uploads/food_diary_admin/";
  // static BASE_URL = "https://longevitynew.24livehost.com/api/V6";
  static LOGO_URL = "https://admin1.thelongevityclub.app/img/sitelogo.png";
  static SIGNUP_IOS_LIVE =
    "https://subscribe.thelongevityclub.app/front-register?webview=1";
  static SIGNUP_IOS_DEBUG =
    "https://longevity.24livehost.com/front-register?webview=1";

  //api methods
  static Login = "login";
  static RegisterTemp = "register_temp";
  static Register = "register";
  static Register1 = "register1";
  static LoginWithOTP = "sendotp";
  static VerifyOTP = "verifymobile";
  static Home_static = "home_static_content";
  static subscriptionListApi = "get_subscription_plans";
  static subscriptionDetailsApi = "get_subscription_plan_detail";
  static SocialLogin = "social_login";
  static PaymentSetting = "get_payment_settings";
  static createOrderId = "create_subscription_order_id";
  static SavePaymentData = "fetch_payment_details";
  static GetCityData = "get_cities";
  static Dashboard = "member_dashboard_static";
  static AiMemographyDetails = "get_profile_stats";
  static getCalendarholidayApi = "get_franchisee_holidays";
  static getTimeSlotsApi = "get_franchisee_timeslots";
  static getBookingDetailsApi = "get_booking_details";
  static getFranchiseeFeesApi = "get_franchisee_fees";
  static GetProfile = "get_profile";
  static getBookingMammographyApi = "booking_mammography";
  static getUserFamilyMembersApi = "get_user_family_members";
  static getRelationApi = "relations";
  static AddFamilyMember = "crud_user_family_member";
  static UpdateProfile = "update_profile";
  static savePaymentBookingMammographyApi = "fetch_payment_mammography_details";
  static getBookingList = "get_booking_list";
  static getBookingDetails = "get_booking_details";
  static submitSupportTicket = "submit_support_ticket";
  static getSupportCategories = "get_support_categories";
  static getShareTokenApi = "generate_share_token";
  static UpdateNotification = "update_notification_settings";
  static GetNotification = "get_notification_settings";
  static GetAppSetting = "get_settings";
  static getReferCode = "get_referal_code";
  static getFaqCategories = "get_faq_categories";
  static getFaqs = "get_faqs";
  static UploadProfileImage = "update_avatar";
  static RescheduleMammography = "reschedule_mammography";
  static SaveRescheduleMammographyDetails =
    "fetch_reschedule_mammography_details";
  static cancelBookingMammo = "cancel_mammography";
  static cityList = "get_state_cities";
  static stateList = "get_states";
  static AgentRegister = "agent_register";
  static verifyReferralCode = "verify_referral_code";
  static CreateAgentOrderId = "create_agent_order_id";
  static FetchPaymentDetails = "fetch_agent_payment_details";
  static saveReferralCode = "save_referral_code";
  static cancelAgentPayment = "cancel_agent_payment";
  static getWellnessClassApi = "get_wellness_classes";
  static getProductBanners = "get_product_banners";
  static getProductCategories = "get_product_categories";
  static getDashboardProduct = "get_dashboard_products";
  static sortOptions = "sort_options";
  static getProducts = "get_products";
  static getFilterOption = "filter_options";
  static manageWishList = "manage_wishlist";
  static getCart = "get_cart";
  static getCartCount = "get_cart_count";
  static addProductToCart = "add_cart";
  static removeProductFromCart = "remove_cart";
  static getWishListData = "get_wishlist";
  static getSearchList = "search_products";
  static getProductDetails = "get_product_details";
  static saveAddressData = "save_address";
  static removeAddressData = "remove_address";
  static getEditAddress = "get_address";
  static getAddressesList = "get_addresses";
  static cartCheckout = "cart_checkout";
  static processOrder = "process_order";
  static cancelOrder = "cancel_order";
  static getEComOrderHistory = "get_order_history";
  static getOrderDetails = "get_order_details";
  static getDealsBanner = "get_deal_banners";
  static getDealsProduct = "get_deal_products";
  static getDealProductDetails = "get_deal_product_details";
  static getDealCartCount = "get_deal_cart_count";
  static getDealCart = "get_deal_cart";
  static addDealCart = "add_deal_cart";
  static removeDealCart = "remove_deal_cart";
  static dealCartCheckout = "deal_cart_checkout";
  static processDealOrder = "process_deal_order";
  static cancelDealOrder = "cancel_deal_order";
  static getAppVersion = "get_version";
  static checkDealsCart = "check_deal_cart";
  static welnessCoachingModules = "get_wellness_coaching_modules";
  static zeroProfitDiagnosticsModule = "get_diagnostics_module";
  static getReferalStats = "get_referal_stats";
  static getCommunityEventsApi = "get_events";
  static getHelplineApi = "get_helpline";
  static getCheckupPackagesApi = "get_checkup_packages";
  static getCheckupPackagesDetailsApi = "get_checkup_package_details";
  static adduserdealApi = "add_user_deal";
  static addBussinessApi = "add_bussiness";
  static getAllDeals = "get_user_deal";
  static getDeal = "get_deal";
  static updateLiveDeal = "update_live_deal";
  static repostDeal = "repost_deal";
  static getBussiness = "get_bussiness";
  static updateBussiness = "update_bussiness";
  static getCommunityDeals = "get_all_deals";
  static DeleteAccount = "delete_account";
  static GetBanners = "get_banners";
  static GetDealDetails = "get_deal_details";
  static AddUserReferals = "add_user_referals";
  static ShowUserReferals = "show_user_referals";
  static checkVoucherCode = "check_voucher_code";
  static applyvouchercode = "apply_voucher_code";
  static getJourneyList="get_journey_list";
}

import AppUtils from "./AppUtils";

export default class ResourceUtils {
  static fonts = {
    poppins_bold: AppUtils.isIOS() ? "poppins-bold" : "poppins_bold",
    poppins_semibold: AppUtils.isIOS()
      ? "poppins-semibold"
      : "poppins_semibold",
    poppins_regular: AppUtils.isIOS() ? "poppins-regular" : "poppins_regular",
    poppins_medium: AppUtils.isIOS() ? "poppins-medium" : "poppins_medium",
  };

  static images = {
    //nav menu

    img_help: require("./images/img_help.png"),
    signup_applause: require("./images/signup_applause.png"),
    splash_logo: require("./images/logo.png"),
    facebook: require("./images/facebook.png"),
    facebook_withBG: require("./images/facebook_withBG.png"),
    google: require("./images/google.png"),
    google_withBG: require("./images/google_withBG.png"),
    mail: require("./images/mail.png"),
    padlock: require("./images/padlock.png"),
    img_menu: require("./images/menu.png"),
    logo: require("./images/logo.png"),
    menu: require("./images/menu.png"),
    bottom_tab__home: require("./images/bottom_tab__home.png"),
    bottom_tab_account: require("./images/bottom_tab_account.png"),
    bottom_tab_bell: require("./images/bottom_tab_bell.png"),
    back: require("./images/back.png"),
    food_diary_new: require("./images/food_diary_new.png"),
    phone: require("./images/smartphone1.png"),
    user: require("./images/profileUser.png"),
    code: require("./images/code.png"),
    bubble_bg: require("./images/bubble_bg.png"),
    arrow_left: require("./images/arrow_left.png"),
    img_otp: require("./images/Group_565.png"),
    img_edit: require("./images/Group_566.png"),
    maskGroup1: require("./images/MaskGroup4.png"),
    maskGroup: require("./images/MaskGroup.png"),
    redRight: require("./images/red_right_arrow.png"),
    technical: require("./images/technical.png"),
    calendar: require("./images/calendar.png"),
    document: require("./images/document.png"),
    faq: require("./images/faq.png"),
    help: require("./images/help.png"),
    red_back: require("./images/red_right_arrow.png"),
    red_download: require("./images/red_download.png"),
    user_refer: require("./images/user_refer.png"),
    mammography: require("./images/mammography.png"),
    logout: require("./images/logout.png"),
    avatar: require("./images/avatar.png"),
    add_memb: require("./images/add_memb.png"),
    add_group: require("./images/add_group.png"),
    menu_dash: require("./images/menu_dash.png"),
    ic_check: require("./images/check.png"),
    ic_check_right: require("./images/white_circle_red_arrow.png"),
    ic_arrow_left_black: require("./images/arrow_pointing_left.png"),
    calendar_bubble_bg: require("./images/calendar_bubble_bg.png"),
    ic_city: require("./images/architecture_and_city.png"),
    bubbleBooking: require("./images/bubble-bgs.png"),
    clock: require("./images/clock.png"),
    date: require("./images/date.png"),
    location: require("./images/location.png"),
    greenArrow: require("./images/greenArrow.png"),
    blackBack: require("./images/blackBack.png"),
    ic_arrow_left_black2: require("./images/arrow_pointing_to_left.png"),
    bubble_bg_green: require("./images/bubble_bg_green.png"),
    bubble_bg_light: require("./images/bubble_bg_light.png"),
    ic_checked_round_green: require("./images/checked.png"),
    back_black_arrow: require("./images/back_black_arrow.png"),
    bubble_bg_yellow: require("./images/bubble_bg_yellow.png"),
    green_checked: require("./images/green_checked.png"),
    orenge_clock: require("./images/orenge_clock.png"),
    clock: require("./images/clock.png"),
    ic_share: require("./images/share.png"),
    gray_clock: require("./images/gray_clock.png"),
    ic_check_green: require("./images/check_round.png"),
    ic_shopping_list: require("./images/shopping_list.png"),
    bubbleProfile: require("./images/bubblelight.png"),
    ic_settings: require("./images/settings.png"),
    ic_heart: require("./images/heart.png"),
    draw: require("./images/draw.png"),
    blue_plus: require("./images/blue_plus.png"),
    cal_left_arrow: require("./images/cal_left_arrow.png"),
    cal_right_arrow: require("./images/cal_right_arrow.png"),
    right_arrow: require("./images/right_arrow.png"),
    green_check_without_circle: require("./images/green_check_without_circle.png"),
    rad_crox_without_circle: require("./images/rad_crox_without_circle.png"),
    yellow_clock: require("./images/yellow_clock.png"),
    toggle_On: require("./images/toggleOn.png"),
    toggle_off: require("./images/toggleOff.png"),
    referEarn: require("./images/referEarn.png"),
    refer_new: require("./images/refer_new.png"),
    checkMark: require("./images/check-mark.png"),
    rewards: require("./images/rewards.png"),
    copyLink: require("./images/copyLink.png"),
    copyBar: require("./images/copyBar.png"),
    black_arrow: require("./images/black_arrow.png"),
    white_arrow: require("./images/white_arrow.png"),
    ic_camera: require("./images/Group1415.png"),
    download: require("./images/download.png"),
    shop: require("./images/shop.png"),
    information: require("./images/information.png"),
    Add_family_members_banner: require("./images/Add_family_members_banner.png"),
    book_for_someone_else_banner: require("./images/book_for_someone_else_banner.png"),
    booking_confirmed_banner: require("./images/booking_confirmed_banner.png"),
    Edit_family_member_banner: require("./images/Edit_family_member_banner.png"),
    Family_members_data_banner: require("./images/Family_members_data_banner.png"),
    Help_banner: require("./images/Help_banner.png"),
    profile_banner: require("./images/profile_banner.png"),
    select_center_city_banner: require("./images/select_center_city_banner.png"),
    select_date_banner: require("./images/select_date_banner.png"),
    select_time_slot_banner: require("./images/select_time_slot_banner.png"),
    book_appointment_banner: require("./images/book_appointment_banner.png"),
    subs_bg: require("./images/subs.png"),
    ic_heart_icon_3:require("./images/heart_icon_3.png"),
    // ic_heart2:require("./images/heart_icon_2.png"),
    Add_address:require("./images/Add_address.png"),
    ic_document: require("./images/document.png"),
    ic_breast_cancer: require("./images/breast_cancer.png"),
    ic_women: require("./images/woman.png"),
    camera: require("./images/camera.png"),
    gallery: require("./images/gallery.png"),
    ic_edit: require("./images/ic_edit.png"),
    ic_calendra: require("./images/ic_calendra.png"),
    bottom_tab__home: require("./images/bottom_tab__home.png"),
    home: require("./images/home.png"),
    booking_no_show: require("./images/booking_no_show.png"),
    home_page_pink: require("./images/home_page_pink.png"),
    ic_calendar_agent: require("./images/calendar_agent.png"),
    bg_purple: require("./images/purple_bg.png"),
    bg_orange: require("./images/orange_bg.png"),
    bg_green: require("./images/green_bg.png"),
    mammography_new_icon: require("./images/mammography_new_icon.png"),
    ic_thermo: require("./images/thermo.png"),
    agentLogin: require("./images/agentLogin.png"),
    agentRefer: require("./images/agentReffer.png"),
    Group_5376: require("./images/Group_5376.png"),
    agent_payment: require("./images/agent_payment.png"),
    ambassador_congratulations: require("./images/ambassador_congratulations.png"),
    download_icon: require("./images/download_icon.png"),
    bg_wellness: require("./images/welness.png"),
    ic_baseline_favorite: require("./images/baseline_favorite.png"),
    ic_shopping_cart: require("./images/outline_shopping_cart.png"),
    ic_search: require("./images/baseline_search.png"),
    ic_sort: require("./images/baseline_sort.png"),
    ic_favorite_border: require("./images/baseline_favorite_border.png"),
    ic_filter: require("./images/filter_alt_black.png"),
    ic_baseline_favorite_filled: require("./images/baseline_favorite_filled.png"),
    ic_baseline_add: require("./images/baseline_add.png"),
    ic_baseline_remove: require("./images/baseline_remove.png"),
    ic_baseline_delete: require("./images/baseline_delete.png"),
    ic_delete_round: require("./images/delete.png"),
    ic_baseline_info: require("./images/baseline_info.png"),
    ic_close_red: require("./images/close_red.png"),
    ic_search_grey: require("./images/baseline_search_grey.png"),
    ic_shopping_cart_black: require("./images/ic_shopping_cart.png"),
    ic_arrow_right_white: require("./images/baseline_arrow_right_alt.png"),
    home_loction: require("./images/home_loction.png"),
    ic_address: require("./images/address.png"),
    ic_cart_gray: require("./images/shopping_bag.png"),
    ic_notification_blue: require("./images/Group_339.png"),
    ic_notification_gray: require("./images/notification_gray.png"),
    all_category_image: require("./images/all_category_image.jpg"),
    ic_add_item_cart: require("./images/ic_add_item_cart.png"),
    ic_minus_item_cart: require("./images/ic_minus_item_cart.png"),
    logo_gray_color: require("./images/logo_gray_color.png"),
    ic_history: require("./images/ic_history.png"),
    splash_bg: require("./images/splash_bg.png"),
    ic_version: require("./images/versions.png"),
    black_menu: require("./images/black_menu.png"),
    ic_diagnostics: require("./images/Group6154.png"),
    noun_User_history: require("./images/noun_User_history.png"),
    ic_psychiat: require("./images/ic_psychiat.png"),
    banner_speciality: require("./images/banner_speciality.png"),
    ic_back_btn_circle: require("./images/back_btn_circle.png"),
    ic_heartbeat_solid: require("./images/heartbeat_solid.png"),
    banner_book_consultant: require("./images/banner_book_consultant.png"),
    ic_consultant: require("./images/user_md_solid.png"),
    banner_doctor: require("./images/Group_5589.png"),
    communityevents: require("./images/communityevents.png"),
    group3: require("./images/Group3.png"),
    uploadcloud: require("./images/uploadcloud.png"),
    date_start_end: require("./images/date_start_end.png"),
    description: require("./images/description.png"),
    terms: require("./images/terms.png"),
    baselineremove: require("./images/baseline_remove.png"),
    baseline_delete: require("./images/baseline_delete.png"),
    baseline_work_shop: require("./images/work_shop.png"),
    business_category: require("./images/business_category.png"),
    onlineshop: require("./images/onlineshop.png"),
    location_new: require("./images/location_new.png"),
    time: require("./images/time.png"),
    pin: require("./images/pin.png"),
    addreferral: require("./images/addgroups.png"),
    addReferralBanner: require("./images/addReferralBanner.png"),
    car: require("./images/car.png"),
    luckydraw: require("./images/luckydraw.png"),
    congratulation: require("./images/congratulation.png"),
    cross: require("./images/cross.png"),
    uncheckedRadio: require("./images/uncheckedRadio.png"),
    checkedRadio: require("./images/checkedRadio.png"),
    panicActivated: require("./images/panicActivated.png"),
    panicDeactivated: require("./images/panicDeactivated.png"),
    tlc_masterclass: require("./images/tlc_masterclass.png"),
    upgradeFranchisee: require("./images/upgradeFranchisee.png"),
    checkedRadio: require("./images/checked_radio_button.png"),
    uncheckedRadio: require("./images/unchecked_radio_button.png"),
  };
}

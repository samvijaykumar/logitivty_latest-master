import { Icon } from "react-native-elements";
import AppStrings from "../../../utils/AppStrings";
import ResourceUtils from "../../../utils/ResourceUtils";

export const menuItemListData = [
    {
        id: 1,
        name: AppStrings.Profile,
        icon: ResourceUtils.images.avatar,
        route: "UserProfile",
    },
    {
        id: 6,
        name: "Add Address",
        // icon: ResourceUtils.images.ic_address,
        icon: ResourceUtils.images.  Add_address,
        route: "Address",
    },
    {
        id: 3,
        name: "Franchisee details",
        icon: ResourceUtils.images.upgradeFranchisee,
        route: "",
    },
    {
        id: 4,
        name: "Add Referral (Win A Car)",
        icon: ResourceUtils.images.addreferral,
        route: "AddReferral",
    },
    {
        id: 14,
        name: "Refer & Earn",
        icon: ResourceUtils.images.refer_new,
        route: "ReferEarn",
    },
    {
        id: 10,
        name: "Referral History",
        icon: ResourceUtils.images.noun_User_history,
        route: "ReferralHistory",
    },
    {
        id: 7,
        name: "Wishlist",
        // icon: ResourceUtils.images.ic_heart,
        icon: ResourceUtils.images. ic_heart_icon_3,
        route: "WishList",
    },
    {
        id: 5,
        name: "Cart",
        icon: ResourceUtils.images.ic_shopping_cart_black,
        route: "Cart",
    },
    {
        id: 9,
        name: AppStrings.order_history,
        icon: ResourceUtils.images.ic_history,
        route: "OrderHistoryScreen",
    },
    {
        id: 11,
        name: AppStrings.settings,
        icon: ResourceUtils.images.ic_settings,
        route: "SettingScreen",
    },
    {
        id: 13,
        name: "Delete Account",
        icon: ResourceUtils.images.baseline_delete,
        route: "delete",
    },
    {
        id: 12,
        name: AppStrings.Logout,
        icon: ResourceUtils.images.logout,
        route: "logout",
    },
    // {
    //     id: 2,
    //     name: AppStrings.FamilyMembersData,
    //     icon: ResourceUtils.images.add_memb,
    //     route: "FamilyMembersList",
    // },

    {
        id: 8,
        name: AppStrings.faqs,
        icon: ResourceUtils.images.information,
        route: "FaqScreen",
    },

    // {
    //     id: 14,
    //     name: "Work shops",
    //     icon: ResourceUtils.images.baseline_work_shop,
    //     route: "UpCommingWorkShop",
    // },
];

export const dropdownData = [
    {
        id: 1,
        name: "Italian",
    },
    {
        id: 2,
        name: "Chinese",
    },
    {
        id: 3,
        name: "Mexican",
    },
    {
        id: 4,
        name: "Indian",
    },
    {
        id: 5,
        name: "French",
    },
];

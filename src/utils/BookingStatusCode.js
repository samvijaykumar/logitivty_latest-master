import AppColors from "./AppColors"
import AppUtils from "./AppUtils"
import ResourceUtils from "./ResourceUtils"

export default class BookingStatusCode {
    
    static MAMMOGRAPHY_STATUS_BOOKED = 0
    static MAMMOGRAPHY_STATUS_VERIFIED = 1
    static MAMMOGRAPHY_STATUS_SCREENING_DONE = 2
    static MAMMOGRAPHY_STATUS_COMPLETED = 3
    static MAMMOGRAPHY_STATUS_NO_SHOW = 4

    static getMammographyBookingStatusData(bookingStatus){

        let bookingData = {
            value:this.MAMMOGRAPHY_STATUS_BOOKED,
            name:'Booked',
            icon:ResourceUtils.images.ic_check_green,
            textColor:'#008B44'
        }

        if(AppUtils.isNull(bookingStatus)){
            return bookingData
        }

        if (bookingStatus == this.MAMMOGRAPHY_STATUS_BOOKED) {
            return bookingData
        } else if (bookingStatus == this.MAMMOGRAPHY_STATUS_VERIFIED) {
            return {
                value: this.MAMMOGRAPHY_STATUS_VERIFIED,
                name: 'Verified',
                icon:ResourceUtils.images.ic_women,
                textColor:'#D5C000'
            }
        } else if (bookingStatus == this.MAMMOGRAPHY_STATUS_SCREENING_DONE) {
            return {
                value: this.MAMMOGRAPHY_STATUS_SCREENING_DONE,
                name: 'Screening',
                icon:ResourceUtils.images.ic_breast_cancer,
                textColor:'#9F2600'
            }
        } else if (bookingStatus == this.MAMMOGRAPHY_STATUS_COMPLETED) {
            return {
                value: this.MAMMOGRAPHY_STATUS_COMPLETED,
                name: 'Completed',
                icon: ResourceUtils.images.ic_document,
                textColor:'#9F2600'
            }
        } else if (bookingStatus == this.MAMMOGRAPHY_STATUS_NO_SHOW) {
            return {
                value: this.MAMMOGRAPHY_STATUS_NO_SHOW,
                name: 'No Show',
                icon:ResourceUtils.images.booking_no_show,
                textColor:AppColors.colorRed
            }
        }
    }

    static EcommerceStatus={
        CONFIRM:{
            'title':'confirmed',
            'color':'#CC9600'
        },
        CANCELLED:{
            'title':'cancelled',
            'color':'#A10000'
        },
        SHIPPED:{
            'title':'shipped',
            'color':'#CC9600'
        },
        DELIVERED:{
            'title':'delivered',
            'color':'#158400'
        },
    }
}

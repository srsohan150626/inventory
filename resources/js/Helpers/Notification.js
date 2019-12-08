class Notification {
    success(){
        new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Successfully Done !',
            timeout: 2000,
        }).show();
    }
    cart_success(){
        new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Successfully Added!',
            timeout: 2000,
        }).show();
    }


    alert(){
        new Noty({
            type: 'alert',
            layout: 'topRight',
            text: 'Are you Sure?!',
            timeout: 2000,
        }).show();
    }

    error(){
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: 'Something Went Wrong!',
            timeout: 2000,
        }).show();
    }

    warning(){
        new Noty({
            type: 'warning',
            layout: 'topRight',
            text: 'Oops ! Wrong!',
            timeout: 2000,
        }).show();
    }

    image_validation(){
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: 'Upload Image less than 1Mb!',
            timeout: 2000,
        }).show();
    }
}
export default Notification = new Notification()

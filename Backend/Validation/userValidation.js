export const validateUser = (data) =>{
    const errors = {};
    
    const namePattern = /^[A-Za-z\s]{2,}$/;
    if(!data.name || !namePattern.test(data.name)){
        errors.names = "Name must be atleast two characters and only contain letters";
    }   

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!data.email || !emailPattern.test(data.email)){
        errors.email = "Please enter a valid email address";
    }

    const mobilePattern = /^\d{10}$/;
    if(!data.mobile || !mobilePattern.test(data.mobile)){
        errors.mobile = "Mobile number must be a positive 10 digit number";
    }

    if(!data.password || data.password.length<6){
        errors.password = "Passwords must be atleast 6 characters long"
    }

    if(data.password !== data.confirmPassword){
        errors.confirmPassword = "Passwords do not match"
    }

    return Object.keys(errors).length > 0 ? errors : null;
}
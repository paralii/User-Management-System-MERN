export const validateForm = (formData)=>{

    const newErrors = {};

    if(!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()){
        return {message:"All fields are required"};
    }
   
    const namePattern = /^[A-Za-z]{2,}$/;
    if(!formData.name.trim() || !namePattern.test(formData.name)){
        newErrors.name = "Enter a valid name";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email || !emailPattern.test(formData.email)){
        newErrors.email = "Please enter a valid Email";
    }

    const mobilePattern = /^\d{10}$/;
        if(!formData.mobile || !mobilePattern.test(formData.mobile) || Number(formData.mobile)<0 ){
            newErrors.mobile = "Please enter a valid 10-digit Mobile Number";
        }
    
    return {newErrors,message:""}
}
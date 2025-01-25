export const validateForm = (formData) => {
    const newErrors = {};

    if(!formData.email.trim() || !formData.password.trim()){
        return {message:"Enter email and password"}
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email || !emailPattern.test(formData.email)){
        newErrors.email = "Enter a valid Email";
    }

    if(!formData.password){
        newErrors.password = "Please enter the Password";
    }

    return {newErrors,message :""};
}
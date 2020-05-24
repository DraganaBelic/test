
function submitForm() {
    const loader = document.getElementById('loader')
    
    const form  = document.getElementsByTagName('form')[0];
    const email = document.getElementById('email');
    const error = document.getElementById('error');
    const success = document.getElementById('success');
    const emailError = document.querySelector('#email + span.error__email');
    const phoneNumberError = document.querySelector('#phoneNumber + span.error__phone_number');
    const phoneNumber = document.getElementById('phoneNumber');
    const phoneNoRegEx = /^[+]{1}[0-9]{9,12}$/;
    const APIEndPoint = 'https://jsonplaceholder.typicode.com/posts'

    const DEFAULT_REST_PARAMS_POST = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    };
    
    const data = {
        phoneNumber: phoneNumber ? phoneNumber.value : null,
        email: email ? email.value : null,
        title: 'phone&emailVeryfication',
        body: 'bar',
        // status: 'SUCCESS',
        status: 'ERROR',
        userId: 1
    }

    let request = {
        ...DEFAULT_REST_PARAMS_POST,
        body: JSON.stringify(data),
    }
    let response
    
    if(phoneNumber && phoneNumber.value.match(phoneNoRegEx)) {
        loader.className= 'loader'
        phoneNumberError.innerHTML = ''; // Reset the content of the message
        phoneNumberError.className = 'error__phone_number'; // Reset the visual state of the message
        response =handleApiFetchPOST(APIEndPoint, request)
    }
    else {
        showError();
    }
    
    if (email && email.validity.valid) {
        loader.className= 'loader'
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        emailError.innerHTML = ''; // Reset the content of the message
        emailError.className = 'error__email'; // Reset the visual state of the message
        //send request to mocked API
        
        response =handleApiFetchPOST(APIEndPoint, request)
    } else {
        // If there is still an error, show the correct error
        showError();
    }
    
    
    function showError() {
        if(email) {
            if(email.validity.valueMissing) {
            // If the field is empty
            // display the following error message.
            emailError.textContent = 'You need to enter an e-mail address.';
            } else if(email.validity.typeMismatch) {
            // If the field doesn't contain an email address
            // display the following error message.
            emailError.textContent = 'Email not valid';
            } else if(email.validity.tooShort) {
            // If the data is too short
            // display the following error message.
            emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
            }
            // Set the styling appropriately
            emailError.className = 'error__email active';

        }
        if(phoneNumber) {
            if(phoneNumber.value.valueMissing) {
                // If the field is empty
                // display the following error message.
                phoneNumberError.textContent = 'You need to enter phone number.';
            }
            if(!phoneNumber.value.match(phoneNoRegEx)) {
                phoneNumberError.textContent = 'Phone number not valid.';
            }
        }
    }
    function handleApiFetchPOST (restEndpoint, postRequest) {
        fetch(restEndpoint, postRequest
            ).then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              loader.className= 'loader loader__hidden'
              
              if(data.status == 'SUCCESS') {
                success.textContent='Success! Proceed to login.'
              }
              else {
                error.textContent='Something went wrong!'
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              error.textContent='Something went wrong!'
            });
    } 
}


function send_contact_email() {
    const form = document.getElementById('contact-form');
    const data = new FormData(form);
    const thisForm = form
    const validated_form = form.checkValidity()

    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block'); 

    let error = '';
    if (validated_form) {
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                thisForm.querySelector('.loading').classList.remove('d-block');
                thisForm.querySelector('.error-message').classList.remove('d-block');
                thisForm.querySelector('.sent-message').classList.add('d-block');  
                form.reset();
            } else {
                res.json().then(data => {
                    thisForm.querySelector('.loading').classList.remove('d-block');
                    thisForm.querySelector('.error-message').classList.add('d-block');
                    thisForm.querySelector('.sent-message').classList.remove('d-block');
                    error = data;
                });
            }
        })
        .catch((message) => {
            thisForm.querySelector('.loading').classList.remove('d-block');
            thisForm.querySelector('.error-message').classList.add('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');
            error = message;
        });
    } else {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').classList.add('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');
        error = "Preencha todos os campos do formulário."
    }
    
    thisForm.querySelector('.error-message').innerHTML = error;
}
(
    function () {
        'use strict'
        const forms = document.querySelectorAll('.validated-form') // Fetch all the forms we want to apply custom Bootstrap validation styles to
        
        for (let form of forms)
        {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                }
        
                form.classList.add('was-validated')    //was validated is a class from bootstrap
            }, false)

        }
    }
)()
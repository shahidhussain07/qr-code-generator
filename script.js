const form = document.getElementById('generate-form')
const qr = document.getElementById('qr-code')

// Button submit
const onGenerateSubmit = (e) => {
    e.preventDefault()

    clearUI()

    const url = document.getElementById('url').value
    const size = document.getElementById('size').value

    // Validate url
    if (url === "") {
        alert("Please enter a URL")
    } else {
        showSpinner()
        // Show spinner for 1 sec
        setTimeout(() => {
            hideSpinner()
            generatedQRCode(url,size)

            // Generate the save button after the qr code image src is ready
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl)
                printBtn()
            },50)
        },1000 )
    }
}

const generatedQRCode = (url,size) => {
    const qrcode = new QRCode('qr-code', {
        text: url,
        width: size,
        height: size,
    })
}

const showSpinner = () =>{
    document.getElementById('spinner').style.display ='block'
}

const hideSpinner = () =>{
    document.getElementById('spinner').style.display ='none'
}

const clearUI = () =>{
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-link')
    const printBtn = document.getElementById('print-btn')
    if(saveBtn) saveBtn.remove()
    if(printBtn) printBtn.remove()
}

const createSaveBtn = (saveUrl) =>{
    const link = document.createElement('a');
    link.id = 'save-link'
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
    link.href = saveUrl
    link.download = 'qr-code.jpg'
    link.innerText = 'Save Image'
    document.getElementById('generated').appendChild(link)
}

const printBtn = () =>{
    const print = document.createElement('button')
    print.id = 'print-btn'
    print.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
    print.innerText = 'Print Image'
    document.getElementById('generated').appendChild(print)
    
}

hideSpinner()

form.addEventListener('submit', onGenerateSubmit)
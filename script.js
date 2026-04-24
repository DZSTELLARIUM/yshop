// Algerian Wilayas (58)
const wilayas = [
    "1 - أدرار", "2 - الشلف", "3 - الأغواط", "4 - أم البواقي", "5 - باتنة", "6 - بجاية",
    "7 - بسكرة", "8 - بشار", "9 - البليدة", "10 - البويرة", "11 - تمنراست", "12 - تبسة",
    "13 - تلمسان", "14 - تيارت", "15 - تيزي وزو", "16 - الجزائر", "17 - الجلفة", "18 - جيجل",
    "19 - سطيف", "20 - سعيدة", "21 - سكيكدة", "22 - سيدي بلعباس", "23 - عنابة", "24 - قالمة",
    "25 - قسنطينة", "26 - المدية", "27 - مستغانم", "28 - المسيلة", "29 - معسكر", "30 - ورقلة",
    "31 - وهران", "32 - البيض", "33 - إليزي", "34 - برج بوعريريج", "35 - بومرداس", "36 - الطارف",
    "37 - تندوف", "38 - تيسمسيلت", "39 - الوادي", "40 - خنشلة", "41 - سوق أهراس", "42 - تيبازة",
    "43 - ميلة", "44 - عين الدفلى", "45 - النعامة", "46 - عين تموشنت", "47 - غرداية", "48 - غليزان",
    "49 - تيميمون", "50 - برج باجي مختار", "51 - أولاد جلال", "52 - بني عباس", "53 - إن صالح",
    "54 - إن قزام", "55 - تقرت", "56 - جانت", "57 - المغير", "58 - المنيعة"
];

// Populate Wilayas dropdown
const wilayaSelect = document.getElementById('wilaya');
if (wilayaSelect) {
    wilayas.forEach(wilaya => {
        let option = document.createElement('option');
        option.value = wilaya;
        option.textContent = wilaya;
        wilayaSelect.appendChild(option);
    });
}

// Modal Logic
const modal = document.getElementById('orderModal');
const productNameInput = document.getElementById('productName');
const displayProductName = document.getElementById('displayProductName');
const formMessage = document.getElementById('formMessage');

function openModal(productTitle) {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    productNameInput.value = productTitle;
    displayProductName.textContent = "المنتج: " + productTitle;
    modal.style.display = 'block';
    
    // Clear previous messages
    if(formMessage) {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }
}

function closeModal() {
    document.body.style.overflow = 'auto'; // Restore scrolling
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Form Submission Logic
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const loader = submitBtn.querySelector('.loader');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent standard page load
        
        // Basic Validation
        const phone = document.getElementById('phone').value;
        if(phone.length < 8) {
            alert('الرجاء إدخال رقم هاتف صحيح');
            return;
        }

        // UI Loading State
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
        formMessage.style.display = 'none';

        // Prepare data
        const formData = new FormData(this);

        // Fetch API to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success
                formMessage.textContent = 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.';
                formMessage.className = 'form-message success';
                this.reset(); // Clear form
                
                // Keep product name in hidden input just in case they reopen
                productNameInput.value = displayProductName.textContent.replace("المنتج: ", "");
                
                // Optionally close modal after delay
                setTimeout(() => {
                    closeModal();
                    alert("تم تأكيد طلبك بنجاح! شكرا لتسوقك معنا.");
                }, 2000);
            } else {
                // Error from server
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formMessage.textContent = 'عذراً، حدث خطأ أثناء إرسال الطلب.';
                    }
                    formMessage.className = 'form-message error';
                })
            }
        }).catch(error => {
            // Network Error
            formMessage.textContent = 'خطأ في الاتصال بالشبكة، يرجى المحاولة مرة أخرى.';
            formMessage.className = 'form-message error';
        }).finally(() => {
            // Restore UI State
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            loader.style.display = 'none';
        });
    });
}

// Background Particles initialization
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('floating-particle');
        
        // Random properties
        let size = Math.random() * 20 + 5; // 5px to 25px
        let posX = Math.random() * 100; // 0% to 100%
        let delay = Math.random() * 10; // 0s to 10s
        let duration = Math.random() * 10 + 10; // 10s to 20s
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

// Filter buttons active state (Optional visuals)
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Run init functions
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
});

class BuyNowApp {
  constructor() {
    this.basePrice = 180;
    this.packagingCharges = 25;
    this.deliveryCharges = 40;
    this.expressDeliveryCharges = 50;
    this.cgstRate = 0.09;
    this.sgstRate = 0.09;

    this.init();
  }

  init() {
    this.loadSelectedItem();
    this.calculateBill();
    this.setupEventListeners();
    this.setupFormValidation();
  }

  loadSelectedItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemName =
      urlParams.get("item") ||
      localStorage.getItem("selectedItem") ||
      "Dal Chawal";

    const dishes = {
      "Dal Chawal": {
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop&crop=center",
        description:
          "Traditional comfort food with aromatic basmati rice and lentil curry",
        price: 180,
      },
      Biryani: {
        image:
          "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop&crop=center",
        description:
          "Fragrant basmati rice cooked with aromatic spices and tender meat",
        price: 320,
      },
      Dosa: {
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=200&fit=crop&crop=center",
        description:
          "Crispy South Indian crepe served with coconut chutney and sambar",
        price: 150,
      },
      "Butter Chicken": {
        image:
          "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&h=200&fit=crop&crop=center",
        description: "Creamy tomato-based curry with tender chicken pieces",
        price: 280,
      },
      "Roti Sabzi": {
        image:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop&crop=center",
        description: "Fresh rotis served with seasonal vegetable curry",
        price: 140,
      },
      "Chole Bhature": {
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop&crop=center",
        description: "Spicy chickpea curry with fluffy fried bread",
        price: 160,
      },
      "Idli Sambar": {
        image:
          "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop&crop=center",
        description: "Steamed rice cakes served with lentil soup and chutney",
        price: 120,
      },
      Paratha: {
        image:
          "https://images.unsplash.com/photo-1574653853027-5d3ac9b9e7c3?w=200&h=200&fit=crop&crop=center",
        description: "Stuffed flatbread served with yogurt and pickle",
        price: 130,
      },
      Upma: {
        image:
          "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&h=200&fit=crop&crop=center",
        description: "Savory semolina porridge with vegetables and spices",
        price: 100,
      },
      "Paneer Curry": {
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop&crop=center",
        description: "Cottage cheese cubes in rich tomato-based gravy",
        price: 220,
      },
      Rajma: {
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop&crop=center",
        description: "Red kidney beans in spiced tomato curry",
        price: 170,
      },
      "Fish Curry": {
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center",
        description: "Fresh fish cooked in coconut-based curry",
        price: 300,
      },
    };

    const selectedDish = dishes[itemName] || dishes["Dal Chawal"];
    document.getElementById("itemImage").src = selectedDish.image;
    document.getElementById("itemName").textContent = itemName;
    document.getElementById("itemDescription").textContent =
      selectedDish.description;

    this.basePrice = selectedDish.price;
  }

  calculateBill() {
    const subtotal =
      this.basePrice + this.packagingCharges + this.deliveryCharges;
    const cgst = subtotal * this.cgstRate;
    const sgst = subtotal * this.sgstRate;
    const total = subtotal + cgst + sgst;

    document.getElementById(
      "itemPrice"
    ).textContent = `₹${this.basePrice.toFixed(2)}`;
    document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById("cgst").textContent = `₹${cgst.toFixed(2)}`;
    document.getElementById("sgst").textContent = `₹${sgst.toFixed(2)}`;
    document.getElementById("totalAmount").textContent = `₹${total.toFixed(2)}`;
    document.getElementById("finalAmount").textContent = total.toFixed(2);
  }

  setupEventListeners() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach((option) => {
      option.addEventListener("change", (e) => {
        this.deliveryCharges =
          e.target.value === "express" ? 40 + this.expressDeliveryCharges : 40;
        this.calculateBill();
      });
    });

    document.getElementById("billingForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePayment();
    });

    document.getElementById("phone").addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "").slice(0, 10);
      e.target.value = value;
    });

    document.getElementById("pincode").addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "").slice(0, 6);
      e.target.value = value;
    });
  }

  setupFormValidation() {
    const inputs = document.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          this.validateField(input);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    field.classList.remove("error");
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) existingError.remove();

    if (field.hasAttribute("required") && !value) {
      isValid = false;
      errorMessage = "This field is required";
    }

    if (value && field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
    }

    if (value && field.type === "tel" && value.length !== 10) {
      isValid = false;
      errorMessage = "Phone number must be 10 digits";
    }

    if (value && field.name === "pincode" && value.length !== 6) {
      isValid = false;
      errorMessage = "Pincode must be 6 digits";
    }

    if (!isValid) {
      field.classList.add("error");
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = errorMessage;
      field.parentNode.appendChild(errorDiv);
    }

    return isValid;
  }

  handlePayment() {
    const requiredFields = document.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );
    let allValid = true;
    requiredFields.forEach((field) => {
      if (!this.validateField(field)) allValid = false;
    });

    if (!allValid) {
      const firstError = document.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
      return;
    }

    const formData = new FormData(document.getElementById("billingForm"));
    const orderData = {
      item: document.getElementById("itemName").textContent,
      customer: {
        name: formData.get("fullName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: {
          street: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state"),
          pincode: formData.get("pincode"),
          landmark: formData.get("landmark"),
        },
      },
      delivery: formData.get("delivery"),
      total: document.getElementById("finalAmount").textContent,
    };

    this.processPayment(orderData);
  }

  processPayment(orderData) {
    const payButton = document.querySelector(".pay-now-btn");
    const originalText = payButton.innerHTML;

    payButton.innerHTML =
      '<span class="btn-icon">⏳</span> Processing Payment...';
    payButton.disabled = true;
    payButton.style.opacity = "0.7";

    setTimeout(() => this.showPaymentSuccess(orderData), 2000);
  }

  showPaymentSuccess(orderData) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex; align-items: center; justify-content: center;
            z-index: 1000;
        `;

    const successCard = document.createElement("div");
    successCard.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideIn 0.5s ease-out;
        `;

    successCard.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #00b894; margin-bottom: 15px;">Payment Successful!</h2>
            <p style="color: #636e72; margin-bottom: 20px;">
                Your order for <strong>${
                  orderData.item
                }</strong> has been confirmed.
            </p>
            <p style="color: #636e72; margin-bottom: 30px;">
                Order ID: <strong>#${Math.random()
                  .toString(36)
                  .substr(2, 9)
                  .toUpperCase()}</strong>
            </p>
            <button onclick="window.location.href='index.html'" style="
                background: linear-gradient(135deg, #00b894, #00cec9);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Back to Menu
            </button>
        `;

    const style = document.createElement("style");
    style.textContent = `
            @keyframes slideIn {
                from { transform: scale(0.5) rotate(-180deg); opacity: 0; }
                to { transform: scale(1) rotate(0deg); opacity: 1; }
            }
        `;
    document.head.appendChild(style);

    overlay.appendChild(successCard);
    document.body.appendChild(overlay);

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BuyNowApp();
});

// Floating Dish Popup Logic
const overlay = document.getElementById("floatingDishOverlay");
const closeBtn = document.getElementById("closeDish");
const floatingImg = document.querySelector(".floating-dish-content");
const floatingName = document.querySelector(".floating-dish-name");
const floatingDesc = document.querySelector(".floating-dish-description");
const floatingPrice = document.querySelector(".price");

// Add event listener to all Buy Now buttons
document.querySelectorAll(".buy-now").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const img = btn.getAttribute("data-image");
    const desc = btn.getAttribute("data-desc");
    const price = btn.getAttribute("data-price");

    floatingImg.src = img;
    floatingImg.alt = name;
    floatingName.textContent = name;
    floatingDesc.textContent = desc;
    floatingPrice.textContent = price;

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scroll
  });
});

// Close button logic
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scroll
});

// Close popup on clicking outside
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

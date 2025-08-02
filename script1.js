class KitchenApp {
  constructor() {
    this.currentMeal = "";
    this.isNight = false;
    this.init();
  }

  init() {
    this.updateTimeAndGreeting();
    this.setupEventListeners();
    this.startTimeUpdates();
    this.updateScenery();
    this.filterDishesByMeal();
  }

  updateTimeAndGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Determine meal time and greeting
    let greeting = "";
    let meal = "";

    if (hour >= 5 && hour < 11) {
      meal = "breakfast";
      greeting = "Let's see what's for breakfast today!";
    } else if (hour >= 11 && hour < 16) {
      meal = "lunch";
      greeting = "Let's see what's for lunch today!";
    } else if (hour >= 16 && hour < 19) {
      meal = "snack";
      greeting = "Time for an afternoon snack!";
    } else if (hour >= 19 && hour < 23) {
      meal = "dinner";
      greeting = "What's for dinner tonight?";
    } else {
      meal = "snack";
      greeting = "Late night snack time!";
    }

    this.currentMeal = meal;
    this.isNight = hour < 6 || hour >= 19;

    // Update DOM elements
    document.getElementById("greeting").textContent = greeting;
    document.getElementById("timeDisplay").textContent = timeString;
  }

  filterDishesByMeal() {
    const dishes = document.querySelectorAll(".dish");

    dishes.forEach((dish) => {
      const dishMeals = dish.getAttribute("data-meal").split(",");

      if (dishMeals.includes(this.currentMeal)) {
        dish.style.opacity = "1";
        dish.style.transform = "scale(1)";
        dish.style.filter = "none";
      } else {
        dish.style.opacity = "0.6";
        dish.style.transform = "scale(0.95)";
        dish.style.filter = "grayscale(50%)";
      }
    });
  }

  setupEventListeners() {
    const dishes = document.querySelectorAll(".dish");
    dishes.forEach((dish) => {
      dish.addEventListener("click", (e) => {
        this.showFloatingDish(dish);
      });
    });

    // Close floating dish
    const closeButton = document.getElementById("closeDish");
    const overlay = document.getElementById("floatingDishOverlay");

    closeButton.addEventListener("click", () => {
      this.hideFloatingDish();
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.hideFloatingDish();
      }
    });

    // Keyboard escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideFloatingDish();
      }
    });
  }

  showFloatingDish(dishElement) {
    const overlay = document.getElementById("floatingDishOverlay");
    const floatingDish = document.getElementById("floatingDish");
    const floatingContent = floatingDish.querySelector(
      ".floating-dish-content"
    );
    const floatingName = floatingDish.querySelector(".floating-dish-name");
    const cardSpace = floatingDish.querySelector(".card-space");

    // Get dish data
    const dishImg = dishElement.querySelector(".dish-content");
    const dishName = dishElement.querySelector(".dish-name").textContent;

    // Get extra data from attributes
    const description =
      dishElement.getAttribute("data-description") ||
      "No description available.";
    const buyLink = dishElement.getAttribute("data-buy") || "#";
    const ingredients =
      dishElement.getAttribute("data-ingredients") || "Ingredients not listed.";

    floatingContent.src = dishImg.src;
    floatingContent.alt = dishImg.alt;
    floatingName.textContent = dishName;

    console.log("Floating dish opened. Description:", description);
    cardSpace.innerHTML = "";

    const descPara = document.createElement("p");
    descPara.textContent = description;

    const buyBtn = document.createElement("button");
    buyBtn.className = "buy-now";
    buyBtn.textContent = "BUY NOW";
    buyBtn.addEventListener("click", () => buyNow(dishName));

    const ingredientBtn = document.createElement("button");
    ingredientBtn.className = "ingredient-list";
    ingredientBtn.textContent = "SEE INGREDIENT LIST";
    ingredientBtn.addEventListener("click", () => {
      window.location.href = "recipe-book.html";
    });

    cardSpace.appendChild(descPara);
    cardSpace.appendChild(buyBtn);
    cardSpace.appendChild(ingredientBtn);

    function buyNow(name) {
      localStorage.setItem("selectedItem", name);
      window.location.href = "buy-now.html";
    }

    // Show overlay with animation
    overlay.classList.add("active");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  hideFloatingDish() {
    const overlay = document.getElementById("floatingDishOverlay");
    overlay.classList.remove("active");

    // Restore body scroll
    document.body.style.overflow = "";
  }

  startTimeUpdates() {
    // Update every minute
    setInterval(() => {
      this.updateTimeAndGreeting();
      this.updateScenery();
      this.filterDishesByMeal();
    }, 60000);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new KitchenApp();
});

// Add some fun interactions
document.addEventListener("mousemove", (e) => {
  const dishes = document.querySelectorAll(".dish");
  dishes.forEach((dish) => {
    const rect = dish.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      const intensity = (100 - distance) / 100;
      const rotateX = (deltaY / distance) * intensity * 10;
      const rotateY = -(deltaX / distance) * intensity * 10;

      dish.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
        intensity * 20
      }px)`;
    } else {
      dish.style.transform = "";
    }
  });
});

const categoryContainer = document.getElementById("categoryContainer");

const foodContainer = document.getElementById("foodContainer");

let cart = [];
// Load Category Function
const loadCategories = async () => {
  try {
    const res = await fetch(
      " https://taxi-kitchen-api.vercel.app/api/v1/categories"
    );
    const data = await res.json();

    displayCategories(data.categories);
  } catch (error) {
    console.log(error);
  }
};
// Displaying all Categories

const displayCategories = (categories) => {
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
    <div id='${category.id}' class="flex items-center py-1 px-4 gap-4 my-4 rounded-md bg-white mx-auto cursor-pointer categoryDiv hover:text-[#fedf00]">
    
    <img class='w-[50px]' src='${category.categoryImg}'/>
    <p class=' font-bold '>${category.categoryName}</p>
    </div>
    
    `;
  });
};

// Category click

categoryContainer.addEventListener("click", (e) => {
  const category = e.target.closest(".categoryDiv");
  if (!category) return;
  const id = category.id;
  // console.log(id);

  loadSingleCategoryFoods(id);
  //   console.log(category);

  const categories = document.querySelectorAll(".categoryDiv");

  for (let i of categories) {
    i.classList.remove("bg-red-400");
    i.classList.add("bg-white");
  }
  category.classList.remove("bg-white");
  category.classList.add("bg-red-400");
});

// loading single category foods

const loadSingleCategoryFoods = async (id) => {
  try {
    const res = await fetch(
      ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
    );
    const data = await res.json();

    // console.log(data.foods);
    displaySingleCategoryFoods(data.foods);
  } catch (error) {
    console.log(error);
  }
};

// displaying cart
const displayCart = (cart) => {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";
  let sum = 0;
  cart.forEach((each) => {
    sum += parseFloat(each.price);

    cartContainer.innerHTML += `
<div class="flex items-center gap-4 relative p-3 shadow-2xl mt-6 bg-white rounded-sm">
<img
              class="w-[100px] rounded-md object-contain"
              src="${each.image}"
              alt=""
            />
<div>
<p class="text-xl text-gray-600 font-semibold">${each.name}</p>
<p class="text-[#fedf00] font-bold">$ ${each.price} BDT</p>

</div>
<div onclick="deleteCart(${each.id})" class="text-red-700 text-xl absolute top-0 right-1 cursor-pointer">close</div>

</div>

`;
  });
  document.getElementById("total").innerText = sum;
};

const addToCart = (id) => {
  // console.log("cart btn clicked", id);

  const parent = document.getElementById(id);
  // console.log(parent);
  const foodName = parent.querySelector("p");
  const foodNameText = foodName.innerText;
  // console.log(foodNameText);
  const image = parent.querySelector("img");

  const imageUrl = image.src;

  const price = parent.querySelector("#price");
  const priceText = price.innerText;
  // console.log(priceText);

  const exist = cart.some((item) => {
    return item.id == id;
  });
  if (exist) return;
  else {
    cart.push({
      id: id,
      name: foodNameText,
      price: priceText,
      image: imageUrl,
    });
  }
  displayCart(cart);
  // console.log(cart);
};

const deleteCart = (id) => {
  // console.log(id);

  let newArr = cart.filter((item) => {
    return item.id != id;
  });

  cart = [...newArr];
  displayCart(cart);
};

const displaySingleCategoryFoods = (foods) => {
  // console.log(foods);
  foodContainer.innerHTML = "";
  foods.forEach((food) => {
    foodContainer.innerHTML += `
    <div id='${food.id}' class="flex flex-col md:flex-row gap-10  p-3 shadow-2xl mt-6 bg-white rounded-sm">
    
    <img
              class="w-[200px] rounded-md object-contain"
              src="${food.foodImg}"
              alt=""
            />
            <div class=" flex-1">
              <div>
                <p class="text-xl font-bold text-gray-600">${food.title}</p>
                <p class="bg-[#febf00] rounded-2xl w-fit p-2">${food.category}</p>
              </div>
              <div class="flex items-center justify-between gap-2 my-3">
                <span class="bg-slate-400 h-1 w-full"></span>
                <p class="text-[#febf00] text-nowrap font-bold">
                  $ <span id="price" class="">${food.price}</span> BDT
                </p>
              </div>

              <button onclick='addToCart(${food.id})' class="bg-[#febf00] px-3 py-2 rounded-sm font-semibold">
               <i class="fa-solid fa-basket-shopping"></i> Add This Item
              </button>
            </div>
    
    </div>
    
    `;
  });
};

const randomFoods = async () => {
  try {
    const res = await fetch(
      " https://taxi-kitchen-api.vercel.app/api/v1/foods/random"
    );
    const data = await res.json();
    // console.log(data.foods);
    displaySingleCategoryFoods(data.foods);
  } catch (error) {
    console.log(error);
  }
};

loadCategories();
randomFoods();

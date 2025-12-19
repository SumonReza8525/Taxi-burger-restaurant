const categoryContainer = document.getElementById("categoryContainer");

const foodContainer = document.getElementById("foodContainer");

const cart = [];
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

              <button class="bg-[#febf00] px-3 py-2 rounded-sm font-semibold">
               <i class="fa-solid fa-basket-shopping"></i> Add This Item
              </button>
            </div>
    
    </div>
    
    `;
  });
};

loadCategories();

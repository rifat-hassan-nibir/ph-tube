const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((response) => response.json())
    .then((data) => showCategories(data.data));
};

const showCategories = (categories) => {
  const categorySection = document.getElementById("category-section");
  categories.forEach((category) => {
    const categoryButton = document.createElement("button");
    categoryButton.classList.add(
      "category-btn",
      "lg:text-[18px]",
      "text-[16px]",
      "font-medium",
      "lg:py-[5px]",
      "py-[5px]",
      "lg:px-[20px]",
      "px-[15px]",
      "rounded",
      "text-[#252525b3]",
      "bg-[#25252526]"
    );
    categoryButton.innerText = `${category.category}`;
    categorySection.appendChild(categoryButton);

    // Adding click functionality
    categoryButton.addEventListener("click", function () {
      loadCategoryData(`${category.category_id}`);
      const allBtns = document.querySelectorAll(".category-btn");
      for (const btn of allBtns) {
        btn.classList.remove("bg-theme-color", "text-white");
      }
      categoryButton.classList.add("bg-theme-color", "text-white");
      categoryButton.classList.remove("bg-[#25252526]", "text-[#252525b3]");
    });
  });
};

let defauldCategory = 1000;

const loadCategoryData = (categoryID) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    .then((response) => response.json())
    .then((data) => showCategoriesDataOnUI(data.data));
};

const showCategoriesDataOnUI = (categoryData) => {
  const noDataFound = document.getElementById("no-data-found-text");
  // Clearing video section
  const videosSection = document.getElementById("videos-section");
  videosSection.innerHTML = ``;
  if (categoryData.length > 0) {
    categoryData.forEach((category) => {
      // Check for varified
      let verified = "";
      if (category.authors[0].verified) {
        verified = `<img class="size-5" src="images/varified.png" alt="" />`;
      }
      const videoCardDiv = document.createElement("div");
      videoCardDiv.innerHTML = `
      <div>
        <div class="rounded-lg lg:mb-[20px] mb-[10px]">
          <img class="w-full h-[200px] rounded-lg" src="${category.thumbnail}" alt="" />
        </div>
        <div class="flex lg:gap-3 gap-2">
          <img class="size-10 rounded-full" src="${category.authors[0].profile_picture}" alt="" />
          <div class="space-y-[8px]">
            <h4 class="text-[#171717] text-[16px] font-bold w-[90%]">${category.title}</h4>
            <p class="text-[14px] text-[#171717b3]">${category.authors[0].profile_name}</p>
            <div class="flex gap-3">
              <p class="text-[14px] text-[#171717b3]">${category.others.views} views</p>
              ${verified}
            </div>
          </div>
          </div>
      </div>
  `;
      videosSection.appendChild(videoCardDiv);
      noDataFound.classList.add("hidden");
    });
  } else {
    noDataFound.classList.toggle("hidden");
  }
};

loadCategories();
loadCategoryData(defauldCategory);

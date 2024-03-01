const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((response) => response.json())
    .then((data) => showCategories(data.data));
};

const showCategories = (categories) => {
  const categorySection = document.getElementById("category-section");
  categories.forEach((category) => {
    console.log(category);
    const categoryButtonDiv = document.createElement("div");
    categoryButtonDiv.innerHTML = `
    <button
        class="lg:text-[18px] text-[16px] font-medium lg:py-[5px] py-[5px] lg:px-[20px] px-[15px] rounded text-[#252525b3] bg-[#25252526]">
        <a href="">${category.category}</a>
    </button>
    `;
    categorySection.appendChild(categoryButtonDiv);
  });
};

loadCategories();

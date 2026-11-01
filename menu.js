const menuGrid = document.getElementById("menu-grid");

fetch("menu.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (items) {
        items.forEach(function (item) {
            const card = document.createElement("article");
            card.className = "product-card";
            card.innerHTML =
                '<img src="' + item.image + '" alt="' + item.name + '">' +
                "<h3>" + item.name + "</h3>" +
                '<p class="price">Rs. ' + item.price + "</p>" +
                '<p class="size">' + item.size + "</p>" +
                "<p>" + item.description + "</p>" +
                '<button class="add-btn" data-name="' + item.name + '" data-price="' + item.price + '">Add to Cart</button>' +
                '<div class="qty-controls hidden">' +
                    '<button class="minus-btn">-</button>' +
                    '<span class="qty">0</span>' +
                    '<button class="plus-btn">+</button>' +
                "</div>";

            card.querySelector(".add-btn").addEventListener("click", function () {
                addOne(item.name, item.price);
            });
            card.querySelector(".plus-btn").addEventListener("click", function () {
                addOne(item.name, item.price);
            });
            card.querySelector(".minus-btn").addEventListener("click", function () {
                removeOne(item.name);
            });

            menuGrid.appendChild(card);
        });
        updateCards();
    });
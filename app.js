// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  console.log("item controller");

  // PRIVATE
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure (or State)
  const data = {
    items: [
      {
        id: 0,
        name: "Steak Dinner",
        calories: 1200
      },
      {
        id: 1,
        name: "Cookie",
        calories: 400
      },
      {
        id: 2,
        name: "Eggs",
        calories: 300
      }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public Methods
  return {
    logData: function() {
      return data;
    },
    getItems: function() {
      return data.items;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list"
  };

  // Public Methods
  return {
    // Loops through the items and make each one into a list item and insert into a <ul>
    populateItemList: function(items) {
      console.log(items);
      let html = "";

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items into <ul>
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Public Methods
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);
    }
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();

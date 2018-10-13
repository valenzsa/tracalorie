// Storage Controller
const StorageCtrl = (function() {
  // Public methods
  return {
    storeItem: function(newItem) {
      let items;

      // Check if any items in localStorage

      if (localStorage.getItem("items") === null) {
        // No items set

        // Note:
        // If there's nothing in localStorage (if its null), we set the items to an empty array.
        // Then we push the new item into the items array.
        // Then we set it to localStorage as 'items'

        items = [];

        // Push new item
        items.push(newItem);

        // Set localStorage
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // There are items

        // Note:
        // If there is something in the localStorage, we need to get its stringified object and parse it into an object.
        // Once we get the object from localStorage, we can then push the new item into the items array
        // And then we re set the items array into the localStorage as stringify

        // Get what is already in localStorage
        items = JSON.parse(localStorage.getItem("items"));

        // Push new item
        items.push(newItem);

        // Re set to localStorage
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items = [];

      // First Check to see if there's any items in the localStorage
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    }
  };
})();

/*****************
 * Item Controller
 */
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
    // items: [
    //   // {
    //   //   id: 0,
    //   //   name: "Steak Dinner",
    //   //   calories: 1200
    //   // },
    //   // {
    //   //   id: 1,
    //   //   name: "Cookie",
    //   //   calories: 400
    //   // },
    //   // {
    //   //   id: 2,
    //   //   name: "Eggs",
    //   //   calories: 300
    //   // }
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public Methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;

      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;

      // Loop through the items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
      // Get ids using the map method
      const ids = data.items.map(function(item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item using splice()
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function(item) {
      return data.currentItem;
    },
    getTotalCalories: function() {
      // Loop through calories and add the items
      let total = 0;

      // Loop through items and add cals
      data.items.forEach(function(item) {
        //total = total + item.calories;
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  };
})();

/*****************
 * UI Controller
 */
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
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
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${
        item.calories
      } Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${
            item.name
          }: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },
    removeItems: function() {
      let listITems = document.querySelectorAll(UISelectors.listITems);

      // Turn Node list into array
      listItems = Array.from(listITems);

      listItems.forEach(function(listItem) {
        item.remove();
      });
    },
    // Hides the <ul>
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

/*****************
 * App Controller
 */
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event using event delegation
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    // Clear items event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    e.preventDefault();

    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }
  };

  // Click edit item
  const itemEditClick = function(e) {
    e.preventDefault();
    if (e.target.classList.contains("edit-item")) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArray = listId.split("-");

      // Get the actual id
      const id = parseInt(listIdArray[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
  };

  // Update item submit
  const itemUpdateSubmit = function(e) {
    e.preventDefault();

    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  // Delete button event
  const itemDeleteSubmit = function(e) {
    e.preventDefault();

    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  // Clear items event
  const clearAllItemsClick = function() {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Hide UL
    UICtrl.hideList();
  };

  // Public Methods
  return {
    init: function() {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }

      // Populate list with items
      UICtrl.populateItemList(items);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();

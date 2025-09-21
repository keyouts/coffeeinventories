  let inventory = JSON.parse(localStorage.getItem('coffeeInventory')) || [];
    let editingIndex = null;

    function saveInventory() {
      localStorage.setItem('coffeeInventory', JSON.stringify(inventory));
    }

    function showError(message) {
      const errorDiv = document.getElementById('errorMsg');
      errorDiv.innerText = message;
      errorDiv.style.display = 'block';
    }

    function clearError() {
      const errorDiv = document.getElementById('errorMsg');
      errorDiv.innerText = '';
      errorDiv.style.display = 'none';
    }

    function addOrUpdateItem() {
      const name = document.getElementById('coffeeName').value.trim();
      const roast = document.getElementById('roastLevel').value;
      const qty = parseInt(document.getElementById('quantity').value.trim(), 10);
      const date = document.getElementById('purchaseDate').value;
      const caffeine = parseInt(document.getElementById('caffeine').value.trim(), 10);

      if (!name || isNaN(qty) || qty <= 0 || !date || isNaN(caffeine) || caffeine <= 0) {
        showError("Please enter valid coffee name, quantity, purchase date, and caffeine amount.");
        return;
      }

      clearError();

      const coffee = { name, roast, qty, date, caffeine };

      if (editingIndex !== null) {
        inventory[editingIndex] = coffee;
        editingIndex = null;
      } else {
        inventory.push(coffee);
      }

      saveInventory();
      renderInventory();
      resetForm();
    }

    function editItem(index) {
      const item = inventory[index];
      document.getElementById('coffeeName').value = item.name;
      document.getElementById('roastLevel').value = item.roast;
      document.getElementById('quantity').value = item.qty;
      document.getElementById('purchaseDate').value = item.date;
      document.getElementById('caffeine').value = item.caffeine;
      editingIndex = index;
    }

    function deleteItem(index) {
      inventory.splice(index, 1);
      saveInventory();
      renderInventory();
      resetForm();
    }

    function resetForm() {
      document.getElementById('coffeeName').value = '';
      document.getElementById('roastLevel').value = 'Light';
      document.getElementById('quantity').value = '';
      document.getElementById('purchaseDate').value = '';
      document.getElementById('caffeine').value = '';
      editingIndex = null;
    }

    function renderInventory() {
      const list = document.getElementById('inventoryList');
      list.innerHTML = '';

      inventory.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'inventory-item';

        const details = document.createElement('div');
        details.className = 'item-details';
        details.innerText = `${item.name} • ${item.roast} • ${item.qty}g • ${item.caffeine}mg caffeine • Purchased: ${item.date}`;

        const actions = document.createElement('div');
        actions.className = 'item-actions';

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.onclick = () => editItem(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => deleteItem(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        div.appendChild(details);
        div.appendChild(actions);
        list.appendChild(div);
      });
    }

    renderInventory();

